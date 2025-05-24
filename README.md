# iReserva

## 📋 Sobre o Projeto

iReserva é uma aplicação web moderna desenvolvida com React, Vite e TailwindCSS, focada em proporcionar uma experiência de usuário excepcional. O projeto utiliza as mais recentes tecnologias e práticas de desenvolvimento web, com uma arquitetura completa incluindo frontend, backend e banco de dados.

## 🏗️ Arquitetura do Projeto

O projeto é dividido em três partes principais:

1. **Frontend**: Aplicação React com Vite
2. **Backend**: API REST com Node.js e Express
3. **Banco de Dados**: PostgreSQL

## 🚀 Tecnologias Utilizadas

### Frontend
- [React 18](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [React Router DOM](https://reactrouter.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [Axios](https://axios-http.com/)

### Backend
- Node.js
- Express
- PostgreSQL
- JWT para autenticação
- Bcrypt para criptografia
- CORS

## 🛠️ Pré-requisitos

- Node.js (versão LTS recomendada)
- npm ou bun
- Docker e Docker Compose
- Git

## 🔧 Instalação e Configuração

### 1. Clone o Repositório
```bash
git clone [url-do-repositório]
cd iReserva
```

### 2. Configuração do Frontend

```bash
# Instale as dependências do frontend
npm install
# ou
bun install

# Crie o arquivo .env na raiz do projeto
echo "VITE_API_URL=http://localhost:3000" > .env
```

### 3. Configuração do Backend

```bash
# Navegue até o diretório do backend
cd backend

# Instale as dependências do backend
npm install
```

### 4. Configuração do Docker

O projeto utiliza Docker Compose para gerenciar os containers do backend e banco de dados. O arquivo `docker-compose.yml` já está configurado com:

- PostgreSQL na porta 5432
- Backend na porta 3000
- Rede dedicada para comunicação entre os serviços
- Volume persistente para dados do PostgreSQL

## 🚀 Executando o Projeto

### 1. Inicie os Serviços do Backend

```bash
# Na raiz do projeto
docker-compose up -d
```

Isso irá iniciar:
- Banco de dados PostgreSQL
- API do backend

### 2. Inicie o Frontend

```bash
# Em outro terminal, na raiz do projeto
npm run dev
# ou
bun run dev
```

O frontend estará disponível em:
- Local: http://localhost:5173
- Rede: http://seu-ip:5173

## 📦 Scripts Disponíveis

### Frontend
- `dev`: Inicia o servidor de desenvolvimento
- `build`: Gera a build de produção
- `preview`: Visualiza a build de produção localmente
- `lint`: Executa a verificação de código
- `format`: Formata o código usando Biome

### Backend
- `start`: Inicia o servidor em produção
- `dev`: Inicia o servidor em modo desenvolvimento com hot-reload

## 🔐 Variáveis de Ambiente

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3000
```

### Backend (definidas no docker-compose.yml)
```env
DATABASE_URL=postgres://postgres:postgres@postgres:5432/ireserva
JWT_SECRET=sua_chave_secreta
```

## 🔍 Estrutura do Projeto

```
ireserva/
├── src/               # Código fonte do frontend
├── public/            # Arquivos públicos do frontend
├── backend/
│   ├── src/          # Código fonte do backend
│   └── Dockerfile    # Configuração do container do backend
├── docker-compose.yml # Configuração dos serviços
└── package.json      # Dependências do frontend
```

## 🛟 Solução de Problemas

1. **Erro de conexão com o banco de dados**
   - Verifique se os containers Docker estão rodando: `docker ps`
   - Verifique os logs: `docker-compose logs postgres`

2. **Erro de CORS**
   - Verifique se a URL da API está correta no arquivo .env do frontend
   - Confirme se o backend está rodando na porta 3000

## 📚 Documentação Adicional

- [Documentação do Vite](https://vitejs.dev/guide/)
- [Documentação do React](https://react.dev/)
- [Documentação do Express](https://expressjs.com/)
- [Documentação do PostgreSQL](https://www.postgresql.org/docs/)

## 🤝 Contribuindo

1. Faça o fork do projeto
2. Crie sua branch de feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT.
