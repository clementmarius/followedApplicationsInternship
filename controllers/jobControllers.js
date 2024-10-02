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

async function findJobById(req, res) {
    const jobId = parseInt(req.params.id);

    try {
        const jobProfile = await jobService.getJobAdvertisementById(jobId);
        res.status(201).json(jobProfile);
        console.log('Job by ID:', jobProfile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getAllJobs(req, res) {
    try {
        const jobs = await jobService.getAllJobAdvertisements();
        res.status(200).json(jobs);
        console.log('Liste des offres d\'emploi récupérée:', jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createJob,
    findJobById,
    getAllJobs,
};