const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    console.log('Middleware authenticateToken called');

    const authHeader = req.headers['authorization'];
    let token = authHeader && authHeader.split(' ')[1];

    // Vérifier si le token est présent dans l'en-tête Authorization
    if (!token) {
        token = req.cookies['token'];
        console.log('Token trouvé dans les cookies:', token);
    }

    // Si le token est toujours absent, renvoyer une erreur
    if (!token) {
        console.log('Token manquant');
        return res.status(401).json({ message: 'Token manquant' });
    }

    // Vérifier la validité du token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.log('Token invalide:', err.message);
            return res.status(403).json({ message: 'Token invalide' });
        }
        console.log('Token valide, utilisateur:', user);
        req.user = {
            userId: user.userId,
            roles: user.roles || []
        };

        next(); // Appeler la prochaine fonction middleware
    });
}

module.exports = authenticateToken;
