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

async function getAllUserId() {
    try {
        const findAllUser = await prisma.user.findMany({
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

async function updateExistingUser(email, newEmail, newPassword) {
    try {
        const user = await prisma.user.findUnique({
            where: { email: email },
        });

        if (!user) {
            throw new Error('User not found');
        }

        let hashedPassword = user.password;
        if (newPassword) {
            hashedPassword = await bcrypt.hash(newPassword, 10);
        }

        const updatedUser = await prisma.user.update({
            where: { email: email },
            data: {
                email: newEmail || email, 
                password: hashedPassword, 
            },
        });

        return updatedUser;
    } catch (error) {
        console.error('Error updating user:', error);
        throw new Error('Could not update user');
    }
}

async function deleteUserById(userId) {
    try {
        // Suppression de l'utilisateur avec toutes ses relations
        const deletedUser = await prisma.user.delete({
            where: {
                id: userId,
            },
            include: {
                profile: true, // Inclure le profil pour le supprimer aussi
            },
        });

        // Si vous avez d'autres tables liées, supprimez également les données associées ici
        // Exemple : supprimer les applications liées
        await prisma.application.deleteMany({
            where: {
                userId: userId, // Suppression des applications de cet utilisateur
            },
        });

        // En fonction de votre modèle, supprimez d'autres relations si nécessaire
        // await prisma.resume.deleteMany({ where: { userId: userId } });

        return deletedUser;
    } catch (error) {
        console.error('Error deleting user:', error);
        throw new Error('Could not delete user');
    }
}


module.exports = {
    createUserProfile,
    getUserWithId,
    getAllUserId,
    updateExistingUser,
    deleteUserById,
}
