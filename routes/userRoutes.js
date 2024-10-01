const express = require('express');

const userController = require('../controllers/userController');

const router = express.Router();

router.post('/createUser',userController.createUser);
router.get('/:id/getUserById',userController.findUserById);

module.exports = router;