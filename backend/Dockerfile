FROM node:20-alpine

WORKDIR /app

# Instalar netcat
RUN apk add --no-cache netcat-openbsd

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

# Script de inicialização
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["docker-entrypoint.sh"] 