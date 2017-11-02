'use strict'

const jwt = require('jsonwebtoken');
const generateResponse = require('./../helpers/generate-response');

module.exports = (req, res, next) => {
  if (req.headers.jwtoken) {
    const user = jwt.verify(req.headers.jwtoken, process.env.JWT_SECRET_KEY, (err, user) => {
      if (!err && user._id && user.username) {
        req.headers.user = user;
        next();
      } else if (err) {
        const resp = generateResponse(422, 'invalid token', null, err);
        res.status(resp.status).send(err);
      }
    });
  } else {
    const resp = generateResponse(401, 'have not signed up/signed in', null, 'Authentication error');
    res.status(resp.status).send(resp);
  }
};