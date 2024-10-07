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

const logOutUser = async (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(400).json({ message: 'Token manquant ou mal formé' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        await prisma.blacklistedToken.create({
            data: {
                token,
                expiresAt: new Date(decoded.exp * 1000)
            }
        });

        res.status(200).json({ message: 'Déconnexion réussie' });
    } catch (error) {
        res.status(400).json({ message: 'Token invalide' });
    }
};

module.exports = {
    loginUser,
    logOutUser
};