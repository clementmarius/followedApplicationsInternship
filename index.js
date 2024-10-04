require('dotenv').config();
const express = require('express');

const app = express();

const timeout = require('connect-timeout'); 

app.use(timeout('30s')); 
app.use(haltOnTimedout);

function haltOnTimedout(req, res, next) {
    if (!req.timedout) next();
}

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

app.use('/profile', require('./routes/userRoutes'));
app.use('/job', require('./routes/jobRoutes'));
app.use('/application', require('./routes/applicationRoutes'));
app.use('/login', require('./routes/authRoutes'));


const port = 3000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);  
});
