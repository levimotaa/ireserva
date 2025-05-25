const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {
        // Verificar se o token existe no header
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: 'Token não fornecido' });
        }

        // Formato do header: "Bearer <token>"
        const [, token] = authHeader.split(' ');
        
        // Verificar se o token é válido
        if (!process.env.JWT_SECRET) {
            console.error('Erro Crítico: JWT_SECRET não está definida no ambiente.');
            return res.status(500).json({ message: 'Erro interno do servidor: Configuração de segurança ausente.' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Adicionar o ID do usuário ao request
        req.userId = decoded.id;
        
        return next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido' });
    }
};

module.exports = authMiddleware; 