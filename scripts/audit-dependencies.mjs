import { execFileSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { assessDependencyAudit } from './dependency-audit-policy.mjs';

function audit(args) {
  const npmCli = process.env.npm_execpath;
  if (!npmCli) throw new Error('Execute a checagem por npm run security:audit.');
  let output;
  try {
    output = execFileSync(process.execPath, [npmCli, 'audit', '--json', ...args], {
      encoding: 'utf8', timeout: 60000, maxBuffer: 10 * 1024 * 1024, windowsHide: true,
    });
  } catch (error) {
    // npm exits 1 when it reports vulnerabilities. All other failures are fatal.
    if (error.status !== 1 || !error.stdout) throw new Error('Consulta npm audit falhou; publicação bloqueada.', { cause: error });
    output = error.stdout;
  }
  return JSON.parse(output);
}

try {
  // Explicit include lists prevent an ambient omit=dev from hiding the toolchain.
  const full = audit(['--include=dev', '--include=optional', '--include=peer']);
  const production = audit(['--include=prod', '--include=optional', '--include=peer', '--omit=dev']);
  const lock = JSON.parse(await readFile(new URL('../package-lock.json', import.meta.url), 'utf8'));
  const result = assessDependencyAudit({ full, production, lock });
  if (result.developmentAlerts) {
    console.warn(`ATENÇÃO: ${result.developmentAlerts} alertas altos de desenvolvimento permanecem. ${result.advisory}`);
    console.warn(`Exceção restrita às versões revisadas, válida até ${result.expiresAt}. Não é patch nem garantia de segurança.`);
  }
  console.log(JSON.stringify(result, null, 2));
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
