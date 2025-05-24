-- Criar tabela de usuários
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Criar tabela de hospedagens
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

-- Inserir algumas hospedagens de exemplo
INSERT INTO stays (title, price, price_type, img_url, rating, location) VALUES
    ('Royal Palace Hotel & Spa', 850.00, 'noite', 'https://images.unsplash.com/photo-1566073771259-6a8506099945', 5, 'Rio de Janeiro, RJ'),
    ('Tropical Paradise Resort', 1200.00, 'noite', 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4', 5, 'Salvador, BA'),
    ('Mountain View Lodge', 650.00, 'noite', 'https://images.unsplash.com/photo-1469796466635-455ede028aca', 4, 'Campos do Jordão, SP')
ON CONFLICT DO NOTHING; 