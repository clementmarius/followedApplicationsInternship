require('dotenv').config();
const express = require('express');
const app = express();
const timeout = require('connect-timeout'); 
const haltOnTimedout = require('../back/src/middlewares/haltOnTimedout'); 
const cors = require("cors");
const cookieParser = require('cookie-parser'); 
const authenticateToken = require('../back/src/middlewares/authMiddleware');


const corsOption = {
    origin: ["http://localhost:5173"],
    credentials: true,
}

app.use(timeout('30s')); 
app.use(haltOnTimedout);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOption));
app.use(cookieParser()); 

app.use((req, res, next) => {
    console.log(`${req.method} request for ${req.url}`);
    next();
});

app.use('/user', require('../back/src/routes/authRoutes')); 

// Routes protégées - nécessitent l'authentification
app.use('/profile', authenticateToken, require('../back/src/routes/userRoutes'));
app.use('/job', authenticateToken, require('../back/src/routes/jobRoutes'));
app.use('/application', authenticateToken, require('../back/src/routes/applicationRoutes'));
app.use('/test', authenticateToken, require('../back/src/routes/testRoutes'));

const port = 3000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);  
});