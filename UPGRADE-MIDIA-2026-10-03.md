# Upgrade editorial e audiovisual — 3 de outubro de 2026

Base: commit público `005feaaf61662f76044e30d502529546a7879c99` do repositório mariscao-da-zimba/mariscao-da-zimba.github.io. Este relatório registra a versão local testada; não é confirmação de publicação.

## Organização visual

Home: abertura e atalhos discretos → apresentação do Centro → homenagem → músicas → eixos culturais, roteiro e projetos → registros e jogo → trajetória e visita. Homenagem e músicas são seções separadas, sem sobrepor jogo, notícias ou conteúdo institucional. Preservados o logotipo, fotografias, guia, 42 páginas, navegação HTML compatível com Pages, SEO e identidade costeira.

A homenagem usa composição editorial em duas colunas no desktop e uma coluna no celular. A galeria musical apresenta três capas originais com títulos legíveis fora das imagens. No celular, cards horizontais compactos se expandem para mostrar apenas o vídeo escolhido em 9:16. Cores de oceano, areia e papel, foco visível, controles de pelo menos 44 px e efeitos discretos com redução de movimento respeitada. Estilos na camada existente `app/refinement.css`; nenhuma nova folha de sobrescritas.

As músicas também estão na página Cultura e acessíveis pelo Acervo e pelo projeto Turma da Maré. O canal Mariscao foi acrescentado ao rodapé, Contato e Fontes sem substituir o canal do Caminho dos Butiazais.

## Materiais confirmados

- Homenagem: https://www.youtube.com/watch?v=_wfX7fFoig0 — “— Ponto de Cultura Viva aos 68 anos de emancipação”, 3min59, canal Mariscao.
- https://www.youtube.com/shorts/EczZf3JCFgY — “Vem com a turma da maré.”, 2min54.
- https://www.youtube.com/shorts/gq3BJ_1M11k — “Rosa de ouro.”, 2min18.
- https://www.youtube.com/shorts/BcA7YE2Vt9s — “Vem brincar com a Turma do Mar.”, 2min30. Preservado o título publicado, sem trocá-lo por Maré.
- Canal: https://www.youtube.com/@mariscaodazimba.

Títulos e canal conferidos no oEmbed oficial e no navegador; duração e reprodução conferidas nos players. A descrição pública da homenagem identifica os 68 anos de emancipação de Imbituba (1958–2026), realização do Centro e produção audiovisual com apoio de IA. Trechos visuais e a transcrição automática foram consultados; erros desta transcrição não foram reproduzidos no site nem usados como comprovação histórica. O proprietário identifica os três Shorts como suas criações. Não foram inventados letristas adicionais, licenças comerciais ou datas de produção.

As quatro capas são originais maxresdefault do YouTube, 1280 × 720, total de 442.685 bytes, hospedadas em `public/images/official/`. Recorte visual central feito apenas por CSS; arquivos preservados. Não há download nem hospedagem dos vídeos pelo portal.

## Interação e desempenho

Nenhum dos quatro players é carregado na abertura. Ao clicar, um iframe youtube-nocookie é criado; selecionar outro vídeo remove o anterior, inclusive entre homenagem e músicas. Fechar remove o iframe e devolve foco ao botão correto. Links diretos funcionam sem JavaScript e continuam como alternativa se o YouTube bloquear reprodução incorporada. O referrer de origem é preservado para evitar o erro153 do YouTube. Não solicitar câmera, microfone, localização nem credenciais.

Dados em `content/tribute.ts` e `content/music-videos.ts`; componentes de apresentação em `components/tribute-video.tsx` e `components/music-videos.tsx`; coordenação/foco em `components/use-media-playback.ts`.

## Validação realizada

- Lint: aprovado, sem avisos.
- TypeScript: aprovado.
- Build de produção: aprovado, 42 páginas + 2 redirecionamentos legados + 404.
- Testes do export real: 9/9 aprovados, incluindo mídias sem player inicial, destinos/âncoras, metadados, zoom, dimensões de imagens e recursos locais.
- Auditoria HTTP da prévia: 42 páginas, 41 destinos internos e 77 recursos verificados; 404 correta.
- Navegador: quatro vídeos reproduzidos; troca entre músicas e entre homenagem/música; fechamento por mouse/teclado e foco restaurado; menu móvel e Escape.
- Dimensionamento das 42 páginas em 320 e 1280 px: sem rolagem horizontal ou títulos ultrapassando seus elementos. As 14 páginas principais também passaram em tablet de 768 px; composição musical conferida em 390 px. Cards musicais com altura e ações alinhadas no desktop; player vertical expandido apenas sob demanda.

O build final usa `NEXT_PUBLIC_SITE_URL=https://mariscao-da-zimba.github.io`. O workflow normal obtém a URL pelo GitHub Pages. Não publicar um export de prévia com canonical localhost.

## Publicação e limites

A sessão do GitHub estava desconectada durante este trabalho. Publicar somente depois de autenticação do proprietário, aprovação do CI e verificação da URL pública. O pacote de atualização contém apenas arquivos explícitos deste upgrade; não inclui credenciais, arquivos pessoais, node_modules nem servidor. O importador manual confere SHA-256 e recusa sobrescrever arquivos alterados desde a base. A publicação habitual permanece em `.github/workflows/pages.yml`.

Reprodução, legendas e qualidade máxima de streaming dependem do YouTube e da conexão do visitante; o site não promete controle sobre esses serviços. O teste não constitui revisão legal nem teste de invasão. A auditoria npm desta máquina sinalizou nove avisos de alta severidade na árvore de desenvolvimento; isso requer manutenção específica das dependências com testes, não uma correção forçada ou promessa de segurança absoluta. O deploy é estático, sem backend próprio ou segredos.
