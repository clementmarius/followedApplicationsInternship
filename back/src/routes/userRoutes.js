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


router.get('/me', authenticateToken ,userController.getCurrentUser);

module.exports = router;