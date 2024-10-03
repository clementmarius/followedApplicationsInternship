const prisma = require('../libs/prisma');

async function createApplication(userId, applicationData) {
    try {
        const { jobAdvertisementId, status } = applicationData;

        const job = await prisma.jobAdvertisement.findUnique({
            where: { id: jobAdvertisementId },
        });

        if (!job) {
            throw new Error('Offre d\'emploi non trouvée');
        }

        const application = await prisma.application.create({
            data: {
                userId,
                jobAdvertisementId,
                status: status || 'Applied', 
            },
        });

        return application;
    } catch (error) {
        console.error('Error creating application:', error);
        throw new Error('Could not create application');
    }
}

module.exports = {
    createApplication,
}