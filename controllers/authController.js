const authService = require('../services/authService');
const jwt = require('jsonwebtoken');

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
    
    console.log('LogOutUser - Authorization header:', authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log('LogOutUser - Token manquant ou mal formé');
        return res.status(400).json({ message: 'Token manquant ou mal formé' });
    }

    const token = authHeader.split(' ')[1];
    console.log('LogOutUser - Token:', token);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('LogOutUser - Token décodé:', decoded);

        // Ajouter le token à la liste noire
        await prisma.blacklistedToken.create({
            data: {
                token,
                expiresAt: new Date(decoded.exp * 1000) // expiration du token
            }
        });

        console.log('LogOutUser - Token ajouté à la liste noire:', token);
        res.status(200).json({ message: 'Déconnexion réussie' });

    } catch (error) {
        console.error('LogOutUser - Erreur lors de la vérification du token:', error.message);
        res.status(400).json({ message: 'Token invalide' });
    }
};

module.exports = {
    loginUser,
    logOutUser
};