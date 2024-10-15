require('dotenv').config();
const express = require('express');
const app = express();
const timeout = require('connect-timeout'); 
const haltOnTimedout = require('../back/src/middlewares/haltOnTimedout'); 
const cors = require("cors");
const corsOption = {
    origin: ["http://localhost:5173"]
}

app.use(timeout('30s')); 
app.use(haltOnTimedout);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOption));

app.use((req, res, next) => {
    console.log(`${req.method} request for ${req.url}`);
    next();
});


/* app.post('/submit-form', (req, res) => {
    res.send('Form submitted');
}); */


app.use('/profile', require('../back/src/routes/userRoutes'));
app.use('/job', require('../back/src/routes/jobRoutes'));
app.use('/application', require('../back/src/routes/applicationRoutes'));
app.use('/user', require('../back/src/routes/authRoutes'));
app.use('/test', require('../back/src/routes/testRoutes')); 

const port = 3000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);  
});