import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

test('guia completo corresponde ao PDF pesquisável e visualmente verificado', async () => {
  const manifest = JSON.parse(await readFile('content/guide-document.json', 'utf8'));
  const pdf = await readFile(manifest.file);
  const deployedPdf = await readFile('dist/client/documentos/guia-caminho-dos-butiazais.pdf');
  assert.equal(pdf.subarray(0, 5).toString(), '%PDF-');
  assert.equal(pdf.length, manifest.bytes);
  assert.equal(createHash('sha256').update(pdf).digest('hex'), manifest.sha256);
  assert.deepEqual(deployedPdf, pdf);
  assert.equal(manifest.pages, 56);
  assert.equal(manifest.bookmarks, 17);
  assert.equal(manifest.language, 'pt-BR');
  assert.ok(manifest.extractedCharacters > 20000);
  assert.ok(manifest.bytes < 10_000_000);
  assert.equal(manifest.pdfUaCertified, false);
  assert.match(manifest.visualComparison, /zero differing pixels/);
  const html = await readFile('dist/client/acervo/index.html', 'utf8');
  assert.match(html, /busca por texto via OCR/);
  assert.match(html, /reconhecimento automático pode conter erros/);
});
