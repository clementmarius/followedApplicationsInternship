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

module.exports = {
    formingApplication,
}