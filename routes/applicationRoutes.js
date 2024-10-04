const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationControllers');
const authenticateToken = require('../middlewares/authMiddleware'); 

router.post('/createApplication', authenticateToken, (req, res, next) => {
    console.log('POST /application/createApplication route hit');
    console.log('Request body:', req.body);  
    next();  
}, applicationController.formingApplication);

router.get('/myApplications', authenticateToken, (req, res, next) => {
    console.log('GET /application/myApplications route hit');
    next();
}, applicationController.getUserAppli);


router.put('/updateApplication/:id', authenticateToken, applicationController.updateApplication);
router.delete('/deleteApplication/:id', authenticateToken, applicationController.deleteAppli);

module.exports = router;