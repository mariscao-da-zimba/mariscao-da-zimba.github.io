# Revisão visual e funcional — 13 de setembro de 2026

Base: `fd993c2efac0e204f8af7b26e7dfddd1f310a376`, já com Butiázinho.

## Alterações

- Paleta costeira consistente: azul-petróleo, verde suave, areia e amarelo-butía. Mantidos logotipo, fotos, créditos, fontes e informações institucionais.
- Hierarquia de títulos, espaçamento das páginas internas, cards de projetos/pontos, filtros e rodapé refinados. Textos pequenos e notas ganharam contraste e tamanho.
- Corrigido contraste de hover dos botões amarelos. Cabeçalho mantém altura ao rolar, evitando deslocamento de layout.
- Menu móvel deixa o foco sair com Tab, fecha ao atravessar o breakpoint de desktop e preserva Escape. Não é um diálogo modal.
- Removidos rastreamento global do ponteiro, transformações 3D/magnetismo nos textos e elemento de cursor sem uso. Mantidas animações curtas de entrada e hover. Conteúdo permanece visível sem JavaScript; redução de movimento é respeitada.
- Butiázinho com painel mais compacto, ícones de teclado/celular, instruções claras e ajuste do destino da âncora. Iframe continua isolado, carregado só após clique, removido ao fechar e com foco devolvido ao botão.
- `fflate` 0.7.4 → 0.7.5 e `js-yaml` 4.3.1 → 4.3.2 no lockfile: correções pontuais de dependências de desenvolvimento, sem upgrade de framework.
- Testes estáticos ampliados de 3 para 7: rotas, âncoras, IDs, links em nova aba, SEO/canônicos, viewport com zoom permitido, dimensões/alt, embeds lazy, srcset, CSS e fontes.

## Validação

- Lint, TypeScript, build estático e 7 testes automatizados aprovados.
- 42 páginas preservadas, além de 404 e redirecionamentos antigos.
- Auditoria HTTP local: páginas, links e arquivos publicados sem falha.
- Inspeção de dimensões no navegador: 42 rotas a 320 px e 1440 px; 14 páginas principais a 768 px. Os títulos apertados encontrados na Home e em Educação Ambiental foram corrigidos e conferidos novamente.
- Inspeção visual representativa de Home, jogo, Sobre, Projetos, Visite e página de ponto; demais páginas verificadas por estrutura e dimensões. Não equivale a teste em todo modelo físico de celular.
- Testes interativos: filtro de projetos, Tab/Escape/resize do menu, campos obrigatórios de contato, abrir/fechar jogo e restauração de foco. Nenhuma mensagem de teste foi enviada ao Centro.
- `npm audit`: nenhum alerta após as duas atualizações pontuais. Isso não substitui monitoramento futuro nem representa garantia absoluta de segurança.

## Manutenção

O arquivo `app/refinement.css` é a camada de direção visual atual; `app/butiazinho.css` cuida exclusivamente do jogo. Evite acrescentar novos arquivos de sobrescrita. Execute lint, typecheck, build e testes antes de publicar. O workflow normal `pages.yml` continua atendendo às próximas atualizações.

Esta revisão não altera os fatos históricos nem afirma ter revalidado todas as páginas externas. Fotografias originais em maior resolução continuam sendo a melhor forma de melhorar material de arquivo; não foram criadas imagens artificiais para representar o território. O jogo, Instagram, WhatsApp, Maps e YouTube dependem dos serviços externos respectivos.
