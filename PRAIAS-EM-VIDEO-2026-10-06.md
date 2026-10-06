# Praias em vídeo — ampliação de 6 de outubro de 2026

Base: `1235d290745b3989a4121c0bff8b5396ec4644a9`, última edição publicada. Fonte: [canal Mariscão da zimba](https://www.youtube.com/@Marisc%C3%A3odazimba-g6m/shorts), indicado pelo proprietário.

## Nove novos vídeos

- [Lagoa de Ibiraquera.](https://www.youtube.com/shorts/w2a_IRQ-jJQ)
- [Lagoa do Mirim.](https://www.youtube.com/shorts/zdlHF75THTs)
- [Praia Vermelha.](https://www.youtube.com/shorts/DRqBBZi7-do)
- [Praia do Rosa.](https://www.youtube.com/shorts/UMDHWyRfRaE)
- [Praia do Luz.](https://www.youtube.com/shorts/w0h_21dqASc)
- [Ilha do Batuta e Praia da Barra de Ibiraquera.](https://www.youtube.com/shorts/-0SKfGn6Qro)
- [Barra de Ibiraquera.](https://www.youtube.com/shorts/tUHrzzzO6GA)
- [Praia da Ribanceira.](https://www.youtube.com/shorts/XOwJqbA0ne8)
- [Praia dos Amores.](https://www.youtube.com/shorts/PrRtk5_qqCc)

Listagem oficial e oEmbed confirmam os títulos e o canal; metadata pública identifica publicação em 06/10/2026 e reprodução disponível. Capas originais `https://i.ytimg.com/vi/<ID>/maxresdefault.jpg`, todas JPEG 1280×720, nove arquivos somando 1.453.902 bytes. Sinopses resumem os temas das descrições, sem copiar resíduos editoriais nem afirmações históricas, legais ou de visitação não verificadas. O proprietário informa a criação dos materiais; não foram inferidos autores adicionais nem técnicas de produção.

## Implementação

A galeria existente reúne 19 vídeos: três da Praia do Porto e 16 de outras paisagens. Os nove novos aparecem primeiro em Outras paisagens. Home, homenagem, músicas e Butiázinho preservados. Contagens no Acervo e introdução passam a ser derivadas dos dados. Fontes incorpora os nove registros automaticamente. Metadata da página e data de conferência atualizadas. Sem nova página, biblioteca, camada CSS, player inicial ou backend.

Na revisão visual foi corrigida a escala da capa da Lagoa do Mirim, cuja arte central é mais larga que 9:16: o card agora mostra todo o título e logotipo, com centralização e margens, sem editar o JPEG original. Os outros cards e a proporção dos players são preservados.

## Validação de lançamento

Executar lint, TypeScript, build e testes antes da publicação. Conferir os nove controles, fechamento por teclado, troca de player e layout em 320/390/768/1280 px. O teste estático exige todos os 19 IDs, sem duplicação, as capas locais, nomes acessíveis e Home somente com três. A quantidade de páginas permanece 43. Após deploy, auditar o domínio público e registrar o run/commit em um relatório de publicação separado.

## Limites preservados

Os vídeos e capas são apresentações do criador, não prova histórica independente nem garantia de condições atuais de visitação. Novos vídeos não são sincronizados automaticamente. A reprodução incorporada depende do YouTube; links diretos são mantidos. Esta atualização não altera as dependências nem realiza uma auditoria geral de segurança.

Conferência somente de leitura em 06/10/2026: `npm audit` reporta dez pacotes com severidade alta na cadeia de desenvolvimento/build/lint; `npm audit --omit=dev` não reporta vulnerabilidades nas dependências de produção. Entre os avisos estão negação de serviço em parsers de padrões/source maps e interpretação de URI. O site publicado é estático, mas os avisos continuam relevantes à manutenção e CI. Não foram aplicadas correções automáticas, regressões de versão ou alterações em `package-lock.json` neste incremento de conteúdo.
