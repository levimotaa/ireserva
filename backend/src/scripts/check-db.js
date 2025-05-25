const db = require('../config/database');

async function checkDatabase() {
    try {
        // Verificar se a tabela stays existe
        const tableCheck = await db.query(`
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_schema = 'public' 
                AND table_name = 'stays'
            );
        `);
        
        console.log('Tabela stays existe?', tableCheck.rows[0].exists);

        if (tableCheck.rows[0].exists) {
            // Contar registros na tabela stays
            const countResult = await db.query('SELECT COUNT(*) FROM stays;');
            console.log('Número de registros na tabela stays:', countResult.rows[0].count);

            // Mostrar alguns registros
            const stays = await db.query('SELECT * FROM stays LIMIT 3;');
            console.log('Primeiros 3 registros:', stays.rows);
        }

    } catch (error) {
        console.error('Erro ao verificar banco de dados:', error);
    } finally {
        process.exit();
    }
}

checkDatabase(); 