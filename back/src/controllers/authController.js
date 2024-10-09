const authService = require('../services/authService');

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const { token, user } = await authService.loginUserService(email, password);
        res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            }
        });
        console.log(`User ${user.email} logged in successfully.`);

    } catch (error) {
        console.error('Login error:', error);
        res.status(401).json({ message: error.message });
    }
};

const logOutUser = async (req, res) => {
    const authHeader = req.headers.authorization;
    console.log('LogOutUser - Authorization header:', authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log('LogOutUser - Token missing or malformed');
        return res.status(400).json({ message: 'Token missing or malformed' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const result = await authService.logOutUserService(token);
        console.log('LogOutUser - Token blacklisted:', token);
        res.status(200).json(result);
    } catch (error) {
        console.error('LogOutUser - Error during token verification:', error.message);
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    loginUser,
    logOutUser
};