import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';

// Inspect visitor-visible markup after the static export has been built.
const root = resolve('dist/client');
const page = async (route) => (await readFile(join(root, route, 'index.html'), 'utf8'))
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
  .replace(/<!--[\s\S]*?-->/g, '');

test('Memória preserves the announcement evidence for Chico Pomboca', async () => {
  const html = await page('memoria');
  const tale = html.match(/<article><span>Conto · 2022<\/span><h3>Chico Pomboca<\/h3>([\s\S]*?)<\/article>/)?.[1];
  assert.ok(tale, 'Chico Pomboca is missing from the memory records');
  assert.match(tale, /programação anunciada da 3ª Feira do Livro de Imbituba/);
  assert.doesNotMatch(tale, /apresentad[oa] publicamente|apresentação realizada|foi realizad[oa]/i);
  assert.match(tale, /href="\/projetos\/chico-pomboca"/);

  const project = await page('projetos/chico-pomboca');
  assert.match(project, /com narração prevista por Daniela Scartazzini/);
  assert.match(project, /não comprova, por si só, a realização da apresentação/);
});

test('Privacy explains the external game and its local high score storage', async () => {
  const html = await page('privacidade');
  const game = html.match(/<h2>Jogo Butiázinho<\/h2><p>([\s\S]*?)<\/p>/)?.[1];
  assert.ok(game, 'The external game disclosure is missing from the privacy page');
  assert.match(game, /só é carregado após você escolher “Jogar aqui”/);
  assert.match(game, /site externo butiazinho-games\.github\.io/);
  assert.match(game, /pode processar dados técnicos da conexão/);
  assert.match(game, /recorde entre partidas/);
  assert.match(game, /armazenamento local do navegador \(localStorage\), associado ao domínio do jogo/);
  assert.match(game, /portal do Mariscão não recebe nem armazena esse recorde/);
  assert.match(game, /limpe os dados do site do jogo nas configurações do navegador/);
});
