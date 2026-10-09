import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import postcss from 'postcss';

const root = resolve('dist/client');
const luminance = (hex) => {
  const rgb = hex.slice(1).match(/../g).map((channel) => parseInt(channel, 16) / 255);
  const linear = rgb.map((channel) => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4);
  return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
};
const contrast = (first, second) => {
  const a = luminance(first);
  const b = luminance(second);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
};

test('títulos das seções escuras e Ameaças têm regra clara no CSS entregue e contraste AA', async () => {
  const html = await readFile(join(root, 'educacao-ambiental/index.html'), 'utf8');
  assert.match(html, /class="content-section threat-section"/);
  assert.match(html, /O que pressiona os butiazais/);
  const urls = [...html.matchAll(/<link\b[^>]*href="([^"?#]+\.css)"[^>]*>/g)].map((match) => match[1]);
  assert.ok(urls.length > 0, 'A página deve entregar CSS');
  const css = postcss.parse((await Promise.all(urls.map((url) => readFile(join(root, url), 'utf8')))).join('\n'));
  const vars = new Map();
  const colors = new Map();
  const selectors = ['.content-section.dark .content-heading h2', '.content-section.threat-section .content-heading h2'];
  css.walkRules((rule) => {
    if (rule.selector === ':root') rule.walkDecls(/^--/, (declaration) => vars.set(declaration.prop, declaration.value));
    for (const selector of selectors) {
      if (rule.selector.split(',').map((item) => item.trim()).includes(selector)) {
        rule.walkDecls('color', (declaration) => colors.set(selector, declaration.value));
      }
    }
  });
  const background = vars.get('--deep');
  assert.equal(background, '#123b44');
  for (const selector of selectors) {
    assert.equal(colors.get(selector), 'var(--paper)', `${selector}: a regra clara precisa chegar ao CSS exportado`);
    const foreground = vars.get('--paper');
    assert.equal(foreground, '#f7f6f0');
    assert.ok(contrast(foreground, background) >= 4.5, `${selector}: contraste de texto normal abaixo de AA`);
  }
  assert.ok(contrast('#113f4b', background) < 3, 'O teste também deve detectar a combinação anterior');
});
