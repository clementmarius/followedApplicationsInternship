const prisma = require('../libs/prisma');
const bcrypt = require('bcrypt');
const { sendEmail: brevoSendEmail } = require('../brevo');
/* const { email } = require('../config');
 */

async function createUserProfile(userData, profileData) {
    try {
        const hashedPassword = await bcrypt.hash(userData.password, 10);

        const newUser = await prisma.user.create({
            data: {
                email: userData.email,
                password: hashedPassword,
                profile: {
                    create: {
                        firstName: profileData.firstName,
                        lastName: profileData.lastName,
                    },
                },
            },
            include: {
                profile: true,
            },
        });

        return newUser;
    } catch (error) {
        console.error('Error creating user profile:', error);
        throw new Error('Could not create user and profile');
    }
}

async function getUserWithId(userId) {
    try {
        const findUser = await prisma.user.findUnique({
            where: {
                id: userId, 
            },
            include: {
                profile: true,
            },
        });

        return findUser;
    } catch (error) {
        console.error('Error cannot get user profile:', error);
        throw new Error('Could not get user profile');
    }
}

async function getAllUserId(userId) {
    try {
        const findAllUser = await prisma.user.findMany({
            where: {
                id:userId,
            },
            include: {
                profile: true,
            }
        });

        return findAllUser;
    } catch (error) {
        console.error('Error cannot get all users id:', error);
        throw new Error('Could not get users id');
    }
}

module.exports = {
    createUserProfile,
    getUserWithId,
    getAllUserId,
}
