const jwt = require('jsonwebtoken');
require('dotenv').config();

const user = {
    userId: 8, 
    email: 'test11@example.com' ,
    roles: ['USER', 'ADMIN']
};

if (!process.env.JWT_SECRET) {
    console.error('Erreur : La variable d\'environnement JWT_SECRET n\'est pas définie.');
    process.exit(1); 
}

const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });

console.log('Token JWT généré :', token);
