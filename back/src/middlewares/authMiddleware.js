const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    console.log('Middleware authenticateToken appelé');
    
    const authHeader = req.headers['authorization'];
    console.log('Authorization Header:', authHeader);

    const token = authHeader && authHeader.split(' ')[1]; 

    if (!token) {
        console.log('Token manquant');
        return res.status(401).json({ message: 'Token manquant' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.log('Token invalide:', err.message);
            return res.status(403).json({ message: 'Token invalide' });
        }
        console.log('Token valide, utilisateur:', user);
        req.user = {
            userId: user.userId, // Assurez-vous que l'ID de l'utilisateur est bien récupéré
            roles: user.roles || [] // Définit un tableau vide si roles est undefined
        };
 
        next(); 
    });
}

module.exports = authenticateToken;
