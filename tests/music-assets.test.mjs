import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

function jpegDimensions(bytes) {
  assert.equal(bytes.readUInt16BE(0), 0xffd8, 'Capa deve ser JPEG válido');
  let offset = 2;
  while (offset < bytes.length) {
    while (bytes[offset] === 0xff) offset++;
    const marker = bytes[offset++];
    if (marker === 0xd9 || marker === 0xda) break;
    if (marker === 0x01 || marker >= 0xd0 && marker <= 0xd7) continue;
    const length = bytes.readUInt16BE(offset);
    assert.ok(length >= 2 && offset + length <= bytes.length, 'Segmento JPEG inválido');
    if ([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf].includes(marker)) {
      return { height: bytes.readUInt16BE(offset + 3), width: bytes.readUInt16BE(offset + 5) };
    }
    offset += length;
  }
  throw new Error('JPEG sem dimensões');
}

test('oito capas musicais reservam suas dimensões reais, sem ampliar a resolução declarada', async () => {
  const html = (await readFile('dist/client/cultura/index.html', 'utf8')).replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
  const images = [...html.matchAll(/<img\b[^>]*>/gi)].map(([tag]) => Object.fromEntries(
    [...tag.matchAll(/\b([\w-]+)="([^"]*)"/g)].map(([, key, value]) => [key, value]),
  )).filter(image => /\/(?:turma-da-mare-[\w-]+|memorias-afetivas-youtube)\.jpg$/.test(image.src ?? ''));
  assert.equal(images.length, 8);
  for (const image of images) {
    const jpeg = await readFile(`dist/client${image.src}`);
    assert.deepEqual(jpegDimensions(jpeg), { width: Number(image.width), height: Number(image.height) }, image.src);
    assert.equal(image.loading, 'lazy');
    assert.equal(image.decoding, 'async');
    assert.deepEqual(await readFile(`public${image.src}`), jpeg, 'Preservar a capa oficial original');
  }
});
