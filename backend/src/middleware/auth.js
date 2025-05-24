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
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'sua_chave_secreta');
        
        // Adicionar o ID do usuário ao request
        req.userId = decoded.id;
        
        return next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido' });
    }
};

module.exports = authMiddleware; 