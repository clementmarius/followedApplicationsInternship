const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authMiddleware');
const authController = require('../controllers/authController');

router.post('/login/auth', (req, res, next) => {
    console.log('Requête de connexion reçue:', req.body);
    next();
}, authController.loginUser);
router.post('/logout/auth', authenticateToken, authController.logOutUser);

module.exports = router;