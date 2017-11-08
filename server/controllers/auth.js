'use strict'

const models = require('./../models');
const generateResponse = require('./../helpers/generate-response');
const generateJwtoken = require('./../helpers/generate-jwtoken');

class Auth {
  static signup(req, res) {
    const signupUser = { username: req.body.username, password: req.body.password };

    models.User.create(signupUser)
    .then(userCreated => {
      const jwtoken = generateJwtoken(userCreated);
      const payload = { _id: userCreated._id, username: userCreated.username, jwtoken: jwtoken };
      const resp = generateResponse(200, 'user created', payload, null);

      res.status(resp.status).send(resp);
    })
    .catch(err => {
      const resp = generateResponse(500, 'failed to create user', null, err);

      res.status(resp.status).send(resp);
    });
  }

  static signin(req, res) {
    const jwtoken = generateJwtoken(req.headers.user);
    const payload = { _id: req.headers.user._id, username: req.headers.user.username, jwtoken: jwtoken };
    const resp = generateResponse(200, 'user signed in', payload, null);

    res.status(resp.status).send(resp);
  }

  static verify(req, res) {
    const resp = generateResponse(200, 'verified', req.headers.user, null);
    res.status(200).send(resp);
  }
}

module.exports = Auth;