const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationControllers');
const authenticateToken = require('../middlewares/authMiddleware'); 

router.post('/createApplication', authenticateToken, applicationController.formingApplication);


module.exports = router;