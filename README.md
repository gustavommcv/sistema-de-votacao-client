# Sistema de Votação - Frontend (Angular)

Frontend do sistema de votação desenvolvido em Angular com integração em tempo real.

## Tecnologias Utilizadas
- Angular
- TypeScript
- RxJS
- WebSockets (para atualizações em tempo real)
- Flexbox CSS
- Grid CSS
- Sass

## Funcionalidades Implementadas
- **Autenticação de usuários**: Login e cadastro com validação de formulários
- **Listagem de enquetes**: Visualização de todas as enquetes classificadas por status
- **Criação de enquetes**: Formulário dinâmico com validação de mínimo 3 opções
- **Detalhes da enquete**: Visualização com resultados em tempo real
- **Sistema de votação**: Votação apenas durante período ativo da enquete
- **Edição de enquetes**: Atualização do título das enquetes
- **Design responsivo**: Layout adaptável a diferentes tamanhos de tela

## Fluxo de Navegação e Componentes Principais

### Rotas da Aplicação
| Rota                | Componente               | Descrição                                                                 |
|---------------------|--------------------------|---------------------------------------------------------------------------|
| `/login`            | `LoginPageComponent`     | Autenticação de usuários existentes                                       |
| `/signup`           | `SignupPageComponent`    | Criação de novas contas de usuário                                        |
| `/`                 | `HomePageComponent`      | Página inicial com listagem de todas as enquetes                          |
| `/polls/create`     | `PollCreatePageComponent`| Criação de novas enquetes                                                 |
| `/polls/:id`        | `PollDetailPageComponent`| Detalhes da enquete com opções de voto e resultados em tempo real         |
| `/polls/:id/edit`   | `PollEditPageComponent`  | Edição do título de enquetes existentes                                   |

## Funcionamento do Sistema

### 1. Listagem de Enquetes (HomePageComponent)
- Exibe enquetes em três categorias: Não Iniciadas, Em Andamento e Finalizadas
- Cada enquete é apresentada em um `PollCardComponent` com:
  - Título da enquete
  - Período de votação (data início e término)
  - Status visual (baseado na data atual)
  - O email de quem criou a enquete
![image](https://github.com/user-attachments/assets/55e33cb7-c7ad-4b30-b2c2-c6e6a2302270)

### 2. Página de Detalhes da Enquete (PollDetailPageComponent)
- Exibe enquete com todas as suas opções
- Para cada opção:
  - Mostra texto da opção
  - Contador absoluto de votos
- Bloqueia interação se enquete não estiver ativa, ou se usuário não autenticado:
  - Botão de votar desabilitado
  - Opções inativas
- Atualização em tempo real via WebSocket:
  - Novos votos refletidos imediatamente
![image](https://github.com/user-attachments/assets/ce46997d-62ea-4420-8bdd-916ad2fbfc8e)

### 3. Criação de Enquetes (PollCreatePageComponent)
- Formulário com campos:
  - Título (obrigatório)
  - Data de início (obrigatório)
  - Data de término (obrigatório)
  - Opções dinâmicas (mínimo 3)
- Validações:
  - Data final posterior à data inicial
  - Mensagens de erro contextualizadas
![image](https://github.com/user-attachments/assets/a056a81e-06da-4d6d-8e74-03cb23020044)


### 4. Sistema de Autenticação
- Fluxo completo de login e logout
- Validação em tempo real de formulários
![image](https://github.com/user-attachments/assets/16726b2c-16c4-4673-9077-29a130c3042d)
![image](https://github.com/user-attachments/assets/3d2cd2ab-613a-410c-9e52-e9169bdbac61)

## Estrutura
```
tree -I node_modules
.
├── angular.json
├── package.json
├── package-lock.json
├── public
│   ├── favicon.ico
│   └── icon.png
├── README.md
├── src
│   ├── app
│   │   ├── app.component.html
│   │   ├── app.component.scss
│   │   ├── app.component.spec.ts
│   │   ├── app.component.ts
│   │   ├── app.config.ts
│   │   ├── app.routes.ts
│   │   ├── core
│   │   │   ├── auth
│   │   │   │   └── auth.service.ts
│   │   │   ├── layout
│   │   │   │   └── header
│   │   │   │       ├── header.component.html
│   │   │   │       ├── header.component.scss
│   │   │   │       ├── header.component.spec.ts
│   │   │   │       └── header.component.ts
│   │   │   ├── polls
│   │   │   │   ├── poll.service.ts
│   │   │   │   └── socket.service.ts
│   │   │   └── shared
│   │   │       └── button
│   │   │           ├── button.component.html
│   │   │           ├── button.component.scss
│   │   │           ├── button.component.spec.ts
│   │   │           └── button.component.ts
│   │   └── features
│   │       ├── auth
│   │       │   ├── login-page
│   │       │   │   ├── login-page.component.html
│   │       │   │   ├── login-page.component.scss
│   │       │   │   ├── login-page.component.spec.ts
│   │       │   │   └── login-page.component.ts
│   │       │   └── signup-page
│   │       │       ├── signup-page.component.html
│   │       │       ├── signup-page.component.scss
│   │       │       ├── signup-page.component.spec.ts
│   │       │       └── signup-page.component.ts
│   │       ├── home
│   │       │   ├── home-page
│   │       │   │   ├── home-page.component.html
│   │       │   │   ├── home-page.component.scss
│   │       │   │   ├── home-page.component.spec.ts
│   │       │   │   └── home-page.component.ts
│   │       │   └── polls
│   │       │       └── poll-card
│   │       │           ├── poll-card.component.html
│   │       │           ├── poll-card.component.scss
│   │       │           ├── poll-card.component.spec.ts
│   │       │           └── poll-card.component.ts
│   │       └── polls
│   │           ├── poll-create-page
│   │           │   ├── poll-create-page.component.html
│   │           │   ├── poll-create-page.component.scss
│   │           │   ├── poll-create-page.component.spec.ts
│   │           │   └── poll-create-page.component.ts
│   │           ├── poll-detail-page
│   │           │   ├── poll-detail-page.component.html
│   │           │   ├── poll-detail-page.component.scss
│   │           │   ├── poll-detail-page.component.spec.ts
│   │           │   └── poll-detail-page.component.ts
│   │           └── poll-edit-page
│   │               ├── poll-edit-page.component.html
│   │               ├── poll-edit-page.component.scss
│   │               ├── poll-edit-page.component.spec.ts
│   │               └── poll-edit-page.component.ts
│   ├── environments
│   │   └── environment.ts
│   ├── index.html
│   ├── main.ts
│   └── styles.scss
├── tsconfig.app.json
├── tsconfig.json
└── tsconfig.spec.json
```

## Como rodar o projeto

### Pré-requisitos
- Node.js
- Angular CLI
- Backend em execução (sistema de votação API)

### 1. Clonar o repositório
```bash
git clone https://github.com/gustavommcv/sistema-de-votacao-frontend.git
cd sistema-de-votacao-frontend
```

### 2. Instalar as dependências
```bash
npm i
```

### 3. Rodar a aplicação
```bash
npm start
```
