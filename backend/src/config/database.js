const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'ireserva',
    password: 'postgres',
    port: 5432,
});

// Teste de conexão
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
    } else {
        console.log('Conexão com o banco de dados estabelecida com sucesso!');
    }
});

module.exports = {
    query: (text, params) => pool.query(text, params),
}; 