const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const path = require('path');

const app = express();

// Log de requisições (antes de tudo para capturar todas as requisições)
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Middleware
app.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true
}));
app.use(express.json());

// Servir arquivos estáticos com configuração específica
app.use('/images', express.static('/app/public/images', {
    setHeaders: (res) => {
        res.set('Cache-Control', 'public, max-age=31536000');
        res.set('Access-Control-Allow-Origin', '*');
    }
}));

// Rotas
app.use('/', routes);

// Rota de teste
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

// Tratamento de erros
app.use((err, req, res, next) => {
    console.error('Erro na aplicação:', err);
    res.status(500).json({ message: 'Erro interno do servidor' });
});

// Rota 404
app.use((req, res) => {
    console.log('Rota não encontrada:', req.url);
    res.status(404).json({ message: 'Rota não encontrada' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
}); 