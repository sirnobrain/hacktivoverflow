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
      res.status(200).send(resp);
    })
    .catch(err => {
      const resp = generateResponse(500, 'failed to create answer', null, err);
      res.status(500).send(err);
    })
  }

  static readQuestionAnswers(req, res) {
    models.Answer.find({question: req.params.questionid}).populate('author').exec()
    .then(answers => {
      const resp = generateResponse(200, 'read all answers', answers, null);
      res.status(200).send(resp);
    })
    .catch(err => {
      const resp = generateResponse(500, 'failed to read answers', null, err);
      res.status(500).send(resp);
    });
  }

  static upvote(req, res) {
    let updatedAnswer;

    models.Answer.findById(req.params.id)
    .then(answer => {
      if (!answer) return Promise.reject('no such answer');
      if (answer.upvote.indexOf(req.headers.user._id) !== -1) return Promise.reject('you may not upvote twice');
      if (answer.downvote.indexOf(req.headers.user._id !== -1)) answer.downvote.splice(answer.downvote.indexOf(req.headers.user._id), 1);

      answer.upvote.push(req.headers.user._id)
      updatedAnswer = answer
      return models.Answer.updateOne({_id: answer._id}, answer)
    })
    .then(updated => {
      const resp = generateResponse(200, 'update answer vote', updatedAnswer, null);
      res.status(200).send(resp);
    })
    .catch(err => {
      const resp = generateResponse(500, 'failed to update answer vote', null, err);
      res.status(200).send(resp);
    })
  }

  static downvote(req, res) {
    let updatedAnswer;

    models.Answer.findById(req.params.id)
    .then(answer => {
      if (!answer) return Promise.reject('no such answer');
      if (answer.downvote.indexOf(req.headers.user._id) !== -1) return Promise.reject('you may not downvote twice');
      if (answer.upvote.indexOf(req.headers.user._id !== -1)) answer.upvote.splice(answer.upvote.indexOf(req.headers.user._id), 1);

      answer.downvote.push(req.headers.user._id)
      updatedAnswer = answer
      return models.Answer.updateOne({_id: answer._id}, answer)
    })
    .then(updated => {
      const resp = generateResponse(200, 'update answer vote', updatedAnswer, null);
      res.status(200).send(resp);
    })
    .catch(err => {
      const resp = generateResponse(500, 'failed to update answer vote', null, err);
      res.status(200).send(resp);
    })
  }

  static destroy(req, res) {
    models.Answer.deleteOne({_id: req.params.id, author: req.headers.user._id})
    .then(destroyed => {
      if (destroyed.result.n === 0) return Promise.reject('no answer with current user as the author found');
      destroyed.result._id = req.params.id;
      const resp = generateResponse(200, 'answer destroyed', destroyed.result, null);
      res.status(200).send(resp);
    })
    .catch(err => {
      const resp = generateResponse(500, 'failed to destroy answer', null, err);
      res.status(500).send(resp);
    });
  }
}

module.exports = Answer;