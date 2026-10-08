// Offline recognition: only the public language model is downloaded. No guide
// image or extracted text is uploaded. Run outside the normal website build.
import { createRequire } from 'node:module';
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { join, resolve } from 'node:path';

const [imageDirectory, outputDirectory, modulePath = 'tesseract.js', mode = 'auto', pageFilter = ''] = process.argv.slice(2);
if (!imageDirectory || !outputDirectory) throw new Error('Usage: node scripts/ocr-guide.mjs IMAGE_DIR OUTPUT_DIR [TESSERACT_MODULE]');
const require = createRequire(import.meta.url);
const { createWorker, PSM } = require(modulePath);
const input = resolve(imageDirectory);
const output = resolve(outputDirectory);
await mkdir(output, { recursive: true });
if (!['auto', 'sparse'].includes(mode)) throw new Error('Recognition mode must be auto or sparse');
const selected = pageFilter ? new Set(pageFilter.split(',').map(Number)) : null;
const files = (await readdir(input)).filter(file => /^guia-\d+\.png$/.test(file) && (!selected || selected.has(Number(file.match(/\d+/)[0])))).sort();
if (!files.length || files.length > 56) throw new Error(`Unexpected guide page count: ${files.length}`);
if (files.length < 56) console.log(`Partial recognition: ${files.length}/56 images. Run again after rendering; the final PDF requires all 56.`);
let next = 0;
await Promise.all([0, 1].map(async () => {
  const worker = await createWorker('por', 1, { cachePath: output });
  await worker.setParameters({ tessedit_pageseg_mode: mode === 'sparse' ? PSM.SPARSE_TEXT : PSM.AUTO, user_defined_dpi: '270' });
  try {
    while (next < files.length) {
      const file = files[next++];
      const bytes = await readFile(join(input, file));
      const sha256 = createHash('sha256').update(bytes).digest('hex');
      const destination = join(output, file.replace('.png', '.json'));
      try {
        const cached = JSON.parse(await readFile(destination, 'utf8'));
        if (cached.imageSha256 === sha256 && (cached.mode || 'auto') === mode) continue;
      } catch { /* Missing or stale recognition: regenerate locally. */ }
      const { data } = await worker.recognize(bytes, {}, { text: true, blocks: true });
      await writeFile(destination, JSON.stringify({ imageSha256: sha256, mode, text: data.text, confidence: data.confidence, blocks: data.blocks }), 'utf8');
      console.log(`${file}: ${data.text.length} chars; confidence ${data.confidence}`);
    }
  } finally {
    await worker.terminate();
  }
}));
