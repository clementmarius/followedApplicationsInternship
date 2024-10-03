const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');
const authenticateToken = require('../middlewares/authMiddleware'); 

router.post('/createApplication', authenticateToken, applicationController.createApplication);


module.exports = router;