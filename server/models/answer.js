'use strict'

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let answerSchema = new Schema({
  question: {
    type: Schema.Types.ObjectId,
    ref: 'Question',
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  text: {
    type: String,
    required: true
  },
  upvote: {
    type: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  },
  downvote: {
    type: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  }
},
{
  timestamps: true
});

module.exports = mongoose.model('Answer', answerSchema);