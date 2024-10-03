const applicationService = require('../services/applicationServices');

async function formingApplication(req, res) {
    const userId = req.user.id; 
    const applicationData = req.body;

    console.log(`User ${userId} is creating a new application.`);

    try {
        const newApplication = await applicationService.createApplication(userId, applicationData);
        res.status(201).json({ message: 'Candidature créée avec succès', application: newApplication });
        console.log('Candidature créée:', newApplication);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getUserAppli(req, res) {
    const userId = req.user.id;

    console.log(`User ${userId} is fetching their applications.`);

    try {
        const applications = await applicationService.getUserApplications(userId);
        res.status(200).json(applications);
        console.log('Candidatures récupérées:', applications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


async function updateApplication(req, res) {
    const userId = req.user.id;
    const applicationId = parseInt(req.params.id);
    const { status } = req.body;

    console.log(`User ${userId} is updating status of application ${applicationId} to ${status}.`);

    try {
        const updatedApplication = await applicationService.updateApplicationStatus(applicationId, status, userId);
        res.status(200).json({ message: 'Statut de la candidature mis à jour avec succès', application: updatedApplication });
        console.log('Candidature mise à jour:', updatedApplication);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


async function deleteAppli(req, res) {
    const userId = req.user.id;
    const applicationId = parseInt(req.params.id);

    console.log(`User ${userId} is deleting application ${applicationId}.`);

    try {
        const deletedApplication = await applicationService.deleteApplication(applicationId, userId);
        res.status(200).json({ message: 'Candidature supprimée avec succès', application: deletedApplication });
        console.log('Candidature supprimée:', deletedApplication);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    formingApplication,
    getUserAppli,
    updateApplication,
    deleteAppli,
}