const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login/auth', authController.loginUser);
router.post('/logout/auth', authController.logOutUser)

module.exports = router;