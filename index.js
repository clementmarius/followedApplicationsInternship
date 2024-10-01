const express = require('express');

const app = express();

// Middleware pour analyser les données des formulaires (si nécessaire)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware pour logger les requêtes
app.use((req, res, next) => {
    console.log(`${req.method} request for ${req.url}`);
    next();
});

app.get('/', (req, res) => {
    res.send('Hello World');  
});

app.post('/submit-form', (req, res) => {
    res.send('Form submitted');
});

// Utilisation des routes pour le profil
app.use('/profile', require('./routes/userRoutes'));

const port = 3000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);  
});
