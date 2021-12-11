const express = require('express');
const routing = express.Router();
userController = require('../Controller/user');

// USER controller
routing.post('/user', userController.createUser);
//routing.get('/user', userController.getUsers);

module.exports = routing;
