import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, sep, extname, join } from 'node:path';
const root = resolve('dist/client');
const types = { '.html':'text/html; charset=utf-8', '.css':'text/css', '.js':'text/javascript', '.json':'application/json', '.xml':'application/xml', '.txt':'text/plain', '.webmanifest':'application/manifest+json', '.webp':'image/webp', '.jpg':'image/jpeg', '.png':'image/png', '.svg':'image/svg+xml', '.woff2':'font/woff2', '.pdf':'application/pdf' };
createServer(async (req,res) => {
  try {
    if (!['GET','HEAD'].includes(req.method)) { res.writeHead(405).end(); return; }
    const url = new URL(req.url,'http://localhost');
    const pathname = decodeURIComponent(url.pathname);
    let file = resolve(root,'.'+pathname);
    if (file !== root && !file.startsWith(root+sep)) { res.writeHead(403).end(); return; }
    let info;
    try { info = await stat(file); } catch { /* use genuine 404 below */ }
    if (info?.isDirectory()) {
      if (!url.pathname.endsWith('/')) { res.writeHead(301,{Location:url.pathname+'/'+url.search}).end(); return; }
      file=join(file,'index.html');
    }
    let data, status=200;
    try { data=await readFile(file); } catch { status=404; file=join(root,'404.html'); data=await readFile(file); }
    res.writeHead(status,{'Content-Type':types[extname(file)]||'application/octet-stream','Cache-Control':'no-cache','X-Content-Type-Options':'nosniff'});
    res.end(req.method==='HEAD'?undefined:data);
  } catch { res.writeHead(500).end('Erro na prévia estática'); }
}).listen(4173,'127.0.0.1',()=>console.log('Prévia estática: http://127.0.0.1:4173'));
