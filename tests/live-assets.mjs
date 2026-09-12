import assert from 'node:assert/strict';

// Verify the running server, not only server-side HTML: a stale process can
// reference deleted CSS/JS hashes after another build replaces dist/client.
const origin = process.argv[2] || 'http://127.0.0.1:3100';
const response = await fetch(origin, { signal: AbortSignal.timeout(15000) });
assert.equal(response.status, 200, 'Home indisponível');
const html = await response.text();
const assets = [...new Set([...html.matchAll(/(?:src|href)="([^"<>]+)"/g)]
  .map((match) => match[1])
  .filter((path) => path.startsWith('/_next/') && /\.(css|js|woff2)(?:\?|$)/.test(path)))];
assert.ok(assets.some((path) => path.endsWith('.css')), 'HTML sem folha de estilo');
for (const path of assets) {
  const asset = await fetch(new URL(path, origin), { signal: AbortSignal.timeout(15000) });
  assert.equal(asset.status, 200, `Arquivo ausente: ${path}`);
  const type = asset.headers.get('content-type') || '';
  assert.ok(!type.includes('text/html'), `HTML retornado no lugar do arquivo: ${path}`);
  assert.ok((await asset.arrayBuffer()).byteLength > 0, `Arquivo vazio: ${path}`);
}
console.log(`Servidor validado: ${assets.length} arquivos CSS, JavaScript e fontes disponíveis em ${origin}`);
