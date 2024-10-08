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
    try {
        console.log('Controller updateApplication appelé');

        const userId = req.user.userId;
        console.log('User ID récupéré depuis req.user:', userId);

        const applicationId = parseInt(req.params.id, 10);
        const { status } = req.body;

        console.log(`User ID: ${userId}, Application ID: ${applicationId}`);
        console.log('Données reçues:', { status });

        if (!applicationId || !status) {
            console.log('applicationId ou status manquant');
            return res.status(400).json({ error: 'applicationId et status sont requis' });
        }

        const updatedApplication = await applicationService.updateApplicationStatus(userId, applicationId, { status });
        console.log('Application mise à jour:', updatedApplication);

        if (!updatedApplication) {
            return res.status(404).json({ error: 'Application non trouvée ou accès refusé' });
        }

        return res.status(200).json(updatedApplication);
    } catch (error) {
        console.error('Erreur dans updateApplication:', error);
        return res.status(500).json({ error: 'Could not update application' });
    }
}


async function deleteAppli(req, res) {
    try {
        const userId = req.user.userId;
        const applicationId = parseInt(req.params.id, 10);

        console.log(`User ${userId} is deleting application ${applicationId}.`);

        const deletedApplication = await applicationService.deleteApplication(userId, applicationId);

        if (!deletedApplication) {
            return res.status(404).json({ error: 'Application non trouvée ou accès refusé' });
        }

        res.status(200).json({ message: 'Candidature supprimée avec succès' });
    } catch (error) {
        console.error('Erreur dans deleteAppli:', error.message);
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    formingApplication,
    getUserAppli,
    updateApplication,
    deleteAppli,
}