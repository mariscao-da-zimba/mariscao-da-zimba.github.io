# Correções da auditoria completa — 08/10/2026

Base pública: `5e10bed31de1cfefd279688c55f152e626942ffa`. Escopo: corrigir problemas confirmados na revisão completa, preservando conteúdo documentado, navegação, 43 páginas e integrações. Nenhuma credencial pessoal foi adicionada ao código.

## Conteúdo e fontes

- Educação Ambiental: Butia catarinensis classificado Em Perigo (EN) na lista estadual CONSEMA 51/2014. A página explica a divergência com a classificação usada no guia e atribui ao guia medidas de altura/longevidade, sem apresentá-las como nova medição científica.
- Procult: marco de janeiro de 2024, com resultado publicado em 25/01/2024; o número do edital continua 01/2023.
- Certificação: preservada a condição institucional verificada, removida a associação sem prova a 2025.
- Agenda: separa programação anunciada de registro publicado; anúncios de 31/03 e 30/05/2025 não são prova da realização dos encontros.
- As Faces de Anita: identificado como anunciado em 2024; execução e estágio atual permanecem não confirmados.
- Jorge Coelho: reportagem de 05/09/2022 anunciava lançamento em 10/09; programação de dezembro tratada separadamente. Chico Pomboca: narração prevista, não realização afirmada sem prova.
- Lei Estadual 19.013/2024: preservado o reconhecimento da Cachaça com Butiá como bem cultural geral, sem atribuir exclusividade à marca nem confundir com moção municipal.

Fontes primárias consultadas: [CONSEMA 51/2014](https://www.semae.sc.gov.br/download/resolucao-consema-no-51/), [resultado Procult](https://s3cache.dom.sc.gov.br/atos/2024/01/1706218503_procult_2023_final_recursos_e_classificados_e_nao_classificados_extrato.pdf), [Lei 19.013/2024](https://leis.alesc.sc.gov.br/ato-normativo/22514). O guia oficial continua como fonte primária do roteiro, com ressalvas explicitadas quando há divergência.

## Links

Recuperadas as reportagens equivalentes: [mosaico de Anita](https://horahiper.com.br/geral/mosaico-de-anita-garibaldi-e-inaugurado-em-imbituba-101940) e [livro Jorge Coelho](https://horahiper.com.br/geral/livro-jorge-coelho-coracao-acoriano-sera-lancado-nesta-semana-em-imbituba-106264). Validadas com resposta 200 e conteúdo equivalente. Não foram inventados URLs alternativos.

A referência da Rádio Lagoa Doce permanece bibliográfica, com data de publicação e aviso de indisponibilidade em 08/10/2026. Os botões levam à referência local em Fontes, não ao endereço 404. Bloqueios de leitura automática de outros serviços não foram confundidos com links mortos. Google Maps continua rota ao endereço, não afirmação de ficha comercial verificada.

## Interface, desempenho e formulário

Contraste corrigido nos textos de seções escuras, atalhos, links de música, créditos e categorias. Contrastes medidos: texto claro sobre fundo escuro 8,97:1; links teal 4,88:1 no papel e 5,23:1 no card de música. Créditos passam a 12px, sem apagar atribuições. Imagens hero passam a escolher versões locais 720/1200/1672px conforme a largura, sem aumento artificial de resolução.

Formulário valida nome e mensagem após normalização: espaços, tabulações e espaços Unicode não geram mensagem vazia para WhatsApp. Erros relacionados ao campo e foco no primeiro inválido. Dados opcionais mantidos e parágrafos preservados. Não há backend; o envio efetivo continua sendo uma ação do visitante no WhatsApp. Testes não enviam mensagens.

Menu, animações com redução de movimento, vídeos sob demanda e Butiázinho preservados. Os 19 vídeos costeiros continuam uma seleção estática do canal, sem promessa de sincronização automática.

## Guia PDF

56 páginas completas, 7.959.750 bytes, 40.568 caracteres extraíveis, 17 marcadores, idioma pt-BR e estrutura básica de texto. Camada OCR invisível reconhecida localmente em português; fonte original de 92 MB não alterada. As 56 páginas antes/depois foram renderizadas a 900px e comparadas: zero pixels diferentes. Amostras de ficha técnica, botânica e visitação inspecionadas visualmente. Créditos essenciais preservados.

O OCR pode errar palavras, ordem ou textos sobre fotografias. Não há certificação PDF/UA nem promessa de transcrição perfeita. As 14 páginas do roteiro em HTML são a alternativa de navegação estruturada. Ferramentas e hash documentados em MANUTENCAO.md e content/guide-document.json. O download conserva o mesmo endereço público.

## Dependências e limites

Quatro patches transitivos compatíveis aplicados. Alertas npm audit caíram de dez para sete altos, todos na cadeia de desenvolvimento de braces, sem versão corrigida disponível na verificação. npm audit --omit=dev: zero alertas. Não realizado downgrade forçado da stack. A hospedagem publica arquivos estáticos; isso não equivale a auditoria de invasão ou segurança absoluta.

## Verificação e publicação

Validação local concluída: lint, TypeScript, build e 23 testes aprovados. Exportação: 43 páginas, dois redirects legados, 404, sitemap e robots. Auditoria HTTP: 43 páginas e 100 recursos locais aprovados. Dimensionamento revisado nas 43 páginas a 320, 390, 768 e 1280px: sem rolagem horizontal, sem títulos fora da largura e com um h1 principal. Formulário com campos de espaços/Unicode: bloqueio, mensagem de erro e foco no nome, sem transmissão ao WhatsApp. Links inline sublinhados e destino da referência de rádio com margem para o header fixo. Contraste de Turismo Responsável conferido no navegador.

A atualização exige lint, TypeScript, build estático, testes de regressão e revisão de navegação/contraste/formulário responsivos antes de publicar. A importação no GitHub usa arquivo com SHA-256 e lista exata, protege alterações posteriores à base e reutiliza o workflow existente com permissões limitadas. O deploy só recebe o artefato aprovado no build. Verificar no site público após conclusão do GitHub Actions.
