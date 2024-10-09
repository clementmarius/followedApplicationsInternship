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

async function updateJob(req, res) {
    const jobId = parseInt(req.params.id);
    const updateData = req.body;

    try {
        const updatedJob = await jobService.updateJobAdvertisement(jobId, updateData);
        res.status(200).json({ message: 'Offre d\'emploi mise à jour avec succès', job: updatedJob });
        console.log('Offre d\'emploi mise à jour:', updatedJob);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


async function deleteJob(req, res) {
    const jobId = parseInt(req.params.id);

    try {
        const deletedJob = await jobService.deleteJobAdvertisement(jobId);
        res.status(200).json({ message: 'Offre d\'emploi supprimée avec succès', job: deletedJob });
        console.log('Offre d\'emploi supprimée:', deletedJob);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function filterAndSortJobs(req, res) {
    const { company, jobType, title, sortField, sortOrder } = req.query;

    const filters = {
        company,
        jobType,
        title,
    };

    const sort = {
        field: sortField,
        order: sortOrder,
    };

    console.log('Filters:', filters);
    console.log('Sort:', sort);

    try {
        const jobs = await jobService.filterAndSortJobAdvertisements(filters, sort);
        res.status(200).json(jobs);
        console.log('Filtered and sorted jobs:', jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.error('Error filtering and sorting jobs:', error);
    }
}

module.exports = {
    createJob,
    findJobById,
    getAllJobs,
    updateJob,
    deleteJob,
    filterAndSortJobs
};