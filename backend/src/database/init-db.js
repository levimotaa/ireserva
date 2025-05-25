const db = require('../config/database');
const fs = require('fs');
const path = require('path');

async function initDatabase() {
    try {
        // Ler o arquivo SQL
        const sqlFile = path.join(__dirname, 'init.sql');
        const sql = fs.readFileSync(sqlFile, 'utf8');

        // Executar o SQL
        await db.query(sql);
        console.log('Banco de dados inicializado com sucesso!');
        
        // Verificar se os dados foram inseridos
        const result = await db.query('SELECT COUNT(*) FROM stays');
        console.log(`Número de hospedagens cadastradas: ${result.rows[0].count}`);

    } catch (error) {
        console.error('Erro ao inicializar banco de dados:', error);
    }
}

// Executar a inicialização
initDatabase(); 