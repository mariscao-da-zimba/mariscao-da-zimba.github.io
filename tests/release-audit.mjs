import assert from 'node:assert/strict';

// Run against the actual production process after every deployment/restart.
// Checking generated HTML alone misses stale processes and missing hashed assets.
const origin = process.argv[2] || 'http://127.0.0.1:3100';
const get = (path) => fetch(new URL(path, origin), { signal: AbortSignal.timeout(20000) });
const sitemap = await get('/sitemap.xml');
assert.equal(sitemap.status, 200);
const paths = [...(await sitemap.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => new URL(m[1]).pathname);
assert.ok(paths.length >= 42, 'Sitemap incompleto');
const assets = new Set();
const links = new Set();
for (const path of paths) {
  const response = await get(path);
  assert.equal(response.status, 200, path);
  const html = await response.text();
  assert.match(html, /<html[^>]+lang="pt-BR"/, path);
  assert.equal([...html.matchAll(/<h1(?:\s|>)/g)].length, 1, `Título principal: ${path}`);
  assert.match(html, /<title>[^<]+<\/title>/, `Título SEO: ${path}`);
  assert.match(html, /\.css/, `Estilos: ${path}`);
  for (const [, value] of html.matchAll(/(?:src|href)="([^"<>]+)"/g)) {
    if (!value.startsWith('/') || value.startsWith('//')) continue;
    const url = new URL(value.replaceAll('&amp;', '&'), origin);
    if (/\.[a-z\d]+$/i.test(url.pathname)) assets.add(url.pathname + url.search);
    else links.add(url.pathname);
  }
  for (const [, value] of html.matchAll(/srcSet="([^"<>]+)"/gi)) {
    for (const item of value.split(',')) {
      const src = item.trim().split(/\s+/)[0];
      if (src.startsWith('/')) assets.add(src);
    }
  }
}
for (const path of links) assert.equal((await get(path)).status, 200, `Link interno: ${path}`);
let bytes = 0;
for (const path of assets) {
  const response = await get(path);
  assert.equal(response.status, 200, `Arquivo: ${path}`);
  assert.ok(!(response.headers.get('content-type') || '').includes('text/html'), `HTML no lugar de arquivo: ${path}`);
  const size = (await response.arrayBuffer()).byteLength;
  assert.ok(size > 0, `Arquivo vazio: ${path}`);
  bytes += size;
}
assert.equal((await get('/pagina-inexistente-auditoria')).status, 404, 'Página inexistente precisa retornar 404');
console.log(JSON.stringify({ origin, pages: paths.length, internalLinks: links.size, assets: assets.size, totalAssetBytes: bytes, status: 'PASS' }, null, 2));
