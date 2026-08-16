# Sistema de Votação — Client

[![Angular](https://img.shields.io/badge/Angular-22-DD0031?logo=angular&logoColor=white)](https://angular.dev/)
[![CI](https://github.com/gustavommcv/sistema-de-votacao-client/actions/workflows/ci.yml/badge.svg)](https://github.com/gustavommcv/sistema-de-votacao-client/actions/workflows/ci.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tests](https://img.shields.io/badge/tests-Vitest-6E9F18?logo=vitest&logoColor=white)](https://vitest.dev/)

SPA responsiva para criação de enquetes e votação com resultados em tempo real. Esta versão moderniza o projeto original sem alterar sua identidade visual.

**API:** [sistema-de-votacao-api](https://github.com/gustavommcv/sistema-de-votacao-api) · **Arquitetura:** [decisões e fluxos](docs/ARCHITECTURE.md)

![Listagem de enquetes](https://github.com/user-attachments/assets/55e33cb7-c7ad-4b30-b2c2-c6e6a2302270)

## Destaques

- Angular 22 com componentes standalone e templates de control flow;
- carregamento lazy de todas as páginas;
- formulários reativos com validação de email, senha, datas e opções;
- sessão restaurada antes da primeira navegação e rotas de criação/edição protegidas;
- cookie de autenticação enviado por interceptor apenas à API configurada;
- modelos TypeScript compartilhados, sem `any` nos contratos HTTP/WebSocket;
- placar atualizado por salas do Socket.IO;
- design responsivo preservado, com tokens globais e foco visível;
- testes em Vitest/jsdom e build otimizado de produção.

## Funcionalidades

- cadastro, login e logout;
- listagem e classificação visual de enquetes por período;
- criação com no mínimo três opções;
- votação única enquanto a enquete estiver ativa;
- atualização instantânea do placar para todos os visitantes da enquete;
- edição do título e exclusão disponíveis somente ao autor.

## Executando localmente

Pré-requisitos: Node.js 22.22.3+ e a [API](https://github.com/gustavommcv/sistema-de-votacao-api) em `http://localhost:3000`.

```bash
git clone https://github.com/gustavommcv/sistema-de-votacao-client.git
cd sistema-de-votacao-client
npm ci
npm start
```

Abra `http://localhost:4200`.

Os endereços da API e do Socket.IO ficam em `src/environments/environment.ts`. Em um deploy real, configure substituição de environment para os endereços públicos.

## Comandos

| Comando | Uso |
| --- | --- |
| `npm start` | servidor local |
| `npm run build` | build otimizado em `dist/` |
| `npm test` | testes uma vez |
| `npm run test:watch` | testes durante o desenvolvimento |
| `npm run typecheck` | valida tipos e templates |
| `npm run check` | tipos, testes e build |

## Rotas

| Rota | Acesso | Finalidade |
| --- | --- | --- |
| `/` | Público | Lista de enquetes |
| `/login` | Público | Login |
| `/signup` | Público | Cadastro |
| `/polls/:id` | Público | Detalhes e placar |
| `/polls/create` | Autenticado | Nova enquete |
| `/polls/:id/edit` | Autenticado | Edição do título |

## Estrutura

```text
src/app/
├── core/
│   ├── auth/        # estado da sessão e guard
│   ├── http/        # interceptor e normalização de erros
│   ├── layout/      # header da aplicação
│   ├── models/      # contratos tipados e regras puras
│   ├── polls/       # HTTP e Socket.IO
│   └── shared/      # componentes reutilizáveis
├── features/
│   ├── auth/        # login e cadastro
│   ├── home/        # listagem e cards
│   └── polls/       # criação, detalhe e edição
├── app.config.ts
└── app.routes.ts
```

## Qualidade

```bash
npm run check
```

Esse comando falha se houver erro de TypeScript/template, teste quebrado ou falha no build. O lockfile é versionado para instalações reproduzíveis e o `npm audit` atual não aponta vulnerabilidades conhecidas.

## Licença

MIT.
