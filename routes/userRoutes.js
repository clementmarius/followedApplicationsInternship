const express = require('express');

const userController = require('../controllers/userController');

const router = express.Router();

router.post('/createUser',userController.createUser);
router.get('/:id/getUserById',userController.findUserById);
router.get('/getAllUsersId', userController.findAllUserById);
router.put('/updateUser', userController.updateUser);

module.exports = router;