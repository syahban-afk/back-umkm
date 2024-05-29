const express = require('express');
const router = express.Router();

const { 
    register,
    login,
    me,
    logout,
    average,
    statistics } = require('../Controllers/authControllerAdmins');
const authentication = require('../Middleware/authenticationAdmins');

// Routes
router.post('/register', register);
router.post('/login', login);
router.get('/me', authentication, me);
router.post('/logout', logout);
router.get('/average', average);
router.get('/statistics', statistics);

module.exports = router;