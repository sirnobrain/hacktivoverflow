'use strict'

const express = require('express');
const controllers = require('./../controllers');
const verifyToken = require('./../middlewares/verify-token');
const verifyUser = require('./../middlewares/verify-user');

const router = express.Router();

router.post('/signup', controllers.Auth.signup);

router.post('/signin', verifyUser, controllers.Auth.signin);

router.get('/verify', verifyToken, controllers.Auth.verify);

module.exports = router;