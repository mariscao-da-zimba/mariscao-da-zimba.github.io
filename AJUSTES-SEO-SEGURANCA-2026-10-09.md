# Ajustes finais de redação, SEO e controle de publicação

Base pública: `5eff6f3a5c7ad47f00d4bcdd2f5c0929e25f890f`. Solicitação do proprietário: corrigir os dois itens restantes da revisão; a conferência em aparelhos reais e informações institucionais foi informada por ele como concluída. Não se atribui essa conferência ao agente.

## Implementação

- `content/sources.ts`: título de Porto Belo reproduz a publicação, sem “à” acrescentado. [Referência](https://jornaldosbairros.tv/noticia/94077/comitiva-de-imbituba-visita-fundacao-de-cultura-de-porto-belo).
- Roteiro: título SEO “Guia do Caminho dos Butiazais”. Projeto: “Projeto Caminho dos Butiazais”. H1, canonical, URL e conteúdo visível preservados; Open Graph e Twitter recebem os títulos distintos.
- `npm run security:audit`: audita a cadeia completa e a árvore sem dev. Uma exceção visível, restrita ao grafo e às versões/caminhos revisados, não esconde os sete alertas de desenvolvimento. Qualquer alerta de produção, cadeia nova, aviso diferente, versão/escopo não revisado, patch direto, erro de consulta ou expiração bloqueia.
- Os seis fluxos atuais de publicação executam o gate entre npm ci e lint/build, sem ampliar permissões. Detalhes e prazo em `SECURITY.md`.

Não foi encontrada versão oficial corrigida de braces em 09/10/2026. O [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm) permanece aberto. **O gate não corrige a biblioteca e os sete alertas permanecem.** Sem downgrade, override, PR não incorporado ou audit fix --force. package-lock.json e versões de dependências não foram alterados.

A exceção expira em 08/11/2026 às 23:59:59 UTC e não deve ser renovada automaticamente. Ela bloqueia novas publicações que não passem na revisão; não desliga o site já no ar. Quando houver correção suportada, atualizar e testar antes de remover a pendência.

## Validação local

- Lint e TypeScript aprovados.
- Build estático aprovado: 43 páginas e dois redirects legados.
- 59 testes aprovados, zero falhas: suíte anterior preservada, dois testes editoriais/SEO e quinze testes da política/workflows.
- Auditoria HTTP da prévia aprovada: 43 páginas, 42 destinos internos, 106 recursos. A soma de recursos consultados não é o peso inicial da Home.
- Título corrigido em Fontes e novo título do roteiro conferidos no navegador da prévia. Verificação pública após a publicação registrada no relatório local de entrega.

Revisão independente identificou e levou à correção de um caso de caminho desconhecido/versão ausente e da ausência do gate nos fluxos manuais antigos. Ambos possuem testes de regressão.

Sem alteração de layout, CSS, animações, fotografias, logotipo, PDF, vídeos, jogo, contatos, projetos ou pontos. Não é pentest, certificação jurídica ou garantia de ausência de bugs.
