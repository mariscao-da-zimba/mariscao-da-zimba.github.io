import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { assessDependencyAudit, knownAdvisory } from '../scripts/dependency-audit-policy.mjs';

const reviewedDate = new Date('2026-10-09T12:00:00Z');
const report = (vulnerabilities = {}) => ({ auditReportVersion: 2, vulnerabilities,
  metadata: { vulnerabilities: { total: Object.keys(vulnerabilities).length } } });
function fixture() {
  const names = ['braces', 'micromatch', 'fast-glob', '@next/eslint-plugin-next',
    'vite-plugin-dynamic-import', 'vite-plugin-commonjs', 'vinext'];
  const versions = ['3.0.3', '4.0.8', '3.3.1', '16.2.6', '1.6.0', '0.10.4', '1.0.0-beta.8'];
  const vias = [{ name: 'braces', dependency: 'braces', url: knownAdvisory, severity: 'high', range: '<=3.0.3' },
    'braces', 'micromatch', 'fast-glob', 'fast-glob', 'vite-plugin-dynamic-import', 'vite-plugin-commonjs'];
  const alerts = Object.fromEntries(names.map((name, index) => [name, {
    name, severity: 'high', nodes: [`node_modules/${name}`], via: [vias[index]], fixAvailable: false,
  }]));
  const packages = Object.fromEntries(names.map((name, index) => [`node_modules/${name}`, { version: versions[index], dev: true }]));
  return { full: report(alerts), production: report(), lock: { lockfileVersion: 3, packages }, now: reviewedDate };
}

test('auditoria limpa passa sem exceção', () => {
  assert.equal(assessDependencyAudit({ full: report(), production: report() }).status, 'clean');
});
test('cadeia dev conhecida permanece explicitamente sinalizada, não corrigida', () => {
  const result = assessDependencyAudit(fixture());
  assert.equal(result.status, 'known-development-exception');
  assert.equal(result.developmentAlerts, 7);
  assert.equal(result.productionAlerts, 0);
  assert.match(result.message, /não são declarados corrigidos/);
});
test('qualquer alerta de produção bloqueia a publicação', () => {
  const input = fixture();
  input.production = report({ react: { severity: 'low' } });
  assert.throws(() => assessDependencyAudit(input), /dependência de produção/);
});
test('pacote dev novo não fica escondido pela exceção', () => {
  const input = fixture();
  input.full.vulnerabilities.other = { name: 'other', severity: 'low' };
  input.full.metadata.vulnerabilities.total++;
  assert.throws(() => assessDependencyAudit(input), /fora da exceção/);
});
test('novo GHSA na mesma biblioteca bloqueia a publicação', () => {
  const input = fixture();
  input.full.vulnerabilities.braces.via.push({ ...input.full.vulnerabilities.braces.via[0], url: 'https://github.com/advisories/GHSA-new' });
  assert.throws(() => assessDependencyAudit(input), /GHSA revisado/);
});
test('outra aresta do mesmo GHSA não amplia a exceção', () => {
  const input = fixture();
  input.full.vulnerabilities.vinext.via = ['braces'];
  assert.throws(() => assessDependencyAudit(input), /Cadeia diferente/);
});
test('alerta crítico nunca usa a exceção', () => {
  const input = fixture();
  input.full.vulnerabilities.braces.severity = 'critical';
  assert.throws(() => assessDependencyAudit(input), /fora da exceção/);
});
test('mesmo pacote fora de dev bloqueia a publicação', () => {
  const input = fixture();
  input.lock.packages['node_modules/braces'].dev = false;
  assert.throws(() => assessDependencyAudit(input), /versão\/escopo/);
});
test('mudança de versão exige revisão explícita', () => {
  const input = fixture();
  input.lock.packages['node_modules/braces'].version = '3.0.2';
  assert.throws(() => assessDependencyAudit(input), /versão\/escopo/);
});
test('caminho novo e versão ausente não ampliam a exceção por undefined', () => {
  const input = fixture();
  const path = 'node_modules/new-parent/node_modules/braces';
  input.full.vulnerabilities.braces.nodes = [path];
  input.lock.packages[path] = { dev: true };
  assert.throws(() => assessDependencyAudit(input), /versão\/escopo/);
});
test('correção direta disponível não é ignorada', () => {
  const input = fixture();
  input.full.vulnerabilities.braces.fixAvailable = { name: 'braces', version: '3.0.4' };
  assert.throws(() => assessDependencyAudit(input), /correção direta disponível/);
});
test('exceção temporária expirada bloqueia a publicação', () => {
  const input = fixture();
  input.now = new Date('2026-11-09T00:00:00Z');
  assert.throws(() => assessDependencyAudit(input), /expirou/);
});
test('erro de rede/relatório ausente não vira resultado limpo', () => {
  const input = fixture();
  input.full = { error: { code: 'EAI_AGAIN' } };
  assert.throws(() => assessDependencyAudit(input), /inválido ou indisponível/);
});
test('grafo cíclico e contagem inconsistente falham de forma fechada', () => {
  const input = fixture();
  input.full.vulnerabilities.braces.via = ['micromatch'];
  assert.throws(() => assessDependencyAudit(input), /Ciclo/);
  input.full.metadata.vulnerabilities.total = 0;
  assert.throws(() => assessDependencyAudit(input), /Contagem/);
});
test('os seis workflows atuais de publicação executam o gate antes do build', async () => {
  for (const file of ['pages.yml', 'revisar-portal.yml', 'ampliar-praias-video.yml',
    'atualizar-butiazinho.yml', 'publicar-praias-video.yml', 'publicar-upgrade-videos.yml']) {
    const yaml = await readFile(new URL(`../.github/workflows/${file}`, import.meta.url), 'utf8');
    const build = yaml.match(/^ {2}build:\r?\n([\s\S]*?)(?=^ {2}deploy:)/m)?.[1];
    assert.ok(build, `Job de build ausente em ${file}`);
    assert.match(build, /- run: npm ci\r?\n\s+- run: npm run security:audit\r?\n\s+- run: npm run lint/,
      `Gate incondicional após npm ci e antes de lint/build em ${file}`);
  }
});
