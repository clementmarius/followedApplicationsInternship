const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationControllers');
const authenticateToken = require('../middlewares/authMiddleware'); 

router.post('/createApplication', authenticateToken, applicationController.formingApplication);
router.get('/myApplications', authenticateToken, applicationController.getUserAppli);
router.put('/updateApplication/:id', authenticateToken, applicationController.updateApplication);
router.delete('/deleteApplication/:id', authenticateToken, applicationController.deleteAppli);

module.exports = router;