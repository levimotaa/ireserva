const express = require('express');
const router = express.Router();
const db = require('../config/database');

router.get('/:stayId', async (req, res) => {
    try {
        const { stayId } = req.params;
        const { check_in_date, check_out_date } = req.query;

        console.log('Recebida requisição de disponibilidade:', {
            stayId,
            check_in_date,
            check_out_date
        });

        // 1. Verificar se a hospedagem existe
        const stay = await db.query('SELECT id FROM stays WHERE id = $1', [stayId]);
        
        if (stay.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Hospedagem não encontrada'
            });
        }

        // 2. Buscar reservas conflitantes
        const reservations = await db.query(`
            SELECT id 
            FROM reservations 
            WHERE stay_id = $1 
            AND status != 'cancelada'
            AND (
                (check_in_date <= $2::date AND check_out_date > $2::date)
                OR (check_in_date < $3::date AND check_out_date >= $3::date)
                OR (check_in_date >= $2::date AND check_out_date <= $3::date)
            )
        `, [stayId, check_in_date, check_out_date]);

        // 3. Retornar resultado
        const available = reservations.rows.length === 0;

        console.log('Resultado da verificação:', {
            available,
            reservationsCount: reservations.rows.length
        });

        return res.json({
            success: true,
            available,
            message: available ? 'Datas disponíveis' : 'Datas indisponíveis'
        });

    } catch (error) {
        console.error('Erro ao verificar disponibilidade:', error);
        return res.status(500).json({
            success: false,
            message: 'Erro ao verificar disponibilidade',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

module.exports = router; 