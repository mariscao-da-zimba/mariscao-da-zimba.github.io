import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';

// Inspect the published markup, not JSX strings. Build the static export first.
const root = resolve('dist/client');
const withoutScripts = (html) => html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '').replace(/<!--[\s\S]*?-->/g, '');
const page = async (route = '') => withoutScripts(await readFile(join(root, route, 'index.html'), 'utf8'));
const radioReference = '/fontes#fonte-butiazais-radio-2026';
const failedUrls = [
  'https://www.radiolagoadoce.com.br/coluna/a-heranca-dos-butiazais-biologia-saberes-ancestrais-e-a-alma-de-imbituba',
  'https://horahiper.com.br/geral/livro-jorge-coelho-coracao-acoriano-sera-lancado-nesta-semana-em-imbituba-10718',
  'https://horahiper.com.br/geral/mosaico-de-anita-garibaldi-e-inaugurado-em-imbituba-6152',
];

test('Educação usa EN estadual e atribui altura e longevidade ao guia', async () => {
  const html = await page('educacao-ambiental');
  assert.match(html, /<b>Em Perigo \(EN\)<\/b>/);
  assert.match(html, /CONSEMA 51\/2014/);
  assert.match(html, /altura indicada no guia/);
  assert.match(html, /anos de vida, segundo o guia/);
  assert.doesNotMatch(html, /<b>Vulnerável<\/b>/);
  assert.match(html, /O guia usa a classificação/);
  assert.match(html, /href="https:\/\/www\.semae\.sc\.gov\.br\/download\/resolucao-consema-no-51\/"/);
});

test('cronologia distingue Edital 2023 de resultado 2024 e não data a certificação', async () => {
  for (const route of ['', 'sobre']) {
    const html = await page(route);
    assert.match(html, /<time>Jan\. 2024<\/time>/);
    assert.match(html, /Edital Procult 01\/2023, conforme resultado final publicado em 25 de janeiro de 2024/);
    const year2025 = html.match(/<time>2025<\/time><p>([\s\S]*?)<\/p>/)?.[1];
    assert.ok(year2025, `Marco de 2025 ausente em /${route}`);
    assert.doesNotMatch(year2025, /certifica/i);
  }
  const project = await page('projetos/caminho-dos-butiazais');
  assert.match(project, /publicado em 25 de janeiro de 2024/);
  assert.match(project, /procult_2023_final_recursos_e_classificados_e_nao_classificados_extrato\.pdf/);
  assert.match(project, /programação prevista, não comprovam por si só a realização/);
});

test('As Faces de Anita mantém anúncio e estágio atual não confirmado', async () => {
  const html = await page('projetos/as-faces-de-anita');
  assert.match(html, /class="badge announced">Anunciado<\/span>/);
  assert.match(html, /Anunciado em 2024/);
  assert.match(html, /execução e estágio atual ainda precisam de confirmação/);
  assert.doesNotMatch(html, /Em desenvolvimento/);
});

test('Agenda distingue anúncios de registros e não promete realização', async () => {
  const html = await page('agenda');
  assert.match(html, /Registros e programação publicada/);
  assert.doesNotMatch(html, /Atividades realizadas/);
  assert.equal([...html.matchAll(/Programação anunciada ·/g)].length, 2);
  assert.equal([...html.matchAll(/Registro publicado ·/g)].length, 2);
  assert.match(html, /31 de março de 2025 previa/);
  assert.match(html, /30 de maio de 2025 previa/);
  assert.equal([...html.matchAll(/não a realização do encontro/g)].length, 2);
});

test('livro diferencia anúncio de setembro e programação de dezembro de 2022', async () => {
  const html = await page('projetos/jorge-coelho-coracao-acoriano');
  assert.match(html, /reportagem de 5 de setembro de 2022 anunciou um primeiro lançamento para 10 de setembro/);
  assert.match(html, /Em dezembro de 2022, o livro também foi incluído na programação/);
  assert.doesNotMatch(html, /foi lançad[oa] em dezembro/);
  assert.match(html, /imbituba-106264"/);
  const tale = await page('projetos/chico-pomboca');
  assert.doesNotMatch(tale, /levado à narração pública/);
  assert.match(tale, /com narração prevista por Daniela Scartazzini/);
  assert.match(tale, /não comprova, por si só, a realização da apresentação/);
});

test('Rádio preserva referência datada sem href morto em nenhuma página', async () => {
  const sources = await page('fontes');
  assert.match(sources, /id="fonte-butiazais-radio-2026"/);
  assert.match(sources, /Endereço indisponível na verificação de 08\/10\/2026/);
  assert.match(sources, /Referência bibliográfica preservada/);
  assert.match(sources, /publicado em 06\/02\/2026/);
  for (const route of ['', 'agenda', 'acervo', 'projetos/butia-raizes']) {
    assert.ok((await page(route)).includes(`href="${radioReference}"`), `Referência local ausente em /${route}`);
  }
  const sitemap = await readFile(join(root, 'sitemap.xml'), 'utf8');
  for (const [, location] of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const route = new URL(location).pathname;
    const html = await page(route);
    for (const [, href] of html.matchAll(/\bhref="([^"]+)"/g)) {
      assert.ok(!failedUrls.includes(href), `Endereço indisponível ativo em ${route}: ${href}`);
    }
  }
});

test('referências do mosaico e do livro usam as URLs equivalentes verificadas', async () => {
  const sources = await page('fontes');
  const poem = await page('projetos/sonho-de-liberdade');
  assert.match(sources, /mosaico-de-anita-garibaldi-e-inaugurado-em-imbituba-101940"/);
  assert.match(poem, /mosaico-de-anita-garibaldi-e-inaugurado-em-imbituba-101940"/);
  assert.match(sources, /livro-jorge-coelho-coracao-acoriano-sera-lancado-nesta-semana-em-imbituba-106264"/);
});
