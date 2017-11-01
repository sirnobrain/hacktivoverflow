'use strict'

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema;

let userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
},
{
  timestamps: true
});

userSchema.pre('save', function(next) {
  bcrypt.hash(this.password, 10)
  .then(hashedPassword => {
    this.password = hashedPassword;
    next();
  })
  .catch(err => {
    next(err);
  });
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);