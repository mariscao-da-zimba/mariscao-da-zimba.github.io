# Correções da revisão final — 09/10/2026

Base: `630471db492f9537acbc528cac14d668111d296d`.

## Alterações

1. Título da seção Ameaças de Educação Ambiental passa a usar cor clara sobre o fundo oceano. A mesma regra explícita cobre títulos de seções dark.
2. Chico Pomboca, em Memória, é descrito como obra incluída na programação anunciada da 3ª Feira do Livro. A fonte não foi usada como comprovação de realização.
3. Política de Privacidade explica quando o jogo externo é carregado, seu provedor e o armazenamento local do recorde no domínio do jogo. O portal não recebe ou guarda esse recorde.
4. Efeitos dos cards são aplicados pelo seletor CSS do próprio card, sem classe imperativa que React possa apagar. Filtros e abertura/fechamento dos vídeos não removem mais o halo/elevação. O estado de pausa da faixa cultural também não reescreve suas classes de movimento/visibilidade.

Não foram modificados imagens, PDF, vídeos, links, projetos, pontos, exportador ou dependências. As 43 rotas e os créditos permanecem. Os players ativos continuam imóveis; movimento reduzido e cleanup continuam respeitados.

## Regressões verificáveis

- `tests/dark-heading-contrast.test.mjs`: CSS exportado entrega cor clara para os títulos escuros; contraste dos tokens supera 4,5:1. Detecta a combinação antiga de aproximadamente 1,06:1.
- `tests/privacy-memory.test.mjs`: texto visível de Memória preserva o anúncio e vínculo à ficha do projeto; Privacidade descreve o jogo externo e o recorde local.
- `tests/motion-effects.test.mjs`: hook real em ambiente determinístico, incluindo cards atualizados/recriados e estado de pausa da faixa. Conserva os testes de motion, preferências, aba oculta e cleanup anteriores.

Validar em ordem: `npm run lint`, `npm run typecheck`, `npm run build`, `npm test`, `npm run test:release -- <URL>`. Não executar testes de HTML enquanto o build estiver recriando dist.

No navegador, conferir contraste em 320/390/1280 px, filtros Todos→Literatura→Todos, abrir/fechar música e praia, player imóvel, pausa/retomada da faixa (tirar foco da faixa para retomar), menu móvel, validação de contato sem envio e jogo com foco dentro da iframe. Após publicação, recarregar a página para não julgar JS/CSS antigo em cache.

## Limites preservados

Esta atualização não é laudo jurídico, pentest, certificação WCAG integral ou garantia de funcionamento de serviços externos em todos os navegadores. Não transforma programação anunciada em comprovação histórica. O PDF/OCR não foi reprocessado. Permanecem os alertas da cadeia de ferramentas de desenvolvimento e as fontes externas que bloqueiam automação, descritos na manutenção e auditoria anterior.

O pacote de correção contém somente os arquivos explicitamente permitidos no workflow, protegido por hash SHA-256 e conferência de caminhos. O importador recusa sobrescrever alterações intervenientes nesses mesmos arquivos. O build, testes e deploy executam no próprio fluxo antes da verificação HTTP e visual pública.
