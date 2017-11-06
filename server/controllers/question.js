'use strict'

const models = require('./../models');
const generateResponse = require('./../helpers/generate-response');

class Question {
  static create(req, res) {
    const question = {
      author: req.headers.user._id,
      title: req.body.title,
      text: req.body.text,
      tags: req.body.tags ? req.body.tags : [],
      upvote: [],
      downvote: []
    };

    models.Question.create(question)
    .then(questionCreated => {
      const resp = generateResponse(200, 'question created', questionCreated, null);
      res.status.send(resp);
    })
    .catch(err => {
      const resp = generateResponse(500, 'failed to create question', null, err);
      res.status(500).send(err);
    })
  }

  static read(req, res) {
    models.Question.findById(req.params.id).exec()
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
    models.Question.find().exec()
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
    const value = req.body;

    models.Question.updateOne(options, value).exec()
    .then(updated => {
      const resp = generateResponse(200, 'update question', updated, null);
      res.status(200).send(resp);
    })
    .catch(err => {
      const resp = generateResponse(500, 'failed to update question', null, err);
      res.status.send(resp);
    });
  }

  static vote(req, res) {
    const options = {_id: req.params.id};
    const votes = { upvote: req.body.upvote, downvote: req.body.downvote }

    models.Question.updateOne(options, value).exec()
    .then(updated => {
      const resp = generateResponse(200, 'update question vote', updated, null);
      res.status.send(resp);
    })
    .catch(err => {
      const resp = generateResponse(500, 'failed to update question vote', null, err);
      res.status.send(resp);
    })
  }

  static destroy(req, res) {
    models.Question.deleteOne({_id: req.params.id, author: req.headers.user._id})
    .then(destroyed => {
      const resp = generateResponse(200, 'question destroyed', destroyed, null);
      res.status(200).send(resp);
    })
    .catch(err => {
      const resp = generateResponse(500, 'failed to destroy question', null, err);
      res.status(500).send(resp);
    });
  }
}

module.exports = Question;