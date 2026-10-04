# Praias em vídeo — 4 de outubro de 2026

Base: commit público `a3902769adb9f95c4e0c53393e138361c19dcf2d`. Atualização do portal Mariscão da Zimba com conteúdo do canal indicado pelo proprietário: https://www.youtube.com/@Marisc%C3%A3odazimba-g6m.

## Conteúdo e fontes

Dez Shorts confirmados na listagem pública e na API oEmbed oficial do YouTube, todos do autor “Mariscão da zimba”. Páginas oficiais confirmaram disponibilidade e duração de seis segundos. Títulos preservados, sem trocar o nome do canal antigo por este. Capas maxresdefault originais, 1280×720, total 1.536.296 bytes, hospedadas localmente. Nenhum vídeo foi baixado ou hospedado pelo portal.

| Grupo | ID | Título publicado |
| --- | --- | --- |
| Porto | TBnZ45s-HkY | Pescadores Artesanais da Praia do Porto. |
| Porto | 7OZfE3Vd0ug | O Canto Norte da Praia do Porto. |
| Porto | AYEPmTczkL4 | Mirante da Praia do Porto. |
| Outras paisagens | Kd3Xj51kLxU | Praia D’Água. |
| Outras paisagens | kPAsFT4n0mc | Praia de Itapirubá. |
| Outras paisagens | u0b6fvlLgtM | Ilhas Santana de Dentro e Santana de Fora. |
| Outras paisagens | jF7cdQ1up5o | Magia das ondas da Praia da Vila. |
| Outras paisagens | 8FXeRXc2isc | Praia da Vila |
| Outras paisagens | 4k8RN1PzH_s | Praias de Imbituba SC Brasil. |
| Outras paisagens | 6OJEfC62yEk | Centro Cultural e Turístico Mariscão da Zimba Ponto de Cultura Viva Imbituba e suas Belezas Naturais |

Links diretos no formato `https://www.youtube.com/shorts/<ID>`. Descrições públicas consultadas e sinopses editoriais curtas, sem copiar resíduos de texto automatizado ou afirmações históricas não verificadas. Créditos de texto explícitos a Célio de Oliveira constam em Canto Norte, Mirante, Itapirubá e Magia das Ondas; a autoria geral foi informada pelo proprietário. Não são apresentadas como filmagens documentais ou como fontes históricas independentes. Não há declaração explícita de IA nas dez descrições, e o portal não inventa esse dado.

## Design e implementação

Home: seção própria após o Caminho dos Butiazais, antes de Projetos, com três cards alinhados sobre fundo verde suave. Atalho `/#praia-do-porto`. Galeria dedicada `/praias-em-video`, dividida em Porto e Outras paisagens, com navegação por âncoras, contexto e conexão com o mirante documentado no guia. Conexões em Acervo, Memória, Visite, canais de Contato, rodapé e Fontes.

Tipografia editorial e paleta costeira existentes preservadas; capas verticais sem corte de títulos/créditos. Cards compactos no celular e vídeo escolhido expandido em 9:16. Microinterações respeitam redução de movimento, foco visível contrastante, controles de pelo menos 44 px. Grade inicial móvel 2×2 para os quatro atalhos.

Dados em `content/coastal-videos.ts`. `components/coastal-videos.tsx` compartilha coordenação e foco com os players da homenagem e das músicas. Nenhum dos dez iframes é criado na abertura; capas locais carregam de forma lazy. Links diretos continuam funcionando sem JavaScript. Privacidade atualizada. Acrescentada uma página real sem remover as 42 anteriores: 43 no exportador, sitemap e testes.

## Validação

Lint e TypeScript aprovados; build de produção com canonical público aprovado; 11/11 testes do HTML real aprovados. Auditoria HTTP da prévia: 43 páginas, 42 destinos internos e 89 recursos, com 404 correta. A revisão independente identificou e corrigiu a grade móvel de atalhos e o contraste do foco.

Navegador: dez controles carregaram seu player individual, com apenas um player da seleção ativo; fechamento por teclado removeu o iframe e restaurou foco. Troca música → praia também encerrou o player anterior. Player vertical móvel de 320 × 569 px, sem overflow; menu e Escape conferidos; atalhos móveis 2×2. As sete páginas alteradas foram dimensionadas em 320, 390, 768 e 1280 px (28 combinações), sem rolagem lateral ou títulos ultrapassando a página. Reprodução e imagem do Short dos pescadores foram confirmadas no player externo; não se afirma ter ouvido ou analisado cada segundo dos dez vídeos.

Publicar somente o pacote explícito e revisado desta atualização. Publicação só pode ser afirmada após sucesso do CI/deploy e verificação pública. O notebook não é requisito de disponibilidade desta edição hospedada no GitHub Pages.

## Limites de manutenção

Reprodução, legendas e qualidade de streaming dependem do YouTube e da conexão do visitante. A seleção não se sincroniza automaticamente com o canal. Os nove avisos altos já existentes na árvore npm de desenvolvimento e os avisos de runtime interno das GitHub Actions permanecem assunto de manutenção específica; não aplicar atualizações forçadas ou prometer segurança absoluta.
