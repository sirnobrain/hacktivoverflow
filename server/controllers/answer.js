'use strict'

const models = require('./../models');
const generateResponse = require('./../helpers/generate-response');

class Answer {
  static create(req, res) {
    const answer = {
      author: req.headers.user._id,
      question: req.params.questionid,
      text: req.body.text,
      upvote: [],
      downvote: []
    };

    models.Answer.create(answer)
    .then(answerCreated => {
      const resp = generateResponse(200, 'answer created', answerCreated, null);
      res.status.send(resp);
    })
    .catch(err => {
      const resp = generateResponse(500, 'failed to create answer', null, err);
      res.status(500).send(err);
    })
  }

  static readQuestionAnswers(req, res) {
    models.Answer.find({question: req.params.questionid}).exec()
    .then(questions => {
      const resp = generateResponse(200, 'read all questions', questions, null);
      res.status(200).send(resp);
    })
    .catch(err => {
      const resp = generateResponse(500, 'failed to read questions', null, err);
      res.status(500).send(resp);
    });
  }

  static vote(req, res) {
    const options = {_id: req.params.id};
    const votes = { upvote: req.body.upvote, downvote: req.body.downvote }

    models.Answer.updateOne(options, value).exec()
    .then(updated => {
      const resp = generateResponse(200, 'update answer vote', updated, null);
      res.status.send(resp);
    })
    .catch(err => {
      const resp = generateResponse(500, 'failed to update answer vote', null, err);
      res.status.send(resp);
    })
  }

  static destroy(req, res) {
    models.Answer.deleteOne({_id: req.params.id, author: req.headers.user._id})
    .then(destroyed => {
      const resp = generateResponse(200, 'answer destroyed', destroyed, null);
      res.status(200).send(resp);
    })
    .catch(err => {
      const resp = generateResponse(500, 'failed to destroy answer', null, err);
      res.status(500).send(resp);
    });
  }
}

module.exports = Answer;