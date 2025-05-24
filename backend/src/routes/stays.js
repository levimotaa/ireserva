const express = require('express');
const router = express.Router();
const db = require('../config/database');
const auth = require('../middleware/auth');

// Listar todas as hospedagens (público)
router.get('/', async (req, res) => {
    console.log('Recebida requisição GET /stays');
    try {
        console.log('Tentando executar query no banco de dados...');
        const result = await db.query(
            'SELECT DISTINCT ON (id) id, title, price, price_type as "priceType", img_url as "imgUrl", rating, location FROM stays ORDER BY id'
        );
        console.log('Query executada com sucesso:', result.rows);
        res.json(result.rows);
    } catch (error) {
        console.error('Erro ao listar hospedagens:', error);
        res.status(500).json({ message: 'Erro ao buscar hospedagens' });
    }
});

// Buscar hospedagem por ID (público)
router.get('/:id', async (req, res) => {
    try {
        const result = await db.query(
            'SELECT id, title, price, price_type as "priceType", img_url as "imgUrl", rating, location FROM stays WHERE id = $1',
            [req.params.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Hospedagem não encontrada' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Erro ao buscar hospedagem:', error);
        res.status(500).json({ message: 'Erro ao buscar hospedagem' });
    }
});

// Buscar hospedagens por localização (público)
router.get('/search/:location', async (req, res) => {
    try {
        const result = await db.query(
            'SELECT DISTINCT ON (id) id, title, price, price_type as "priceType", img_url as "imgUrl", rating, location FROM stays WHERE LOWER(location) LIKE LOWER($1) ORDER BY id',
            [`%${req.params.location}%`]
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Erro ao buscar hospedagens:', error);
        res.status(500).json({ message: 'Erro ao buscar hospedagens' });
    }
});

// Criar nova hospedagem (protegido - apenas admin no futuro)
router.post('/', auth, async (req, res) => {
    try {
        const { title, price, priceType, imgUrl, rating, location } = req.body;
        
        const result = await db.query(
            `INSERT INTO stays (title, price, price_type, img_url, rating, location) 
             VALUES ($1, $2, $3, $4, $5, $6) 
             RETURNING id, title, price, price_type as "priceType", img_url as "imgUrl", rating, location`,
            [title, price, priceType, imgUrl, rating, location]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao criar hospedagem' });
    }
});

module.exports = router;