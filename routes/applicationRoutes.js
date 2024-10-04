const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationControllers');
const authenticateToken = require('../middlewares/authMiddleware'); 

/* router.post('/createApplication', authenticateToken, applicationController.formingApplication); */

/* router.post('/createApplication', authenticateToken, (req, res, next) => {
    console.log('POST /application/createApplication route hit');
    console.log('Request body:', req.body);  
    next();  
}, applicationController.formingApplication); */

router.post('/createApplication', (req, res, next) => {
    console.log('POST /application/createApplication route hit');
    console.log('Request body:', req.body);  
    next();  
}, applicationController.formingApplication);


router.get('/myApplications', authenticateToken, applicationController.getUserAppli);
router.put('/updateApplication/:id', authenticateToken, applicationController.updateApplication);
router.delete('/deleteApplication/:id', authenticateToken, applicationController.deleteAppli);

module.exports = router;