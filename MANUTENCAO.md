# Manutenção da edição GitHub Pages

## Butiázinho — integração de 12/09/2026

Home e Educação Ambiental usam components/butiazinho-feature.tsx, com dados em content/butiazinho.ts e estilos isolados em app/butiazinho.css. O endereço fornecido tinyurl.com/butiazinho foi resolvido e confirmado como https://butiazinho-games.github.io/Butiazinho-The-Game/. O cartaz foi fornecido pelo proprietário (188 KB, sem ampliar nem alterar a imagem). O link do Instagram foi fornecido pelo proprietário; a publicação não pôde ser lida automaticamente, portanto não foram extraídas afirmações dela.

O jogo externo só é carregado após clique, em iframe isolado com allow-scripts e allow-same-origin (domínio diferente do portal). Não recebe câmera, microfone, localização, popups nem navegação do portal. Fechar remove o iframe e encerra a sessão. Existe link direto de fallback, funcional mesmo sem JavaScript. Não hospedar ou executar o código do jogo no contexto do portal. O funcionamento interno do jogo depende do site externo; não prometer acessibilidade total do canvas ou execução offline.

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
