#!/bin/sh

echo "Aguardando PostgreSQL..."
while ! nc -z postgres 5432; do
  sleep 1
done
echo "PostgreSQL pronto!"

echo "Inicializando banco de dados..."
node src/database/init-db.js

echo "Iniciando aplicação..."
npm run dev 