import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';

const root = resolve('dist/client');
const page = async (route) => (await readFile(join(root, route, 'index.html'), 'utf8'))
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
  .replace(/<!--[\s\S]*?-->/g, '');
const title = (html) => html.match(/<title>([^<]+)<\/title>/)?.[1];
const attributes = (tag) => Object.fromEntries([...tag.matchAll(/\s([\w:-]+)="([^"]*)"/g)]
  .map(([, name, value]) => [name.toLowerCase(), value]));
const tags = (html, name) => [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, 'gi'))]
  .map(([tag]) => attributes(tag));

test('Fontes reproduz o título de Porto Belo sem acrescentar crase', async () => {
  const html = await page('fontes');
  const source = html.match(/<article\b[^>]*id="fonte-porto-belo-2026"[^>]*>([\s\S]*?)<\/article>/)?.[1];
  assert.ok(source, 'Preservar a referência de Porto Belo');
  assert.match(source, /Comitiva de Imbituba visita Fundação de Cultura de Porto Belo/);
  assert.doesNotMatch(source, /visita à Fundação/);
  assert.match(source, /href="https:\/\/jornaldosbairros\.tv\/noticia\/94077\/comitiva-de-imbituba-visita-fundacao-de-cultura-de-porto-belo"/);
});

test('guia e projeto do Caminho têm títulos SEO distintos sem mudar H1 ou endereço', async () => {
  const entries = [
    ['caminho-dos-butiazais', 'Guia do Caminho dos Butiazais'],
    ['projetos/caminho-dos-butiazais', 'Projeto Caminho dos Butiazais'],
  ];
  const titles = [];
  for (const [route, expected] of entries) {
    const html = await page(route);
    assert.equal(title(html), `${expected} | Mariscão da Zimba`);
    titles.push(title(html));
    const metas = tags(html, 'meta');
    assert.equal(metas.find((meta) => meta.property === 'og:title')?.content, expected);
    assert.equal(metas.find((meta) => meta.name === 'twitter:title')?.content, expected);
    const canonical = tags(html, 'link').find((link) => link.rel === 'canonical')?.href;
    assert.ok(canonical, `Canonical de ${route}`);
    assert.equal(new URL(canonical).pathname.replace(/\/$/, ''), `/${route}`);
    const h1 = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)?.[1];
    assert.ok(h1, `H1 de ${route}`);
    assert.equal(h1.replace(/<[^>]*>/g, '').replace(/\s+/g, ''), 'CaminhodosButiazais');
  }
  assert.equal(new Set(titles).size, entries.length);
});
