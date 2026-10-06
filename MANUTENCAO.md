# Manutenção da edição GitHub Pages

## Ampliação das praias em vídeo — 06/10/2026

Base publicada: `1235d290745b3989a4121c0bff8b5396ec4644a9`. A galeria passa de dez para 19 Shorts, com nove novos vídeos do mesmo canal: Lagoa de Ibiraquera, Lagoa do Mirim, Praia Vermelha, Praia do Rosa, Praia do Luz, Ilha do Batuta e Praia da Barra de Ibiraquera, Barra de Ibiraquera, Praia da Ribanceira e Praia dos Amores. Títulos e canal conferidos por listagem oficial, oEmbed e metadata pública do YouTube em 06/10. As duas lagoas integram a seleção de paisagens; não são chamadas de praias nos cards.

Preservar a Home com três vídeos do Porto. Os novos entram primeiro em Outras paisagens, na página já existente `/praias-em-video`; não há rota nova ou alteração na quantidade de 43 páginas. As contagens da introdução e Acervo usam `coastalVideos.length`; a data da seleção está em `coastalSelectionCheckedOn`. Fontes incorpora cada vídeo automaticamente a partir dos dados. As nove capas JPEG originais, 1280×720, somam 1.453.902 bytes, com carregamento lazy e sem player antes do clique. Não alterar ou ocultar créditos das capas.

As sinopses não reproduzem alegações sem confirmação sobre proteção legal, segurança, acesso, duração de caminhada ou época de observação de animais. A seleção continua estática, sem sincronização automática. Relatório: `PRAIAS-EM-VIDEO-2026-10-06.md`.

A capa de Lagoa do Mirim contém uma arte central de 570×720, mais larga que as demais de aproximadamente 405×720. `artworkWidth:570` ajusta sua altura no card para cerca de 71%, centralizando a arte sem cortar logo ou título. O JPEG original permanece intacto, e o player mantém 9:16. Não remover esse ajuste nem ampliar a capa para preencher o card.

## Praias em vídeo — 04/10/2026

Base publicada: `a3902769adb9f95c4e0c53393e138361c19dcf2d`. O upgrade audiovisual de 03/10 foi publicado e validado; a nota de login abaixo registra a preparação anterior, não o estado atual.

Canal adicional indicado pelo proprietário: `https://www.youtube.com/@Marisc%C3%A3odazimba-g6m`, nome público “Mariscão da zimba”. Não substituir os canais de músicas/homenagem nem do Caminho. Dez Shorts verificados por listagem pública, oEmbed e páginas oficiais em 04/10/2026. Dados centralizados em `content/coastal-videos.ts`; capas originais de 1280×720 em `public/images/official/praias-<ID>.jpg`, total 1.536.296 bytes, sem alteração dos arquivos.

A Home apresenta somente os três vídeos da Praia do Porto após o Caminho dos Butiazais, com id `praia-do-porto`. `/praias-em-video` reúne os dez em grupos Porto/Outras paisagens. Links em Acervo, Memória, Visite, Contato, rodapé e Fontes. Navegação móvel inicial agora é 2×2. Estilos continuam na camada existente `app/refinement.css`.

`components/coastal-videos.tsx` usa `useMediaPlayback`: escolher um vídeo fecha outro dessa seleção, da homenagem ou das músicas. Não generalizar a regra ao jogo ou documentário antigo. Capas locais; iframe youtube-nocookie somente após clique; referrer de origem preservado; fechar restaura foco; fallback de link sem JavaScript. Imagens verticais originais não devem ser esticadas ou recortadas para esconder créditos.

Não tratar textos e imagens do canal como prova histórica independente. Algumas descrições incluem resíduos editoriais e afirmações sem fonte: as sinopses do portal são curadoria breve, não transcrição. Uso de IA não é declarado nessas dez descrições; não afirmar ausência nem inventar técnica de produção. Autoria informada pelo proprietário. A seleção é estática: novas publicações no canal não aparecem automaticamente.

O exportador/testes agora exigem 43 páginas: preservadas as 42 anteriores e adicionada a galeria. Relatório desta atualização: `PRAIAS-EM-VIDEO-2026-10-04.md`.

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
- `scripts/finalize-pages.mjs` converte as páginas `rota.html` em `rota/index.html` para hospedagem estática, gera sitemap a partir das páginas exportadas, robots e manifest. Verifica 43 páginas e prepara dois redirects HTML legados. Não são redirects HTTP308, pois Pages não fornece esse servidor.
- `components/document-link.tsx` usa links HTML normais. O next/link desta versão espera respostas RSC de servidor que Pages não fornece. Não reintroduzir next/link sem validar navegação num servidor estático puro.
- Menus, filtros, contato WhatsApp e animações continuam componentes React hidratados.
- O workflow define NEXT_PUBLIC_SITE_URL a partir do Pages, testa e publica dist/client. Não publica arquivos fontes como site, nem usa os cabeçalhos do antigo Worker. `_headers` não configura o GitHub Pages.

## Cuidados

Os documentos/fontes continuam os da revisão local. Este preparo não faz nova auditoria histórica ou de todos os links externos. Não inventar horários, cargos, perfis, direitos autorais, números ou reconhecimentos legais. Preservar créditos essenciais e atribuir a Lei Estadual19.013 ao bem cultural geral, sem confundir com moção municipal.

O número43 no validador corresponde a15 páginas principais,14 projetos e14 pontos. Ao acrescentar uma página real, atualizar o teste conscientemente e revisar sitemap, preservando as rotas anteriores.

Não há CMS nem edição pública. Alterações são feitas no código/dados e entram no ar após o workflow. O site pode ficar disponível com o notebook desligado depois da publicação, dependendo da disponibilidade e limites do GitHub.

## Segurança

Não há backend de formulário, segredos de produção ou banco de dados. O workflow usa o token automático do GitHub com permissões limitadas; não adicionar tokens pessoais. As dependências estão fixadas em package-lock.json. Atualizar com testes. Proteções HTTP da antiga hospedagem não são garantidas pelo Pages; não anunciar auditoria de invasão ou segurança absoluta.
