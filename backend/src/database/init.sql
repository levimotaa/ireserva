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
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    price_type VARCHAR(50) NOT NULL,
    img_url TEXT NOT NULL,
    rating DECIMAL(2,1) NOT NULL,
    location VARCHAR(255) NOT NULL,
    amenities TEXT[] DEFAULT '{}',
    max_guests INTEGER NOT NULL DEFAULT 2,
    bedrooms INTEGER NOT NULL DEFAULT 1,
    bathrooms INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Criar tabela de reservas
CREATE TABLE IF NOT EXISTS reservations (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    stay_id INTEGER REFERENCES stays(id),
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    guests INTEGER NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT valid_dates CHECK (check_out_date > check_in_date),
    CONSTRAINT valid_guests CHECK (guests > 0)
);

-- Inserir algumas hospedagens de exemplo
INSERT INTO stays (
    title, 
    description, 
    price, 
    price_type, 
    img_url, 
    rating, 
    location, 
    amenities, 
    max_guests, 
    bedrooms, 
    bathrooms
) VALUES
(
    'Hotel Beira Mar', 
    'Luxuoso hotel à beira-mar com vista panorâmica para o oceano. Quartos espaçosos e confortáveis com varanda privativa.',
    350.00, 
    'noite', 
    '/images/hotel1.jpg', 
    4.8, 
    'Florianópolis',
    ARRAY['Wi-Fi', 'Piscina', 'Academia', 'Restaurante', 'Bar', 'Estacionamento'],
    4,
    2,
    2
),
(
    'Pousada do Sol', 
    'Charmosa pousada com ambiente acolhedor e café da manhã colonial. Localização privilegiada próxima às principais praias.',
    280.00, 
    'noite', 
    '/images/hotel2.jpg', 
    4.5, 
    'Florianópolis',
    ARRAY['Wi-Fi', 'Café da manhã', 'Jardim', 'Estacionamento'],
    3,
    1,
    1
),
(
    'Resort Praia Dourada', 
    'Resort all-inclusive com infraestrutura completa de lazer. Ideal para famílias e casais em busca de conforto e diversão.',
    550.00, 
    'noite', 
    '/images/hotel3.jpg', 
    4.9, 
    'Balneário Camboriú',
    ARRAY['Wi-Fi', 'Piscina', 'Academia', 'Spa', 'Restaurante', 'Bar', 'Kids Club', 'Estacionamento'],
    6,
    3,
    2
),
(
    'Chalé da Montanha', 
    'Chalé aconchegante em meio à natureza. Perfeito para quem busca tranquilidade e contato com a natureza.',
    320.00, 
    'noite', 
    '/images/hotel4.jpg', 
    4.7, 
    'Gramado',
    ARRAY['Wi-Fi', 'Lareira', 'Cozinha equipada', 'Churrasqueira', 'Estacionamento'],
    4,
    2,
    1
),
(
    'Hotel Centro', 
    'Hotel bem localizado no centro da cidade, próximo aos principais pontos turísticos e áreas comerciais.',
    200.00, 
    'noite', 
    '/images/hotel5.jpg', 
    4.3, 
    'Florianópolis',
    ARRAY['Wi-Fi', 'Café da manhã', 'Business Center', 'Academia', 'Estacionamento'],
    2,
    1,
    1
),
(
    'Pousada Jardim', 
    'Pousada cercada por belos jardins e área verde. Ambiente tranquilo e familiar.',
    180.00, 
    'noite', 
    '/images/hotel6.jpg', 
    4.4, 
    'Blumenau',
    ARRAY['Wi-Fi', 'Café da manhã', 'Jardim', 'Área de churrasco', 'Estacionamento'],
    3,
    1,
    1
),
(
    'Resort dos Lagos', 
    'Resort luxuoso às margens do lago, com vista deslumbrante e atividades aquáticas.',
    480.00, 
    'noite', 
    '/images/hotel7.jpg', 
    4.8, 
    'Balneário Camboriú',
    ARRAY['Wi-Fi', 'Piscina', 'Academia', 'Spa', 'Marina', 'Restaurante', 'Bar', 'Estacionamento'],
    5,
    2,
    2
),
(
    'Hotel Fazenda', 
    'Experiência única em hotel fazenda com atividades rurais e contato com a natureza.',
    290.00, 
    'noite', 
    '/images/hotel8.jpg', 
    4.6, 
    'Lages',
    ARRAY['Wi-Fi', 'Piscina', 'Cavalos', 'Restaurante', 'Área de churrasco', 'Estacionamento'],
    4,
    2,
    1
); 