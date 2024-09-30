const prisma = require('../libs/prisma');
const bcrypt = require('bcrypt');
const { sendEmail: brevoSendEmail } = require('../brevo');
const { email } = require('../config');

async function createUserProfile(userData, ProfileData) {
    try {

        const hashedPassword = await bcrypt.hash(userData.password, 10);

        const newUser = await prisma.user.create({
            data: {
                email: userData.email,
                password: hashedPassword,
                profile: {
                    create:{
                        firstName: ProfileData.firstName,
                        lastName: ProfileData.lastName,
                    },
                },
            },
        });

        return newUser;

    } catch (error) {
        console.error('Error creating user profile:', error);
        throw new Error('Could not create user profile');
    }
}
