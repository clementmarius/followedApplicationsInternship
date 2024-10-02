const jobService = require('../services/jobServices');

async function createJob(req, res) {
    const jobData = req.body;

    try {
        const newJob = await jobService.createJobAdvertisement(jobData);
        res.status(201).json({ message: 'Offre d\'emploi créée avec succès', job: newJob });
        console.log('Offre d\'emploi créée:', newJob);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createJob,
};