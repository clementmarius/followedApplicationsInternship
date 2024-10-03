const authService = require('../services/authService');

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await authService.loginUser(email, password);
        res.json({ token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(401).json({ message: error.message });
    }
};

module.exports = { loginUser };