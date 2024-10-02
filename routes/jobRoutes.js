const express = require('express');

const jobController = require('../controllers/jobControllers');

const router = express.Router();

router.post('/createJob',jobController.createJob);
router.get('/filterAndSortJobs', jobController.filterAndSortJobs);
router.get('/:id/getJobById',jobController.findJobById);
router.get('/getAllJobId', jobController.getAllJobs);
router.put('/:id/updateJob', jobController.updateJob);
router.delete('/:id/deleteJob',jobController.deleteJob);

module.exports = router;