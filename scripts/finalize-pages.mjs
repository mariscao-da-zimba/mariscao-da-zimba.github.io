import { access, copyFile, mkdir, readdir, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
const root = resolve('dist/client');
await access(join(root, 'index.html'));
// Vinext beta does not emit metadata routes consistently during static export.
const publicUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:4173');
if (publicUrl.pathname !== '/') throw new Error('Esta entrega exige hospedagem na raiz do dominio.');
const pageFiles = (await readdir(root,{recursive:true})).filter(file=>file.endsWith('.html') && file!=='404.html' && !file.replaceAll('\\','/').endsWith('/index.html'));
const paths = pageFiles.map(file=>file==='index.html'?'/':'/'+file.replaceAll('\\','/').replace(/\.html$/, ''));
if (paths.length !== 42) throw new Error('Exportacao incompleta: esperadas 42 paginas, encontradas '+paths.length);
const xml = '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+paths.map(path=>'<url><loc>'+new URL(path,publicUrl).href+'</loc></url>').join('')+'</urlset>';
await writeFile(join(root,'sitemap.xml'),xml);
await writeFile(join(root,'robots.txt'),'User-agent: *\n'+(publicUrl.hostname==='localhost'?'Disallow: /':'Allow: /')+'\nSitemap: '+new URL('/sitemap.xml',publicUrl).href+'\n');
const { default: manifest } = await import('../app/manifest.ts');
await writeFile(join(root,'manifest.webmanifest'),JSON.stringify(manifest()));
await writeFile(join(root, '.nojekyll'), '');
const redirects = {
  '/projetos/menina-do-vento-nordeste': '/projetos/sonho-de-liberdade/',
  '/caminho-dos-butiazais/trilha-do-pontal-do-catalao': '/caminho-dos-butiazais/trilha-ponta-do-catalao/',
};
for (const [from, to] of Object.entries(redirects)) {
  await mkdir(join(root, from), { recursive: true });
  await writeFile(join(root, from, 'index.html'), `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta http-equiv="refresh" content="0;url=${to}"><link rel="canonical" href="${new URL(to, process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:4173').href}"><title>Página atualizada | Mariscão da Zimba</title></head><body><h1>Este conteúdo mudou de endereço</h1><a href="${to}">Continuar para a página atualizada</a></body></html>`);
}
for (const path of paths) {
  if (path !== '/') {
    await mkdir(join(root,path), { recursive: true });
    await copyFile(join(root,path+'.html'),join(root,path,'index.html'));
  }
  await access(join(root,path,'index.html'));
}
await access(join(root,'404.html'));
console.log('Exportação verificada: 42 páginas, 2 redirecionamentos, 404, sitemap e robots.');
