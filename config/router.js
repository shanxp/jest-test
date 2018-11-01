const express = require('express');
const router = express.Router();

const auth = require('./auth');
const controllers = require('../controllers');

// User routes
router.get('/', controllers.UserController.home);
router.get('/token', controllers.UserController.token);

router.get('/secure', auth, controllers.UserController.secure);
router.get('/login', auth, controllers.UserController.login);

router.post('/login', auth, controllers.UserController.login);
router.get('/logout', controllers.UserController.logout);
// router.get('/error', controllers.UserController.error);

// Error routes
router.all('*', controllers.ErrorController.e503);

module.exports = router;
