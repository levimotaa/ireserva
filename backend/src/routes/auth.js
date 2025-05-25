const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/database');

// Rota de registro
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
        }

        // Verificar se o usuário já existe
        const userExists = await db.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );

        if (userExists.rows.length > 0) {
            return res.status(400).json({ message: 'Email já cadastrado' });
        }

        // Hash da senha
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Inserir usuário
        const result = await db.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
            [name, email, hashedPassword]
        );

        // Gerar token
        if (!process.env.JWT_SECRET) {
            console.error('Erro Crítico: JWT_SECRET não está definida no ambiente para assinar o token.');
            return res.status(500).json({ message: 'Erro interno do servidor: Falha ao gerar token de autenticação.' });
        }
        const token = jwt.sign(
            { id: result.rows[0].id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(201).json({
            token,
            user: {
                id: result.rows[0].id,
                name: result.rows[0].name,
                email: result.rows[0].email
            }
        });
    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        if (error.code === '23505') { // Código de erro para violação de unique constraint
            return res.status(400).json({ message: 'Email já cadastrado' });
        }
        res.status(500).json({ 
            message: 'Erro ao processar requisição',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// Rota de login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Buscar usuário
        const result = await db.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Email ou senha inválidos' });
        }

        const user = result.rows[0];

        // Verificar senha
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Email ou senha inválidos' });
        }

        // Gerar token
        if (!process.env.JWT_SECRET) {
            console.error('Erro Crítico: JWT_SECRET não está definida no ambiente para assinar o token.');
            return res.status(500).json({ message: 'Erro interno do servidor: Falha ao gerar token de autenticação.' });
        }
        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ message: 'Erro ao processar requisição' });
    }
});

module.exports = router; 