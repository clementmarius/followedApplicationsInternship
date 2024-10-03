const jwt = require('jsonwebtoken');

async function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 

    if (!token) return res.status(401).json({ message: 'Token manquant' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Token invalide' });
        req.user = user; 
    });
}

module.exports = authenticateToken;