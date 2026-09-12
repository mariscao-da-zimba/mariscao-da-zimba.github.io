# Manutenção da edição GitHub Pages

## Diferenças intencionais

- `vite.config.ts` usa apenas Vinext. Não depende de autenticação ChatGPT, conta Sites, Cloudflare Tunnel, Worker ou serviços do Windows.
- `next.config.ts` usa output export e trailingSlash false. Na versão instalada do Vinext, trailingSlash true causa respostas308 durante prerender. NÃO habilitar sem retestar todas as páginas.
- `scripts/finalize-pages.mjs` converte as páginas `rota.html` em `rota/index.html` para hospedagem estática, gera sitemap a partir das páginas exportadas, robots e manifest. Verifica 42 páginas e prepara dois redirects HTML legados. Não são redirects HTTP308, pois Pages não fornece esse servidor.
- `components/document-link.tsx` usa links HTML normais. O next/link desta versão espera respostas RSC de servidor que Pages não fornece. Não reintroduzir next/link sem validar navegação num servidor estático puro.
- Menus, filtros, contato WhatsApp e animações continuam componentes React hidratados.
- O workflow define NEXT_PUBLIC_SITE_URL a partir do Pages, testa e publica dist/client. Não publica arquivos fontes como site, nem usa os cabeçalhos do antigo Worker. `_headers` não configura o GitHub Pages.

## Cuidados

Os documentos/fontes continuam os da revisão local. Este preparo não faz nova auditoria histórica ou de todos os links externos. Não inventar horários, cargos, perfis, direitos autorais, números ou reconhecimentos legais. Preservar créditos essenciais e atribuir a Lei Estadual19.013 ao bem cultural geral, sem confundir com moção municipal.

O número42 no validador corresponde a14 páginas principais,14 projetos e14 pontos. Ao acrescentar uma página real, atualizar o teste conscientemente e revisar sitemap.

Não há CMS nem edição pública. Alterações são feitas no código/dados e entram no ar após o workflow. O site pode ficar disponível com o notebook desligado depois da publicação, dependendo da disponibilidade e limites do GitHub.

## Segurança

Não há backend de formulário, segredos de produção ou banco de dados. O workflow usa o token automático do GitHub com permissões limitadas; não adicionar tokens pessoais. As dependências estão fixadas em package-lock.json. Atualizar com testes. Proteções HTTP da antiga hospedagem não são garantidas pelo Pages; não anunciar auditoria de invasão ou segurança absoluta.
