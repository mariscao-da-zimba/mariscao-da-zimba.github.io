# Segurança e dependências

## Pendência conhecida — revisão de 09/10/2026

O [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm) afeta `braces` até 3.0.3 e, nesta revisão, **não possui versão oficial corrigida**. O npm registra sete entradas altas na cadeia de desenvolvimento: braces, micromatch, fast-glob, @next/eslint-plugin-next, vite-plugin-dynamic-import, vite-plugin-commonjs e vinext. Não são sete explorações independentes comprovadas.

`npm audit --omit=dev` retornou zero alertas nesta consulta. O GitHub Pages recebe somente o export estático de `dist/client`, não um servidor Node, ferramentas de build ou o diretório node_modules. Isso reduz a exposição dessa cadeia no site público, mas não torna o ambiente de desenvolvimento imune.

Não receber padrões glob arbitrários de usuários, nem executar builds com código/configurações de terceiros sem revisão. Não executar `npm audit fix --force`, downgrades automáticos ou instalar o PR ainda não publicado como se fosse uma versão oficial corrigida.

## Checagem antes de publicar

Execute `npm run security:audit`. A checagem consulta a árvore completa com inclusão explícita de dev/optional/peer e a árvore sem dev; erros de consulta bloqueiam, em vez de aparecerem como resultado limpo. Os seis workflows atuais que publicam executam o gate antes de lint/build, incluindo os fluxos manuais antigos.

Ela permite uma **exceção temporária visível**, apenas para o GHSA acima, nos caminhos/versões exatos de desenvolvimento revisados no lockfile. Novos pacotes vulneráveis, novos avisos no mesmo pacote, severidade diferente/crítica, qualquer alerta de produção, escopo/versionamento diferente, indicação de patch direto ou relatório inconsistente bloqueiam a publicação. A exceção expira em **08/11/2026 às 23:59:59 UTC**. Depois disso, novas publicações exigem reavaliação; o site já publicado não é desligado.

Esta política não corrige o código de braces, não oculta os sete alertas e não é pentest ou garantia de segurança. A pendência permanece aberta até existir uma correção suportada ou migração compatível, validada com lint, TypeScript, build, testes e navegador.

`tests/dependency-audit-policy.test.mjs` cobre resultado limpo, cadeia conhecida, produção, novo pacote/aviso, alerta crítico, mudança de versão/escopo, patch direto, expiração e falhas de relatório/grafo.

## Quando houver patch oficial

Atualize na cópia de trabalho, sem `--force`; confira a cadeia e o lockfile, rode a checagem e toda a suíte, confira a exportação estática e o navegador. Remova/revise conscientemente a exceção quando não for mais necessária. Não renovar seu prazo automaticamente.

Nunca publicar .env pessoal, tokens, credenciais ou dist/server. Os cabeçalhos de `_headers` não são aplicados automaticamente pelo GitHub Pages; não declarar CSP/pentest apenas pela existência desse arquivo.
