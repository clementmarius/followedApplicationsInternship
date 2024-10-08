require('dotenv').config();
const express = require('express');
const app = express();

const timeout = require('connect-timeout'); 
const haltOnTimedout = require('../followedApplicationsInternship/src/middlewares/haltOnTimedout'); 

app.use(timeout('30s')); 
app.use(haltOnTimedout);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

app.use('/profile', require('../followedApplicationsInternship/src/routes/userRoutes'));
app.use('/job', require('../followedApplicationsInternship/src/routes/jobRoutes'));
app.use('/application', require('../followedApplicationsInternship/src/routes/applicationRoutes'));
app.use('/user', require('../followedApplicationsInternship/src/routes/authRoutes'));
app.use('/test', require('../followedApplicationsInternship/src/routes/testRoutes')); 

const port = 3000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);  
});
