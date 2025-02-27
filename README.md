# Projeto Front-end com Next.js

## 📌 Descrição

Este projeto é um front-end desenvolvido em **Next.js** e **TypeScript**, utilizando **PrimeReact** para a interface de usuário e **Chart.js** para visualização de dados. Também conta com **Axios** para requisições HTTP.

## 🚀 Tecnologias Utilizadas

- **Next.js** - Framework React para aplicações web
- **React & React-DOM** - Biblioteca base
- **TypeScript** - Tipagem estática para melhor desenvolvimento
- **Axios** - Cliente HTTP para consumo de APIs
- **PrimeReact, PrimeIcons, PrimeFlex** - Componentes UI
- **Chart.js** - Biblioteca para criação de gráficos
- **SASS** - Estilização CSS aprimorada

## 📂 Estrutura do Projeto

```
projeto-front/
│── app/                      # Páginas e componentes
│   ├── (full-page)/          # Páginas de tela cheia
│   │   ├── auth/             # Autenticação (login, erro, novo usuário, etc.)
│   │   ├── landing/          # Página inicial
│   ├── layout.tsx            # Layout principal do projeto
│── public/                   # Arquivos estáticos
│── styles/                   # Arquivos de estilo SASS/CSS
│── package.json              # Dependências do projeto
│── tsconfig.json             # Configuração do TypeScript
│── .eslintrc.json            # Configuração do ESLint
│── .prettierrc.json          # Configuração do Prettier
│── next-env.d.ts             # Tipagem global para Next.js
```

## 🎯 Como Executar o Projeto

### 1️⃣ Instalar Dependências

```sh
npm install
```

### 2️⃣ Rodar o Ambiente de Desenvolvimento

```sh
npm run dev
```

A aplicação ficará disponível em [**http://localhost:3000**](http://localhost:3000).

### 3️⃣ Construir o Projeto para Produção

```sh
npm run build
```

### 4️⃣ Executar a Versão de Produção

```sh
npm run start
```

## 📜 Scripts Disponíveis

- `npm run dev` → Inicia o projeto em modo de desenvolvimento
- `npm run build` → Faz o build da aplicação para produção
- `npm run start` → Inicia o servidor em produção
- `npm run format` → Formata os arquivos com Prettier
- `npm run lint` → Verifica o código com ESLint

## ⚙️ Configuração do Ambiente

Este projeto segue padrões de qualidade de código utilizando **ESLint** e **Prettier**.

Caso precise verificar erros de linting ou formatar o código, use os comandos:

```sh
npm run lint  # Verifica erros de linting
npm run format  # Formata o código automaticamente
```

## 📄 Licença

Este projeto está licenciado sob os termos do arquivo **LICENSE.md**.

## ✨ Autor

Desenvolvido por Antonny Victor da Silva 🚀

