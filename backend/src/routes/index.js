const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');
const staysRouter = require('./stays');
const reservationsRoutes = require('./reservations');
const availabilityRoutes = require('./availability');

router.use('/auth', authRoutes);
router.use('/stays', staysRouter);
router.use('/reservations', reservationsRoutes);
router.use('/availability', availabilityRoutes);

// Rota de teste
router.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

module.exports = router; 