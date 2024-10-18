const express = require('express');

const userController = require('../controllers/userController');
const authenticateToken = require('../middlewares/authMiddleware');


const router = express.Router();

router.post('/createUser',userController.createUser);
router.post('/initialize-admin', userController.initializeAdminUser);
router.get('/:id/getUserById',userController.findUserById);
router.get('/getAllUsersId', userController.findAllUserById);
router.put('/updateUser', userController.updateUser);
router.delete('/:id/deleteUser',userController.removeUser);
router.get('/yes', (req, res) =>{console.log('salut');
})


/* router.get('/me', authenticateToken ,userController.getCurrentUser);
 */
router.get('/me', authenticateToken, (req, res) => {
    res.json(req.user); 
});

module.exports = router;