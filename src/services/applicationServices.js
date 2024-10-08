const prisma = require('../libs/prisma');

async function createApplication(userId, applicationData) {

    console.log('createApplication service called with userId:', userId, 'and applicationData:', applicationData);

    try {
        const { jobAdvertisementId, status } = applicationData;

        console.log('Looking for job advertisement with id:', jobAdvertisementId);


        const job = await prisma.jobAdvertisement.findUnique({
            where: { id: jobAdvertisementId },
        });

        console.log('Offre d\'emploi trouvée:', job);

        if (!job) {

            console.error('Job advertisement not found with id:', jobAdvertisementId);

            throw new Error('Offre d\'emploi non trouvée');
        }

        console.log('Job advertisement found, creating application with userId:', userId, 'and jobAdvertisementId:', jobAdvertisementId);

        const application = await prisma.application.create({
            data: {
                userId,
                jobAdvertisementId,
                status: status || 'Applied',
            },
        });

        console.log('Application created successfully:', application);


        return application;
    } catch (error) {
        console.error('Error creating application:', error);
        throw new Error('Could not create application');
    }
}

async function getUserApplications(userId) {
    try {
        const applications = await prisma.application.findMany({
            where: { userId },
            include: {
                jobAdvertisement: {
                    include: {
                        company: true,
                        jobType: true,
                    },
                },
            },
            orderBy: { appliedAt: 'desc' },
        });

        return applications;
    } catch (error) {
        console.error('Error fetching user applications:', error);
        throw new Error('Could not fetch applications');
    }
}


    async function updateApplicationStatus(userId, applicationId, updateData) {
        try {
            console.log('Service updateApplication appelé avec userId:', userId, ', applicationId:', applicationId, ', updateData:', updateData);
    
            const existingApplication = await prisma.application.findUnique({
                where: { id: applicationId },
            });
    
            console.log('Application trouvée:', existingApplication);
    
            if (!existingApplication) {
                throw new Error('Application non trouvée');
            }
    
            if (existingApplication.userId !== userId) {
                throw new Error('Non autorisé à modifier cette candidature');
            }
    
            const updatedApplication = await prisma.application.update({
                where: { id: applicationId },
                data: updateData,
            });
    
            console.log('Application mise à jour:', updatedApplication);
            return updatedApplication;
        } catch (error) {
            console.error('Erreur dans updateApplication service:', error);
            throw error;
        }
    }


async function deleteApplication(userId, applicationId ) {
    try {
        console.log('Service deleteApplication appelé avec userId:', userId, ', applicationId:', applicationId);

        const existingApplication = await prisma.application.findUnique({
            where: { id: Number(applicationId) },
        });

        console.log('Application trouvée:', existingApplication);

        if (!existingApplication) {
            throw new Error('Application non trouvée');
        }

        if (existingApplication.userId !== userId) {
            console.log(`Utilisateur ${userId} tente de supprimer une application appartenant à ${existingApplication.userId}`);
            throw new Error('Non autorisé à supprimer cette candidature');
        }

        const deletedApplication = await prisma.application.delete({
            where: { id: Number(applicationId) },
        });

        console.log('Application supprimée avec succès');
        return deletedApplication;
    } catch (error) {
        console.error('Erreur dans deleteApplication service:', error.message);
        throw error;
    }
}

module.exports = {
    createApplication,
    getUserApplications,
    updateApplicationStatus,
    deleteApplication
}