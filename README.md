# iReserva

## 📋 Sobre o Projeto

iReserva é uma aplicação web moderna desenvolvida com React, Vite e TailwindCSS, focada em proporcionar uma experiência de usuário excepcional. O projeto utiliza as mais recentes tecnologias e práticas de desenvolvimento web, com uma arquitetura completa incluindo frontend, backend e banco de dados.

## 🏗️ Arquitetura do Projeto

O projeto é dividido em três partes principais:

1. **Frontend**: Aplicação React com Vite e TypeScript.
2. **Backend**: API REST com Node.js, Express e TypeScript.
3. **Banco de Dados**: PostgreSQL.

## 🚀 Tecnologias Utilizadas

### Frontend
- [React 18](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/) (Verificar se ainda em uso)
- [React Router DOM](https://reactrouter.com/)
- [React Hook Form](https://react-hook-form.com/) (Verificar se ainda em uso)
- [Zod](https://zod.dev/) (Verificar se ainda em uso)
- [Axios](https://axios-http.com/)

### Backend
- Node.js
- Express
- TypeScript
- PostgreSQL
- JWT para autenticação
- Bcrypt para criptografia
- CORS

## 🛠️ Pré-requisitos

- Node.js (versão LTS recomendada, ex: 18.x ou 20.x)
- npm (geralmente vem com o Node.js) ou bun
- Docker e Docker Compose
- Git

## 🔧 Instalação e Configuração

### 1. Clone o Repositório
```bash
git clone https://github.com/levimotaa/ireserva.git
cd iReserva
```

### 2. Configuração do Frontend
O frontend utiliza Vite e está configurado para se comunicar com o backend através de proxies definidos em `vite.config.ts` (para rotas `/api` e `/images`). Portanto, a criação manual de um arquivo `.env` para `VITE_API_URL` não é estritamente necessária para a configuração básica da API.

```bash
# Instale as dependências do frontend (na raiz do projeto iReserva/)
npm install
# ou, se estiver usando bun:
# bun install
```

### 3. Configuração do Backend (para desenvolvimento local)
Se você pretende modificar ou rodar o backend fora do Docker para desenvolvimento:
```bash
# Navegue até o diretório do backend
cd backend

# Instale as dependências do backend
npm install
# ou, se estiver usando bun:
# bun install

cd .. # Volte para a raiz do projeto
```
**Nota:** Para a execução padrão com Docker, a instalação de dependências do backend é tratada automaticamente pelo `Dockerfile`.

### 4. Configuração do Docker e Variáveis de Ambiente
O projeto utiliza Docker Compose para gerenciar os containers do backend e do banco de dados. O arquivo `docker-compose.yml` na raiz do projeto já está pré-configurado.

**Variáveis de Ambiente do Backend (definidas no `docker-compose.yml`):**
- `DATABASE_URL=postgres://postgres:postgres@postgres:5432/ireserva`
- `JWT_SECRET=sua_chave_secreta_padrao_para_desenvolvimento`

**Importante:** Para um ambiente de produção, a `JWT_SECRET` **deve** ser alterada para um valor longo, aleatório e seguro.

## 🚀 Executando o Projeto com Docker (Recomendado)

### 1. Inicie os Serviços (Backend e Banco de Dados)
Certifique-se de que o Docker Desktop esteja em execução.
```bash
# Na raiz do projeto (iReserva/)
docker-compose up -d --build
```
Este comando irá:
- Construir as imagens Docker para o backend (se necessário).
- Iniciar os containers para o banco de dados PostgreSQL e a API do backend.
- O banco de dados PostgreSQL estará acessível na porta `5432` do host.
- A API do backend estará acessível na porta `3000` do host.
- Na primeira inicialização do backend, o script `backend/src/database/init-db.js` será executado automaticamente para criar as tabelas e popular o banco de dados com dados iniciais (devido ao `docker-entrypoint.sh`).

Para parar os serviços:
```bash
docker-compose down
```
Para parar e remover os volumes (útil para resetar o banco de dados):
```bash
docker-compose down -v
```

### 2. Inicie o Frontend
```bash
# Em outro terminal, na raiz do projeto (iReserva/)
npm run dev
# ou, se estiver usando bun:
# bun run dev
```
O frontend estará disponível em:
- Local: `http://localhost:5173`
- Na sua rede local: `http://<seu-ip-local>:5173`

## 📦 Scripts Disponíveis

### Frontend (`package.json` na raiz)
- `dev`: Inicia o servidor de desenvolvimento Vite.
- `build`: Gera a build de produção do frontend.
- `preview`: Visualiza a build de produção localmente.
- `lint`: Executa o linter (ESLint).
- `format`: Formata o código (verifique `biome.json` ou `package.json` para o comando exato, ex: `npx @biomejs/biome format --write .`).

### Backend (`package.json` em `backend/`)
- `start`: (Usado pelo Docker) Inicia o servidor de produção.
- `dev`: Inicia o servidor em modo de desenvolvimento com hot-reload (para desenvolvimento local do backend).
- `db:init`: Executa o script `init-db.js` manualmente (útil para desenvolvimento local do backend).

## 🔍 Estrutura do Projeto (Simplificada)
```
iReserva/
├── backend/                # Código fonte e Dockerfile do Backend (Node.js/Express)
│   ├── src/
│   │   ├── database/
│   │   │   └── init-db.js  # Script de inicialização do BD
│   │   └── server.js       # Ponto de entrada principal do servidor
│   ├── Dockerfile
│   └── package.json
├── public/                 # Arquivos estáticos do Frontend (ex: favicon)
├── src/                    # Código fonte do Frontend (React/Vite)
│   ├── components/
│   ├── contexts/
│   ├── pages/
│   ├── services/
│   ├── App.tsx
│   └── main.tsx
├── .gitignore
├── docker-compose.yml      # Configuração dos serviços Docker
├── netlify.toml            # Configuração para deploy na Netlify (se aplicável)
├── package.json            # Dependências e scripts do Frontend
├── vite.config.ts          # Configuração do Vite (incluindo proxies)
└── README.md               # Este arquivo
```

## 🛟 Solução de Problemas Comuns

1. **Erro `EADDRINUSE` (Porta já em uso):**
    * Verifique se você não tem outra instância do backend (porta 3000) ou do frontend (porta 5173) rodando.
    * No Docker, se você rodou `docker-compose up` e depois tentou rodar o backend manualmente (ou vice-versa), haverá conflito. Pare uma das instâncias.
    * Use `docker-compose down` para parar os containers antes de tentar um novo `docker-compose up`.
    * Para encontrar e parar processos usando uma porta específica no Windows (PowerShell como admin):
        ```powershell
        Get-Process -Id (Get-NetTCPConnection -LocalPort SEU_NUMERO_DA_PORTA).OwningProcess | Stop-Process -Force
        ```
        Substitua `SEU_NUMERO_DA_PORTA` por 3000 ou 5173.

2. **Problemas com o Banco de Dados (PostgreSQL):**
    * Verifique os logs do container do PostgreSQL: `docker-compose logs postgres`
    * Se os dados parecerem incorretos ou duplicados (após múltiplas execuções do `init-db.js` sem resetar), pare e remova os volumes: `docker-compose down -v`, depois `docker-compose up -d --build`.

3. **Erro de CORS:**
    * Verifique se as chamadas da API no frontend estão usando caminhos relativos (ex: `/api/stays`) para que o proxy do Vite (`vite.config.ts`) funcione corretamente.
    * Confirme se o backend (container Docker `ireserva-backend-1` ou similar) está rodando na porta 3000 e se o CORS está configurado corretamente no Express.

## 📚 Documentação Adicional
- [Documentação do Vite](https://vitejs.dev/guide/)
- [Documentação do React](https://react.dev/)
- [Documentação do Express](https://expressjs.com/)
- [Documentação do PostgreSQL](https://www.postgresql.org/docs/)
- [Documentação do Docker Compose](https://docs.docker.com/compose/)

## 🤝 Contribuindo
Contribuições são bem-vindas!
1. Faça um Fork do projeto (`https://github.com/levimotaa/ireserva`)
2. Crie sua Feature Branch (`git checkout -b feature/NovaFuncionalidadeIncrivel`)
3. Adicione suas mudanças (`git add .`)
4. Commit suas mudanças (`git commit -m 'Adiciona NovaFuncionalidadeIncrivel'`)
5. Push para a Branch (`git push origin feature/NovaFuncionalidadeIncrivel`)
6. Abra um Pull Request.

## 📝 Licença
Este projeto está sob a licença MIT. Consulte o arquivo `LICENSE` para mais detalhes (se existir, caso contrário, pode adicionar um).
