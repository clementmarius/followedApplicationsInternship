const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authMiddleware');
const authController = require('../controllers/authController');

router.post('/login/auth', authController.loginUser);
router.post('/logout/auth', authenticateToken, (req, res) => {
    console.log('Logout route appelée');
    logOutUser(req, res);
    console.log('Fin du traitement de la route logout');
}, authController.logOutUser);

module.exports = router;