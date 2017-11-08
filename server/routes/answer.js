'use strict'

const express = require('express');
const controllers = require('./../controllers');
const verifyToken = require('./../middlewares/verify-token');

const router = express.Router();

router.post('/:questionid', verifyToken, controllers.Answer.create);

router.get('/:questionid', controllers.Answer.readQuestionAnswers);

router.put('/upvote/:id', verifyToken, controllers.Answer.upvote);

router.put('/downvote/:id', verifyToken, controllers.Answer.downvote);

router.delete('/:id', verifyToken, controllers.Answer.destroy);

module.exports = router;