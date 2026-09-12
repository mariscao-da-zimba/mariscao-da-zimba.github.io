# Centro Cultural e Turístico Mariscão da Zimba

Portal cultural de Imbituba, preparado como site estático para GitHub Pages. Código e conteúdo preservados a partir da versão local revisada; a navegação desta edição não depende de servidor Node em produção.

## Estrutura

```
.github/workflows/pages.yml  publicação automática
app/                        páginas e estilos
components/                 navegação, filtros, contato e animações
content/                    textos, projetos, 14 pontos e fontes
public/                     fotografias, logotipo e guia PDF
scripts/                    exportação estática e prévia local
tests/                      validação de páginas e arquivos
```

## GitHub Pages

Use um repositório público `NOME-DA-ORGANIZACAO.github.io`, com estes arquivos na raiz e branch `main`. Em Settings → Pages escolha GitHub Actions. Execute o fluxo “Publicar Mariscão no GitHub Pages”. Ele obtém automaticamente a URL oficial da publicação e publica somente `dist/client`.

Não utilize uma subpasta de repositório nesta edição. Um domínio próprio na raiz pode ser configurado futuramente pelo GitHub, mas não está contratado nem configurado aqui.

## Desenvolvimento

Node.js 24 e npm:

```
npm ci
npm run dev
```

Validação e prévia sem servidor de aplicação:

```
npm run lint
npm run typecheck
npm run build
npm test
npm start
```

Abra http://127.0.0.1:4173. Em outro terminal: `npm run test:release -- http://127.0.0.1:4173`.

O build sem NEXT_PUBLIC_SITE_URL serve apenas como prévia local. O workflow define a URL correta para publicação. Nunca envie `.env` pessoal, `node_modules` ou `dist/server`.

## Manutenção

Leia MANUTENCAO.md antes de alterar o exportador. Edite textos nos arquivos de `content/`; imagens e documentos em `public/`; estilos em `app/`. O WhatsApp é uma ação explícita do visitante. Conteúdo histórico precisa de fonte verificável e imagens precisam de autorização/crédito.

Hospedagem: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
