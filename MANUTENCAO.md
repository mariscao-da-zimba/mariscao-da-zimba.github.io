# Manutenção da edição GitHub Pages

## Upgrade editorial e vídeos — 03/10/2026

O vídeo enviado pelo proprietário está em `https://www.youtube.com/watch?v=_wfX7fFoig0`. Título e canal foram confirmados pelo oEmbed público do YouTube: “— Ponto de Cultura Viva aos 68 anos de emancipação”, canal Mariscao (`@mariscaodazimba`). A apresentação omite apenas o travessão inicial do título. A descrição pública identifica homenagem aos 68 anos de emancipação de Imbituba (1958–2026), realização do Centro e apoio de IA em imagens, edição e composição musical. Duração conferida no player: 3min59. Não apresentar suas imagens artísticas como fotografias documentais. A transcrição automática contém erros de nomes; não copiá-la como texto histórico nem como letra oficial.

Dados em `content/tribute.ts`; seção da Home em `components/tribute-video.tsx`, destino público `/#homenagem`, com acesso também pelo Acervo e registro em Fontes. A capa original de 1280 × 720 (111.791 bytes) foi obtida de `https://i.ytimg.com/vi/_wfX7fFoig0/maxresdefault.jpg` e hospedada localmente. Antes do clique, a seção não solicita conteúdo ao YouTube. O player usa youtube-nocookie, preserva o referrer de origem necessário ao YouTube e só recebe autoplay depois do clique. Fechar remove o iframe e devolve foco ao botão. O link direto permite assistir mesmo sem JavaScript. Estilos acrescentados à camada existente `app/refinement.css`.

Os três Shorts do mesmo canal foram confirmados com oEmbed e a listagem pública: `EczZf3JCFgY` — “Vem com a turma da maré.”; `gq3BJ_1M11k` — “Rosa de ouro.”; `BcA7YE2Vt9s` — “Vem brincar com a Turma do Mar.”. Preservar o título Mar, mesmo sendo uma seleção ligada à Turma da Maré. O proprietário identifica os três como suas criações; não foram inferidos letristas adicionais, licenças comerciais nem datas de produção.

Dados em `content/music-videos.ts`; galeria em `components/music-videos.tsx`, disponível na Home e em `/cultura#musicas-da-mare`, conectada ao Acervo, ao projeto Turma da Maré e a Fontes. Capas originais maxresdefault do YouTube: 1280 × 720, respectivamente 127.665, 81.604 e 121.625 bytes. Recorte central apenas em CSS; arquivos originais preservados. `components/use-media-playback.ts` impede reprodução simultânea entre as novas seções: escolher outro vídeo remove o anterior; fechar devolve foco ao botão de origem. Links diretos continuam úteis sem JavaScript ou se o provedor bloquear reprodução incorporada.

A Home organiza apresentação → homenagem → músicas → eixos/roteiro/projetos → registros/jogo → história/visita. Atalhos discretos levam aos três conteúdos interativos. No desktop a galeria mostra três cards; no celular eles são horizontais e compactos, expandindo o vídeo escolhido para 9:16. Capas locais e carregamento sob demanda evitam quatro players na abertura. Efeitos limitados a pequenos acentos e respeitam prefers-reduced-motion. Não acrescentar uma nova camada CSS de sobrescritas.

Relatório de fontes, testes e limitações: `UPGRADE-MIDIA-2026-10-03.md`. Lint, TypeScript, build e nove testes aprovados. Os quatro players foram reproduzidos na prévia e as 42 páginas verificadas em 320 px, sem rolagem horizontal nem títulos cortados. Canal Mariscao acrescentado ao rodapé e Contato. A versão local ainda exige login do proprietário no GitHub para publicar; não confundir prévia com site público.

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
