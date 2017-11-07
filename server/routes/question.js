'use strict'

const express = require('express');
const controllers = require('./../controllers');
const verifyToken = require('./../middlewares/verify-token');

const router = express.Router();

router.post('/', verifyToken, controllers.Question.create);

router.get('/', controllers.Question.readAll);

router.get('/:id', controllers.Question.read);

router.put('/:id', verifyToken, controllers.Question.update);

router.put('/upvote/:id', verifyToken, controllers.Question.upvote);

router.put('/downvote/:id', verifyToken, controllers.Question.downvote);

router.delete('/:id', verifyToken, controllers.Question.destroy);

module.exports = router;