-- Limpar e repovoar a tabela stays
TRUNCATE TABLE stays RESTART IDENTITY;

-- Inserir novos dados
INSERT INTO stays (title, price, price_type, img_url, rating, location) VALUES
('Hotel Beira Mar', 350.00, 'noite', 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=800&h=600', 4.8, 'Florianópolis'),
('Pousada do Sol', 280.00, 'noite', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&h=600', 4.5, 'Florianópolis'),
('Resort Praia Dourada', 550.00, 'noite', 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800&h=600', 4.9, 'Balneário Camboriú'),
('Chalé da Montanha', 320.00, 'noite', 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?q=80&w=800&h=600', 4.7, 'Gramado'),
('Hotel Centro', 200.00, 'noite', 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=800&h=600', 4.3, 'Florianópolis'),
('Pousada Jardim', 180.00, 'noite', 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=800&h=600', 4.4, 'Blumenau'),
('Resort dos Lagos', 480.00, 'noite', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=800&h=600', 4.8, 'Balneário Camboriú'),
('Hotel Fazenda', 290.00, 'noite', 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=800&h=600', 4.6, 'Lages'); 