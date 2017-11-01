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
      const payload = { username: userCreated.username, jwtoken: jwtoken };
      const resp = generateResponse(200, 'user created', payload, null);

      res.status(resp.status).send(resp);
    })
    .catch(err => {
      const resp = generateResponse(500, 'failed to create user', null, err);

      res.status(resp.status).send(resp);
    });
  }

  static signin(req, res) {}
}

module.exports = Auth;