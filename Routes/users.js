const express = require('express');
const router = express.Router();

const { register, login, me, logout } = require('../Controllers/authControllerUsers');
const authentication = require('../Middleware/authenticationUsers');

// Routes
router.post('/register', register);
router.post('/login', login);
router.get('/me', authentication, me);
router.post('/logout', logout);

module.exports = router;