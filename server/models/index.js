'use strict'

const mongoose = require('mongoose');

const User = require('./user');
const Question = require('./question');

mongoose.connect(process.env.DB_HOST, { useMongoClient: true });
mongoose.Promise = global.Promise;

module.exports = { User, Question }