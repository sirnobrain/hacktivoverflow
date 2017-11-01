'use strict'

const express = require('express');
const controllers = require('./../controllers');

const router = express.Router();

router.post('/signup', controllers.Auth.signup);

router.post('/signin', controllers.Auth.signin);

module.exports = router;