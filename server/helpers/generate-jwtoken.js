'use strict'
const jwt = require('jsonwebtoken');

module.exports = user => jwt.sign({_id: user._id, username: user.username}, process.env.JWT_SECRET_KEY);