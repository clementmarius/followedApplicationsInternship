const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authMiddleware');

router.get('/test-auth', authenticateToken, (req, res) => {
    res.json({ message: 'Middleware fonctionne', user: req.user });
});

module.exports = router;
