const prisma = require('../libs/prisma');

async function createJobAdvertisement(jobData) {
    try {
        const { title, description, companyName, jobType } = jobData;

        let company = await prisma.company.findUnique({
            where: { name: companyName },
        });

        if (!company) {
            company = await prisma.company.create({
                data: { name: companyName },
            });
        }

        let jobTypeRecord = await prisma.jobType.findUnique({
            where: { type: jobType },
        });

        if (!jobTypeRecord) {
            jobTypeRecord = await prisma.jobType.create({
                data: { type: jobType },
            });
        }

        const jobAdvertisement = await prisma.jobAdvertisement.create({
            data: {
                title,
                description,
                companyId: company.id,
                jobTypeId: jobTypeRecord.id,
            },
        });

        return jobAdvertisement;
    } catch (error) {
        console.error('Error creating job advertisement:', error);
        throw new Error('Could not create job advertisement');
    }
}


async function getJobWithId(params) {
    
}

async function getAllJobId(params) {
    
}


async function updateExistingJob(params) {
    
}


async function deleteJObById(params) {
    
}

module.exports = {
    createJobAdvertisement,
    getJobWithId,
    getAllJobId,
    getAllJobId,
    updateExistingJob,
    deleteJObById
}