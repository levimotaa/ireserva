const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Servir arquivos estáticos
app.use('/', express.static(path.join(__dirname, '../../public')));

// Log de requisições
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

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