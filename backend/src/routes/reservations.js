const express = require('express');
const router = express.Router();
const db = require('../config/database');
const auth = require('../middleware/auth');

// Rota específica para verificação de disponibilidade (público)
router.get('/check/:stayId', async (req, res) => {
    try {
        const { check_in_date, check_out_date } = req.query;
        const { stayId } = req.params;

        console.log('Dados recebidos na verificação:', {
            stayId,
            check_in_date,
            check_out_date,
            queryParams: req.query
        });

        // Validar se as datas foram fornecidas
        if (!check_in_date || !check_out_date) {
            console.log('Datas não fornecidas');
            return res.status(400).json({ 
                message: 'Datas de check-in e check-out são obrigatórias' 
            });
        }

        // Validar se o stayId é válido e é um número
        if (isNaN(parseInt(stayId))) {
            console.log('StayId inválido:', stayId);
            return res.status(400).json({
                message: 'ID da hospedagem inválido'
            });
        }

        // Validar se o stayId existe
        const stayExists = await db.query(
            'SELECT id FROM stays WHERE id = $1',
            [parseInt(stayId)]
        );

        if (stayExists.rows.length === 0) {
            console.log('Hospedagem não encontrada');
            return res.status(404).json({ 
                message: 'Hospedagem não encontrada' 
            });
        }

        // Converter as datas para UTC
        const checkInDate = new Date(check_in_date + 'T00:00:00Z');
        const checkOutDate = new Date(check_out_date + 'T00:00:00Z');

        console.log('Datas convertidas:', {
            checkInDate: checkInDate.toISOString(),
            checkOutDate: checkOutDate.toISOString(),
            checkInValid: !isNaN(checkInDate.getTime()),
            checkOutValid: !isNaN(checkOutDate.getTime())
        });

        if (isNaN(checkInDate.getTime()) || isNaN(checkOutDate.getTime())) {
            console.log('Datas inválidas após conversão');
            return res.status(400).json({ 
                message: 'Datas inválidas' 
            });
        }

        if (checkInDate >= checkOutDate) {
            console.log('Check-out não é posterior ao check-in');
            return res.status(400).json({ 
                message: 'A data de check-out deve ser posterior à data de check-in' 
            });
        }

        const currentDate = new Date();
        currentDate.setUTCHours(0, 0, 0, 0);

        if (checkInDate < currentDate) {
            console.log('Check-in anterior à data atual');
            return res.status(400).json({ 
                message: 'A data de check-in não pode ser anterior à data atual' 
            });
        }

        // Verificar disponibilidade usando datas UTC
        const query = `
            SELECT * FROM reservations 
            WHERE stay_id = $1 
            AND status != 'cancelada'
            AND (
                (check_in_date <= $2::date AND check_out_date >= $2::date)
                OR (check_in_date <= $3::date AND check_out_date >= $3::date)
                OR (check_in_date >= $2::date AND check_out_date <= $3::date)
            )`;
        
        const params = [
            parseInt(stayId),
            check_in_date,
            check_out_date
        ];

        console.log('Query de verificação:', {
            query,
            params
        });

        const result = await db.query(query, params);

        console.log('Resultado da verificação:', {
            rowCount: result.rows.length,
            reservations: result.rows
        });

        return res.json({ 
            available: result.rows.length === 0,
            conflictingReservations: result.rows.length
        });
    } catch (error) {
        console.error('Erro detalhado ao verificar disponibilidade:', {
            error: error.message,
            stack: error.stack,
            query: error.query,
            code: error.code
        });
        
        if (error.code === '22P02') {
            return res.status(400).json({ 
                message: 'Formato de data inválido' 
            });
        }
        
        res.status(500).json({ 
            message: 'Erro ao verificar disponibilidade',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// Criar uma nova reserva (protegido)
router.post('/', auth, async (req, res) => {
    try {
        const { stay_id, check_in_date, check_out_date, guests } = req.body;
        const user_id = req.userId;

        if (!user_id) {
            console.error('Erro: userId não encontrado na requisição após autenticação.');
            return res.status(401).json({ message: 'Usuário não autenticado corretamente.' });
        }

        if (!stay_id || !check_in_date || !check_out_date || !guests) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios: stay_id, check_in_date, check_out_date, guests.' });
        }
        
        if (isNaN(parseInt(guests)) || parseInt(guests) <= 0) {
            return res.status(400).json({ message: 'Número de hóspedes inválido.' });
        }

        // Buscar informações da hospedagem, incluindo max_guests
        const stayResult = await db.query(
            'SELECT price, price_type, max_guests FROM stays WHERE id = $1',
            [stay_id]
        );

        if (stayResult.rows.length === 0) {
            return res.status(404).json({ message: 'Hospedagem não encontrada' });
        }
        const stay = stayResult.rows[0];

        // Validar número de hóspedes
        if (parseInt(guests) > stay.max_guests) {
            return res.status(400).json({ message: `Esta hospedagem acomoda no máximo ${stay.max_guests} hóspedes.` });
        }

        // Verificar conflitos de reserva
        const conflictingReservations = await db.query(
            `SELECT * FROM reservations 
             WHERE stay_id = $1 
             AND status != 'cancelada'
             AND (
                 (check_in_date <= $2 AND check_out_date >= $2)
                 OR (check_in_date <= $3 AND check_out_date >= $3)
                 OR (check_in_date >= $2 AND check_out_date <= $3)
             )`,
            [stay_id, check_in_date, check_out_date]
        );

        if (conflictingReservations.rows.length > 0) {
            const errorMessage = 'Datas não disponíveis para esta acomodação no período selecionado.';
            console.log(`Conflito de datas para stay_id ${stay_id}: check_in=${check_in_date}, check_out=${check_out_date}. Enviando: 400, { message: "${errorMessage}" }`);
            return res.status(400).json({ message: errorMessage });
        }

        // Calcular o número de dias
        const checkIn = new Date(check_in_date);
        const checkOut = new Date(check_out_date);
        const diffTime = Math.abs(checkOut - checkIn);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        // Calcular preço total
        const total_price = stay.price * diffDays;

        // Criar a reserva
        const result = await db.query(
            `INSERT INTO reservations 
             (user_id, stay_id, check_in_date, check_out_date, guests, total_price, status) 
             VALUES ($1, $2, $3, $4, $5, $6, 'confirmada')
             RETURNING id, check_in_date, check_out_date, guests, total_price, status`,
            [user_id, stay_id, check_in_date, check_out_date, parseInt(guests), total_price]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Erro ao criar reserva:', error);
        res.status(500).json({ message: 'Erro ao processar reserva' });
    }
});

// Listar reservas do usuário (protegido)
router.get('/my-reservations', auth, async (req, res) => {
    try {
        const result = await db.query(
            `SELECT r.*, s.title, s.location, s.img_url 
             FROM reservations r
             JOIN stays s ON r.stay_id = s.id
             WHERE r.user_id = $1
             ORDER BY r.check_in_date DESC`,
            [req.userId]
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Erro ao listar reservas:', error);
        res.status(500).json({ message: 'Erro ao buscar reservas' });
    }
});

// Cancelar uma reserva (protegido)
router.post('/:id/cancel', auth, async (req, res) => {
    try {
        const result = await db.query(
            `UPDATE reservations 
             SET status = 'cancelada', updated_at = CURRENT_TIMESTAMP
             WHERE id = $1 AND user_id = $2
             RETURNING *`,
            [req.params.id, req.userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Reserva não encontrada' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Erro ao cancelar reserva:', error);
        res.status(500).json({ message: 'Erro ao cancelar reserva' });
    }
});

module.exports = router; 