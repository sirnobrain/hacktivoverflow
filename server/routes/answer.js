'use strict'

const express = require('express');
const controllers = require('./../controllers');
const verifyToken = require('./../middlewares/verify-token');

const router = express.Router();

router.post('/:questionid', controllers.Answer.create);

router.get('/:questionid', controllers.Answer.readQuestionAnswers);

router.put('/:id', controllers.Answer.vote);

router.delete('/:id', controllers.Answer.destroy);

module.exports = router;