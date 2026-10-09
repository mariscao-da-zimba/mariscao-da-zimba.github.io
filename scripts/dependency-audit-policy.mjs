// A visible, narrow, time-limited exception is not a vulnerability patch.
export const knownAdvisory = 'https://github.com/advisories/GHSA-vfj7-8cjw-p6xm';
export const exceptionExpiresAt = '2026-11-08T23:59:59Z';
const knownNodes = new Map([
  ['node_modules/@next/eslint-plugin-next', '16.2.6'],
  ['node_modules/braces', '3.0.3'],
  ['node_modules/fast-glob', '3.3.1'],
  ['node_modules/micromatch', '4.0.8'],
  ['node_modules/vinext', '1.0.0-beta.8'],
  ['node_modules/vite-plugin-commonjs', '0.10.4'],
  ['node_modules/vite-plugin-dynamic-import', '1.6.0'],
  ['node_modules/vite-plugin-dynamic-import/node_modules/fast-glob', '3.3.3'],
]);
const knownNames = new Set([...knownNodes.keys()].map((path) => path.split('node_modules/').at(-1)));
const knownParents = new Map([
  ['braces', null], ['micromatch', 'braces'], ['fast-glob', 'micromatch'],
  ['@next/eslint-plugin-next', 'fast-glob'], ['vite-plugin-dynamic-import', 'fast-glob'],
  ['vite-plugin-commonjs', 'vite-plugin-dynamic-import'], ['vinext', 'vite-plugin-commonjs'],
]);

function vulnerabilities(report) {
  if (report?.auditReportVersion !== 2 || report.error || !report.vulnerabilities
    || Array.isArray(report.vulnerabilities) || typeof report.vulnerabilities !== 'object') {
    throw new Error('Relatório npm audit inválido ou indisponível; publicação bloqueada.');
  }
  const entries = Object.entries(report.vulnerabilities);
  if (report.metadata?.vulnerabilities?.total !== entries.length) {
    throw new Error('Contagem de alertas inconsistente; publicação bloqueada.');
  }
  return entries;
}

export function assessDependencyAudit({ full, production, lock, now = new Date() }) {
  const productionEntries = vulnerabilities(production);
  if (productionEntries.length) throw new Error('Há alerta em dependência de produção; publicação bloqueada.');
  const entries = vulnerabilities(full);
  if (!entries.length) return { status: 'clean', productionAlerts: 0, developmentAlerts: 0 };
  if (Number.isNaN(now.getTime()) || now.getTime() > Date.parse(exceptionExpiresAt)) {
    throw new Error('A exceção temporária de desenvolvimento expirou; reavaliar antes de publicar.');
  }
  if (!lock?.packages || lock.lockfileVersion !== 3) throw new Error('Lockfile inválido; publicação bloqueada.');
  const graph = full.vulnerabilities;
  const resolvesKnownAdvisory = (name, visited = new Set()) => {
    if (visited.has(name)) throw new Error('Ciclo no grafo de alertas; publicação bloqueada.');
    const entry = graph[name];
    if (!entry || !knownNames.has(name) || entry.name !== name || entry.severity !== 'high'
      || !Array.isArray(entry.via) || !entry.via.length || !Array.isArray(entry.nodes) || !entry.nodes.length) {
      throw new Error(`Alerta fora da exceção conhecida: ${name}`);
    }
    for (const path of entry.nodes) {
      const installed = lock.packages[path];
      if (typeof path !== 'string' || !knownNodes.has(path) || path.split('node_modules/').at(-1) !== name
        || installed?.dev !== true || typeof installed.version !== 'string' || installed.version !== knownNodes.get(path)) {
        throw new Error(`Dependência fora da versão/escopo de desenvolvimento revisado: ${name}`);
      }
    }
    // A real direct patch must be reviewed/applied, not hidden by the exception.
    if (entry.fixAvailable === true || entry.fixAvailable?.name === 'braces') {
      throw new Error('npm indica correção direta disponível; atualizar e testar antes de publicar.');
    }
    const next = new Set([...visited, name]);
    for (const via of entry.via) {
      if (typeof via === 'string') {
        resolvesKnownAdvisory(via, next);
      } else if (name !== 'braces' || via?.url !== knownAdvisory || via.name !== 'braces'
        || via.dependency !== 'braces' || via.severity !== 'high' || via.range !== '<=3.0.3') {
        throw new Error(`Aviso diferente do GHSA revisado: ${name}`);
      }
    }
    if (entry.via.length !== 1 || (name !== 'braces' && entry.via[0] !== knownParents.get(name))
      || (name === 'braces' && typeof entry.via[0] !== 'object')) {
      throw new Error(`Cadeia diferente da revisão conhecida: ${name}`);
    }
  };
  for (const [name] of entries) resolvesKnownAdvisory(name);
  return {
    status: 'known-development-exception',
    productionAlerts: 0,
    developmentAlerts: entries.length,
    advisory: knownAdvisory,
    expiresAt: exceptionExpiresAt,
    message: 'Alertas de desenvolvimento ainda presentes, sem patch oficial confirmado; não são declarados corrigidos.',
  };
}
