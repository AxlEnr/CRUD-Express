
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json('respond with a resource');
});

module.exports = router;

const express = require('express');
const UserController = require('../controllers/userController');

const router = express.Router();
const controller = new UserController();

router.get('/', controller.getUsers.bind(controller));

module.exports = router;

