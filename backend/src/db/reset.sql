-- Limpar as tabelas
TRUNCATE TABLE reservations RESTART IDENTITY;
TRUNCATE TABLE stays RESTART IDENTITY;

-- Inserir novos dados
INSERT INTO stays (title, price, price_type, img_url, rating, location) VALUES
('Hotel Beira Mar', 350.00, 'noite', '/images/hotels/hotel1.jpg', 4.8, 'Florianópolis'),
('Pousada do Sol', 280.00, 'noite', '/images/hotels/hotel2.jpg', 4.5, 'Florianópolis'),
('Resort Praia Dourada', 550.00, 'noite', '/images/hotels/hotel3.jpg', 4.9, 'Balneário Camboriú'),
('Chalé da Montanha', 320.00, 'noite', '/images/hotels/hotel4.jpg', 4.7, 'Gramado'),
('Hotel Centro', 200.00, 'noite', '/images/hotels/hotel5.jpg', 4.3, 'Florianópolis'),
('Pousada Jardim', 180.00, 'noite', '/images/hotels/hotel6.jpg', 4.4, 'Blumenau'),
('Resort dos Lagos', 480.00, 'noite', '/images/hotels/hotel7.jpg', 4.8, 'Balneário Camboriú'),
('Hotel Fazenda', 290.00, 'noite', '/images/hotels/hotel8.jpg', 4.6, 'Lages'); 