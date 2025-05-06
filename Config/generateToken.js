const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (user) => {
    return jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

module.exports = generateToken;