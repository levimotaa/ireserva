const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    host: process.env.DB_HOST || 'postgres',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_DATABASE || 'ireserva'
});

// Teste de conexão inicial
pool.connect((err, client, release) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.stack);
    } else {
        console.log('Conexão com o banco de dados estabelecida com sucesso!');
        release();
    }
});

// Wrapper para queries com log
module.exports = {
    query: async (text, params) => {
        const start = Date.now();
        try {
            const res = await pool.query(text, params);
            const duration = Date.now() - start;
            console.log('Query executada:', {
                text,
                duration,
                rows: res.rowCount
            });
            return res;
        } catch (error) {
            console.error('Erro ao executar query:', {
                text,
                error: error.message,
                stack: error.stack
            });
            throw error;
        }
    },
    pool
}; 