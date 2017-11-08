'use strict'

const bcrypt = require('bcrypt');
const models = require('./../models');
const generateResponse = require('./../helpers/generate-response');

module.exports = (req, res, next) => {
  let signinUser = null;
  models.User.findOne({ username: req.body.username }).exec()
  .then(user => {
    if (user) {
      signinUser = user;
      return bcrypt.compare(req.body.password, user.password);
    } else {
      return Promise.reject('user not found');
    }
  })
  .then(isPasswordValid => {
    if (isPasswordValid) {
      req.headers.user = { _id: signinUser._id, username: signinUser.username };
      next();
    } else {
      return Promise.reject('wrong password');
    }
  })
  .catch(err => {
    if (err === 'user not found') {
      const resp = generateResponse(401, 'user not found', null, 'Authentication Error');
      res.status(resp.status).send(resp);
    } else if (err === 'wrong password') {
      const resp = generateResponse(422, 'wrong password', null, 'Authentication Error');
      res.status(resp.status).send(resp);
    } else {
      const resp = generateResponse(500, 'error when verifying user', null, err);
      res.status(resp.status).send(resp);
    }
  });
};