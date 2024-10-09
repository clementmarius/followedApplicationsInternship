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


async function getJobAdvertisementById(jobId) {
    try {
        const job = await prisma.jobAdvertisement.findUnique({
            where: { id: jobId },
            include: {
                company: true,
                jobType: true,
                applications: true,
            },
        });
        return job;
    } catch (error) {
        console.error('Error fetching job advertisement:', error);
        throw new Error('Could not fetch job advertisement');
    }
}

async function getAllJobAdvertisements() {
    try {
        const jobs = await prisma.jobAdvertisement.findMany({
            include: {
                company: true,
                jobType: true,
                applications: true,
            },
        });
        return jobs;
    } catch (error) {
        console.error('Error fetching job advertisements:', error);
        throw new Error('Could not fetch job advertisements');
    }
}



async function updateJobAdvertisement(jobId, updateData) {
    try {
        const { title, description, companyName, jobType } = updateData;

        let company = null;
        if (companyName) {
            company = await prisma.company.findUnique({
                where: { name: companyName },
            });

            if (!company) {
                company = await prisma.company.create({
                    data: { name: companyName },
                });
            }
        }

        let jobTypeRecord = null;
        if (jobType) {
            jobTypeRecord = await prisma.jobType.findUnique({
                where: { type: jobType },
            });

            if (!jobTypeRecord) {
                jobTypeRecord = await prisma.jobType.create({
                    data: { type: jobType },
                });
            }
        }

        const updatedJob = await prisma.jobAdvertisement.update({
            where: { id: jobId },
            data: {
                title: title || undefined,
                description: description || undefined,
                companyId: company ? company.id : undefined,
                jobTypeId: jobTypeRecord ? jobTypeRecord.id : undefined,
            },
        });

        return updatedJob;
    } catch (error) {
        console.error('Error updating job advertisement:', error);
        throw new Error('Could not update job advertisement');
    }
}


async function deleteJobAdvertisement(jobId) {
    try {
        await prisma.application.deleteMany({
            where: { jobAdvertisementId: jobId },
        });

        const deletedJob = await prisma.jobAdvertisement.delete({
            where: { id: jobId },
            include: {
                company: true,
                jobType: true,
            },
        });

        return deletedJob;
    } catch (error) {
        console.error('Error deleting job advertisement:', error);
        throw new Error('Could not delete job advertisement');
    }
}

async function filterAndSortJobAdvertisements(filters, sort) {
    try {
        const where = {};

        if (filters.company) {
            where.company = {
                name: {
                    contains: filters.company,
                    mode: 'insensitive', 
                },
            };
        }

        if (filters.jobType) {
            where.jobType = {
                type: filters.jobType,
            };
        }

        if (filters.title) {
            where.title = {
                contains: filters.title,
                mode: 'insensitive',
            };
        }


        const orderBy = [];

        if (sort.field && sort.order) {
            orderBy.push({
                [sort.field]: sort.order,
            });
        }

        if (!orderBy.length) {
            orderBy.push({
                id: 'desc', 
            });
        }

        const jobs = await prisma.jobAdvertisement.findMany({
            where,
            include: {
                company: true,
                jobType: true,
                applications: true,
            },
            orderBy,
        });

        return jobs;
    } catch (error) {
        console.error('Error filtering and sorting job advertisements:', error);
        throw new Error('Could not filter and sort job advertisements');
    }
}


module.exports = {
    createJobAdvertisement,
    getJobAdvertisementById,
    getAllJobAdvertisements,
    updateJobAdvertisement,
    deleteJobAdvertisement,
    filterAndSortJobAdvertisements
}