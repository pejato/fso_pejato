/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');
const { dontSerializeMongoPrivateFields } = require('./modelsUtils');

const blogSchema = new mongoose.Schema({
  id: String,
  title: {
    type: String,
    required: true,
  },
  author: String,
  url: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Comment',
    },
  ],
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
  },
});

dontSerializeMongoPrivateFields(blogSchema);

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
