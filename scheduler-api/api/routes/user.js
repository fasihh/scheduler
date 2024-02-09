const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user');

// user log in
router.post('/signup', UserController.createUser);

// create new user
router.post('/signin', UserController.loginUser);

module.exports = router;