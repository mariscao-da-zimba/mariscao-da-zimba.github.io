import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access, stat } from 'node:fs/promises';
import { extname, join, relative, resolve, sep } from 'node:path';
const root=resolve('dist/client');

// These checks inspect the actual exported HTML, not JSX source. Run npm run
// build first; they also run in the GitHub Pages workflow before deployment.
const decodeHtml = (value) => value.replace(/&(?:amp|quot|apos|lt|gt|#\d+|#x[\da-f]+);/gi, (entity) => {
  const named = { '&amp;': '&', '&quot;': '"', '&apos;': "'", '&lt;': '<', '&gt;': '>' };
  return named[entity.toLowerCase()] ?? String.fromCodePoint(
    entity.toLowerCase().startsWith('&#x') ? parseInt(entity.slice(3, -1), 16) : Number(entity.slice(2, -1)),
  );
});
const attributes = (tag) => Object.fromEntries([...tag.matchAll(/\s([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)]
  .map(([, key, double, single]) => [key.toLowerCase(), decodeHtml(double ?? single)]));
const withoutScripts = (html) => html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
const tags = (html, name) => [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, 'gi'))].map(([tag]) => attributes(tag));
const normalizeRoute = (path) => path.replace(/\/+$/, '') || '/';

function localFile(pathname) {
  const file = resolve(root, `.${decodeURIComponent(pathname)}`);
  const inside = relative(root, file);
  assert.ok(inside !== '..' && !inside.startsWith(`..${sep}`), `Arquivo fora da exportação: ${pathname}`);
  return file;
}

let exportPromise;
function exportedPages() {
  exportPromise ??= (async () => {
    const xml = await readFile(join(root, 'sitemap.xml'), 'utf8');
    const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, loc]) => new URL(decodeHtml(loc)));
    assert.equal(urls.length, 42, 'O portal precisa preservar suas 42 páginas');
    assert.equal(new Set(urls.map((url) => normalizeRoute(url.pathname))).size, urls.length, 'Rotas duplicadas no sitemap');
    return Promise.all(urls.map(async (url) => {
      const html = await readFile(join(localFile(url.pathname), 'index.html'), 'utf8');
      return { url, html, dom: withoutScripts(html) };
    }));
  })();
  return exportPromise;
}
test('42 páginas exportadas com recursos locais existentes',async()=>{
  const xml=await readFile(join(root,'sitemap.xml'),'utf8');
  const routes=[...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>new URL(m[1]).pathname);
  assert.equal(routes.length,42);
  const assets=new Set();
  for(const route of routes){
    const html=await readFile(join(root,route,'index.html'),'utf8');
    assert.equal([...html.matchAll(/<h1(?:\s|>)/g)].length,1,route);
    assert.match(html,/<html[^>]+lang="pt-BR"/,route);
    assert.doesNotMatch(html,/jesusaindasalva1\.chatgpt\.site/,route);
    for(const [,path] of html.matchAll(/(?:src|href)="(\/[^"<>]+)"/g)){
      const local=new URL(path,'http://localhost');
      if(/\.[a-z\d]+$/i.test(local.pathname)) assets.add(local.pathname);
    }
  }
  for(const asset of assets) await access(join(root,decodeURIComponent(asset)));
  await access(join(root,'.nojekyll'));
  await access(join(root,'404.html'));
});
test('redirecionamentos antigos têm destino canônico',async()=>{
  const html=await readFile(join(root,'projetos/menina-do-vento-nordeste/index.html'),'utf8');
  assert.match(html,/http-equiv="refresh"/);
  assert.match(html,/\/projetos\/sonho-de-liberdade\//);
  await access(join(root,'caminho-dos-butiazais/trilha-do-pontal-do-catalao/index.html'));
});
test('Butiázinho tem acesso direto sem carregar o jogo antes do clique',async()=>{
  for(const route of ['', 'educacao-ambiental']){
    const html=await readFile(join(root,route,'index.html'),'utf8');
    assert.match(html,/id="butiazinho"/);
    assert.match(html,/href="https:\/\/butiazinho-games\.github\.io\/Butiazinho-The-Game\/"/);
    assert.match(html,/href="https:\/\/www\.instagram\.com\/p\/DaBCHBClq-K\/"/);
    assert.match(html,/butiazinho-divulgacao\.jpg/);
    assert.doesNotMatch(html,/<iframe[^>]+butiazinho-games/);
    assert.match(html,/aria-controls="butiazinho-player"/);
  }
});

test('links internos e âncoras têm destinos reais, sem botões-link vazios', async () => {
  const pages = await exportedPages();
  const pagesByRoute = new Map(pages.map((page) => [normalizeRoute(page.url.pathname), page]));
  const idsByRoute = new Map();
  for (const page of pages) {
    const ids = [...page.dom.matchAll(/\bid="([^"]+)"/g)].map(([, id]) => decodeHtml(id));
    assert.equal(new Set(ids).size, ids.length, `IDs duplicados em ${page.url.pathname}`);
    idsByRoute.set(normalizeRoute(page.url.pathname), new Set(ids));
  }
  for (const page of pages) {
    for (const link of tags(page.dom, 'a')) {
      assert.ok(link.href?.trim() && link.href.trim() !== '#', `Link vazio em ${page.url.pathname}`);
      assert.doesNotMatch(link.href, /^\s*javascript:/i, `Link JavaScript em ${page.url.pathname}`);
      if (link.target === '_blank') {
        assert.match(link.rel ?? '', /(?:^|\s)(?:noopener|noreferrer)(?:\s|$)/,
          `Link em nova aba sem isolamento: ${page.url.pathname} → ${link.href}`);
      }
      const url = new URL(link.href, page.url);
      if (url.origin !== page.url.origin) continue;
      const route = normalizeRoute(url.pathname);
      const destination = pagesByRoute.get(route);
      if (destination) {
        if (url.hash) {
          assert.ok(idsByRoute.get(route).has(decodeURIComponent(url.hash.slice(1))),
            `Âncora ausente: ${page.url.pathname} → ${link.href}`);
        }
      } else {
        const file = localFile(url.pathname);
        // PDF #page= references address the viewer, not an HTML element.
        await access(extname(url.pathname) ? file : join(file, 'index.html'));
      }
    }
  }
});

test('cada página preserva metadados, viewport móvel e navegação acessível', async () => {
  for (const { url, dom } of await exportedPages()) {
    assert.match(dom, /<title>[^<]+<\/title>/, `Título SEO: ${url.pathname}`);
    const meta = tags(dom, 'meta');
    const value = (key) => meta.find((item) => item.name === key || item.property === key)?.content;
    assert.ok(value('description')?.trim(), `Descrição SEO: ${url.pathname}`);
    assert.match(value('viewport') ?? '', /width=device-width/, `Viewport: ${url.pathname}`);
    assert.doesNotMatch(value('viewport') ?? '', /user-scalable\s*=\s*no|maximum-scale\s*=\s*1(?:\D|$)/,
      `Zoom bloqueado: ${url.pathname}`);
    for (const key of ['og:title', 'og:description', 'og:image', 'twitter:card']) {
      assert.ok(value(key)?.trim(), `${key}: ${url.pathname}`);
    }
    const canonicals = tags(dom, 'link').filter((item) => item.rel === 'canonical');
    assert.equal(canonicals.length, 1, `Canonical único: ${url.pathname}`);
    const canonical = new URL(canonicals[0].href);
    assert.equal(canonical.origin, url.origin, `Domínio canônico: ${url.pathname}`);
    assert.equal(normalizeRoute(canonical.pathname), normalizeRoute(url.pathname), `Rota canônica: ${url.pathname}`);
    assert.ok(tags(dom, 'a').some((link) => link.href === '#conteudo'), `Pular para conteúdo: ${url.pathname}`);
    assert.match(dom, /id="conteudo"/, `Destino do atalho: ${url.pathname}`);
    assert.equal(tags(dom, 'main').length, 1, `Marco principal: ${url.pathname}`);
    const organization = [...dom.matchAll(/<html\b[^>]*>/g)];
    assert.equal(organization.length, 1, `Documento HTML válido: ${url.pathname}`);
  }
});

test('imagens têm dimensões e alternativas; embeds iniciais são leves e identificados', async () => {
  for (const { url, dom } of await exportedPages()) {
    for (const image of tags(dom, 'img')) {
      assert.ok(Object.hasOwn(image, 'alt'), `Imagem sem alt em ${url.pathname}: ${image.src}`);
      assert.ok(Number(image.width) > 0 && Number(image.height) > 0,
        `Imagem sem dimensões reservadas em ${url.pathname}: ${image.src}`);
      assert.ok(image.loading === 'lazy' || image.fetchpriority === 'high',
        `Imagem sem prioridade/carregamento declarado em ${url.pathname}: ${image.src}`);
    }
    for (const iframe of tags(dom, 'iframe')) {
      assert.ok(iframe.title?.trim(), `Iframe sem nome em ${url.pathname}`);
      assert.equal(iframe.loading, 'lazy', `Iframe inicial precisa carregar sob demanda: ${url.pathname}`);
      assert.ok(iframe.src?.startsWith('https://'), `Iframe sem HTTPS: ${url.pathname}`);
    }
  }
});

test('assets de imagens responsivas, CSS e fontes existem e não estão vazios', async () => {
  const assets = new Set();
  const addAsset = (value, base) => {
    if (!value || /^(?:data|blob):/i.test(value)) return;
    const url = new URL(value, base);
    if (url.origin === base.origin && extname(url.pathname)) assets.add(url.pathname);
  };
  const pages = await exportedPages();
  for (const { url, html, dom } of pages) {
    for (const tag of [...tags(dom, 'img'), ...tags(dom, 'source'), ...tags(html, 'script'), ...tags(dom, 'link')]) {
      addAsset(tag.src ?? tag.href, url);
      if (tag.srcset) {
        for (const candidate of tag.srcset.split(',')) addAsset(candidate.trim().split(/\s+/)[0], url);
      }
    }
    for (const item of tags(dom, 'meta').filter((tag) => ['og:image', 'twitter:image'].includes(tag.property ?? tag.name))) {
      addAsset(item.content, url);
    }
  }
  assert.ok([...assets].some((path) => path.endsWith('.css')), 'Exportação sem stylesheet');
  for (const asset of assets) {
    const file = localFile(asset);
    assert.ok((await stat(file)).size > 0, `Asset vazio: ${asset}`);
    if (asset.endsWith('.css')) {
      const css = await readFile(file, 'utf8');
      for (const [, value] of css.matchAll(/url\(\s*["']?([^\s"')]+)["']?\s*\)/g)) {
        addAsset(value, new URL(asset, pages[0].url));
      }
    }
  }
});
