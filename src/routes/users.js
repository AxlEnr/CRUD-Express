const express = require('express');
const UserController = require('../controllers/userController');

const router = express.Router();
const controller = new UserController();

router.get('/', controller.getUsers.bind(controller));

module.exports = router;