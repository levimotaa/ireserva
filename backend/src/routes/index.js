const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');
const staysRoutes = require('./stays');

router.use('/auth', authRoutes);
router.use('/stays', staysRoutes);

// Rota de teste
router.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

module.exports = router; 