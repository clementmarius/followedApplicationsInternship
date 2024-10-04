const applicationService = require('../services/applicationServices');

async function formingApplication(req, res) {
    try {
        console.log('Controller formingApplication appelé');
        const userId = req.user.userId; 
        console.log('User ID récupéré depuis req.user:', userId);
        
        const { jobAdvertisementId, status } = req.body;
        console.log('Données reçues:', { jobAdvertisementId, status });

        if (!userId || !jobAdvertisementId) {
            console.log('userId ou jobAdvertisementId manquant');
            return res.status(400).json({ error: 'userId et jobAdvertisementId sont requis' });
        }

        const application = await applicationService.createApplication(userId, { jobAdvertisementId, status });
        console.log('Application créée:', application);

        return res.status(201).json(application);
    } catch (error) {
        console.error('Erreur dans formingApplication:', error);
        return res.status(500).json({ error: 'Could not create application' });
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