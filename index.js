require('dotenv').config();
const express = require('express');
const app = express();

const timeout = require('connect-timeout'); 
const haltOnTimedout = require('./middlewares/haltOnTimedout'); 

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

app.use('/profile', require('./routes/userRoutes'));
app.use('/job', require('./routes/jobRoutes'));
app.use('/application', require('./routes/applicationRoutes'));
app.use('/user', require('./routes/authRoutes'));
app.use('/test', require('./routes/testRoutes')); 

const port = 3000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);  
});
