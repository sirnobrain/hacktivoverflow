'use strict'

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let questionSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true 
  },
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  tags: {
    type: [String]
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

module.exports = mongoose.model('Question', questionSchema);