const prisma = require('../libs/prisma');
const bcrypt = require('bcrypt');
const { sendEmail: brevoSendEmail } = require('../../brevo');

async function createUserProfile(userData, profileData) {
    try {
        const hashedPassword = await bcrypt.hash(userData.password, 10);

        const existingRole = await prisma.role.findUnique({
            where: { name: 'USER' },
        });
    
        if (!existingRole) {
            await prisma.role.create({
                data: { name: 'USER' },
            });
            console.log(`Role created: USER`);
        }

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
                roles: {
                    connect: { name: 'USER' },
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

async function createAdminUser() {
    const adminEmail = 'admin@example.com';
    const adminPassword = '1234';

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const existingRole = await prisma.role.findUnique({
        where: { name: 'ADMIN' },
    });

    if (!existingRole) {
        await prisma.role.create({
            data: { name: 'ADMIN' },
        });
        console.log(`Role created: ADMIN`);
    }

    const existingAdmin = await prisma.user.findUnique({
        where: { email: adminEmail },
    });

    if (!existingAdmin) {
        await prisma.user.create({
            data: {
                email: adminEmail,
                password: hashedPassword,
                roles: {
                    connect: { name: 'ADMIN' },
                },
            },
        });

        console.log(`Admin user created: ${adminEmail}`);
    } else {
        console.log(`Admin user already exists: ${adminEmail}`);
    }
}

async function getCurrentUser(userId) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            include: {
                profile: true,
                roles: true, 
            },
        });

        if (!user) {
            throw new Error('User not found');
        }

        return user;
    } catch (error) {
        console.error('Error retrieving current user:', error);
        throw new Error('Could not get current user');
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
        await prisma.application.deleteMany({
            where: {
                userId: userId,
            },
        });

        await prisma.profile.deleteMany({
            where: {
                userId: userId,
            },
        });

        const deletedUser = await prisma.user.delete({
            where: {
                id: userId,
            },
            include: {
                profile: true,
            },
        });

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
    createAdminUser,
    getCurrentUser
}
