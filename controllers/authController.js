const authService = require('../services/authService');

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const { token, user } = await authService.loginUser(email, password);
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

module.exports = { loginUser };