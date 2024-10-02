const express = require('express');

const jobController = require('../controllers/jobControllers');

const router = express.Router();

router.post('/createJob',jobController.createJob);
/* router.get('/:id/getJobById',jobController.findJobById);
router.get('/getAllJobId', jobController.findAllJobById);
router.put('/updateJob', jobController.updateJob);
router.delete('/:id/deleteJob',jobController.removeJob); */


module.exports = router;