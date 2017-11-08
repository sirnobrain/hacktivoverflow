'use strict'

const models = require('./../models');
const generateResponse = require('./../helpers/generate-response');

class Question {
  static create(req, res) {
    const question = {
      author: req.headers.user._id,
      title: req.body.title,
      text: req.body.text,
      tags: req.body.tags ? req.body.tags.split(';') : [],
      upvote: [],
      downvote: []
    };

    models.Question.create(question)
    .then(questionCreated => {
      const resp = generateResponse(200, 'question created', questionCreated, null);
      res.status(200).send(resp);
    })
    .catch(err => {
      const resp = generateResponse(500, 'failed to create question', null, err);
      res.status(500).send(err);
    })
  }

  static read(req, res) {
    models.Question.findById(req.params.id).populate('author').exec()
    .then(question => {
      const resp = generateResponse(200, 'read question', question, null);
      res.status(200).send(resp);
    })
    .catch(err => {
      const resp = generateResponse(500, 'failed to read question', null, err);
      res.status(500).send(resp);
    });
  }

  static readAll(req, res) {
    models.Question.find().populate('author').exec()
    .then(questions => {
      const resp = generateResponse(200, 'read all questions', questions, null);
      res.status(200).send(resp);
    })
    .catch(err => {
      const resp = generateResponse(500, 'failed to read questions', null, err);
      res.status(500).send(resp);
    });
  }

  static update(req, res) {
    const options = {_id: req.params.id, author: req.headers.user._id};
    let value = req.body;

    value.tags ? value.tags = value.tags.split(';') : value.tags = [],

    models.Question.updateOne(options, value).exec()
    .then(updated => {
      if (updated.n === 0) return Promise.reject('no question with current user as the author found');
      return models.Question.findById(req.params.id);
    })
    .then(updatedQuestion => {
      const resp = generateResponse(200, 'update question', updatedQuestion, null);
      res.status(200).send(resp);
    })
    .catch(err => {
      const resp = generateResponse(500, 'failed to update question', null, err);
      res.status(200).send(resp);
    });
  }

  static upvote(req, res) {
    let updatedQuestion;

    models.Question.findById(req.params.id)
    .then(question => {
      if (!question) return Promise.reject('no such question');
      if (question.upvote.indexOf(req.headers.user._id) !== -1) return Promise.reject('you may not upvote twice');
      if (question.downvote.indexOf(req.headers.user._id !== -1)) question.downvote.splice(question.downvote.indexOf(req.headers.user._id), 1);

      question.upvote.push(req.headers.user._id)
      updatedQuestion = question
      return models.Question.updateOne({_id: question._id}, question)
    })
    .then(updated => {
      const resp = generateResponse(200, 'update question vote', updatedQuestion, null);
      res.status(200).send(resp);
    })
    .catch(err => {
      const resp = generateResponse(500, 'failed to update question vote', null, err);
      res.status(200).send(resp);
    })
  }

  static downvote(req, res) {
    let updatedQuestion;

    models.Question.findById(req.params.id)
    .then(question => {
      if (!question) return Promise.reject('no such question');
      if (question.downvote.indexOf(req.headers.user._id) !== -1) return Promise.reject('you may not downvote twice');
      if (question.upvote.indexOf(req.headers.user._id !== -1)) question.upvote.splice(question.upvote.indexOf(req.headers.user._id), 1);
      
      question.downvote.push(req.headers.user._id)
      updatedQuestion = question
      return models.Question.updateOne({_id: question._id}, question)
    })
    .then(updated => {
      const resp = generateResponse(200, 'update question vote', updatedQuestion, null);
      res.status(200).send(resp);
    })
    .catch(err => {
      const resp = generateResponse(500, 'failed to update question vote', null, err);
      res.status(200).send(resp);
    })
  }

  static destroy(req, res) {
    Promise.all([models.Question.deleteOne({_id: req.params.id, author: req.headers.user._id}), models.Answer.deleteMany({question: req.params.id})])
    .then(vals => {
      let destroyed = vals[0];
      if (destroyed.result.n === 0) return Promise.reject('no question with current user as the author found');
      destroyed.result._id = req.params.id
      const resp = generateResponse(200, 'question destroyed', destroyed.result, null);
      res.status(200).send(resp);
    })
    .catch(err => {
      const resp = generateResponse(500, 'failed to destroy question', null, err);
      res.status(500).send(resp);
    });
  }
}

module.exports = Question;