const prisma = require('../libs/prisma');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const loginUser = async (email, password) => {

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

    return token;
};

module.exports = { loginUser };