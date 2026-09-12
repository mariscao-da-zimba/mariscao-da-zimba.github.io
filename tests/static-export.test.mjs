import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { join, resolve } from 'node:path';
const root=resolve('dist/client');
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
