const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'postgres', // Alterado para usar o nome do serviço no docker-compose
    database: 'postgres',
    password: 'postgres',
    port: 5432,
});

const initDatabase = async () => {
    try {
        // Criar banco de dados se não existir
        await pool.query(`
            SELECT 'CREATE DATABASE ireserva'
            WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'ireserva');
        `);

        // Conectar ao banco ireserva
        const ireservaPool = new Pool({
            user: 'postgres',
            host: 'postgres',
            database: 'ireserva',
            password: 'postgres',
            port: 5432,
        });

        // Criar tabelas
        await ireservaPool.query(`
            CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
            
            CREATE TABLE IF NOT EXISTS users (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS stays (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                price DECIMAL(10,2) NOT NULL,
                price_type VARCHAR(50) NOT NULL,
                img_url TEXT NOT NULL,
                rating INTEGER NOT NULL,
                location VARCHAR(255) NOT NULL,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS reservations (
                id SERIAL PRIMARY KEY,
                user_id UUID NOT NULL REFERENCES users(id),
                stay_id INTEGER NOT NULL REFERENCES stays(id),
                check_in_date DATE NOT NULL,
                check_out_date DATE NOT NULL,
                total_price DECIMAL(10,2) NOT NULL,
                status VARCHAR(50) NOT NULL DEFAULT 'pendente',
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                CONSTRAINT valid_dates CHECK (check_out_date > check_in_date)
            );
        `);

        // Inserir dados de exemplo
        await ireservaPool.query(`
            INSERT INTO stays (title, price, price_type, img_url, rating, location)
            VALUES
                ('Royal Palace Hotel & Spa', 850.00, 'noite', 'https://images.unsplash.com/photo-1566073771259-6a8506099945', 5, 'Rio de Janeiro, RJ'),
                ('Tropical Paradise Resort', 1200.00, 'noite', 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4', 5, 'Salvador, BA'),
                ('Mountain View Lodge', 650.00, 'noite', 'https://images.unsplash.com/photo-1469796466635-455ede028aca', 4, 'Campos do Jordão, SP')
            ON CONFLICT DO NOTHING;
        `);

        console.log('Banco de dados inicializado com sucesso!');
    } catch (error) {
        console.error('Erro ao inicializar banco de dados:', error);
        process.exit(1);
    }
};

// Adicionar um delay para garantir que o PostgreSQL esteja pronto
setTimeout(() => {
    initDatabase().catch(console.error);
}, 5000); 