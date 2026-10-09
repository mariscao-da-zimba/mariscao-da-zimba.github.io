# Ajuste da página inicial — 09/10/2026

Base pública: `0d2dc934387702223b038e2313a76a8272750809`.

## Pedido aplicado

Home, seção musical da Turma da Maré, nesta ordem:

1. Rosa de ouro. — `gq3BJ_1M11k`
2. Vem brincar com a Turma do Mar. — `BcA7YE2Vt9s`
3. Vem com a turma da maré. — `EczZf3JCFgY`

Os títulos, URLs e capas oficiais já cadastrados foram preservados. Cultura continua com os oito vídeos da seleção completa, incluindo Memórias Afetivas. Nenhum vídeo foi apagado. O botão “Ver todos os 8 vídeos” da Home continua apontando para `/cultura#musicas-da-mare`.

A faixa rolante de nomes com controle de pausa deixou de ser renderizada na Home. As demais animações, navegação, homenagem, praias, jogo, PDF e conteúdo permanecem.

Em telas a partir de 1100 px, os três destaques ficam alinhados em uma linha, com tipografia e capas dimensionadas para o espaço. O layout intermediário de duas colunas e o de celular em coluna única permanecem.

## Manutenção e verificação

`featuredMusicVideos`, em `content/music-videos.ts`, resolve IDs explícitos na coleção completa e falha se algum destaque não existir; não alterar a ordem global para mudar somente a Home. `MusicVideos` mantém o carregamento do player apenas após clique e o fallback de abrir no YouTube.

O teste de exportação confere os três destaques na ordem escolhida, os cinco demais restritos à coleção completa, os oito vídeos preservados em Cultura e a ausência da faixa/controle na Home.

Validar: lint, TypeScript, build, testes e auditoria de publicação. No navegador: três cards na Home, oito em Cultura, link de acesso à coleção, abrir/fechar player e ausência da faixa, incluindo largura de celular.

Publicação protegida por SHA-256, lista exata de sete arquivos e guarda contra alteração interveniente nos mesmos arquivos. Não foram adicionadas dependências ou imagens.
