const prisma = require('../libs/prisma');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const loginUserService = async (email, password) => {

    const user = await prisma.user.findUnique({
        where: { email }
    });

    if (!user) {
        throw new Error('User not found');
    }


    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }


    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return { token, user };
};

const logOutUserService = async (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        await prisma.blacklistedToken.create({
            data: {
                token,
                expiresAt: new Date(decoded.exp * 1000)
            }
        });

        return { message: 'Logout successful' };
    } catch (error) {
        throw new Error('Invalid token');
    }
};

module.exports = {
    loginUserService,
    logOutUserService
};