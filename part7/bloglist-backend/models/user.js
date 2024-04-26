/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');
const { dontSerializeMongoPrivateFields } = require('./modelsUtils');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: String,
  passwordHash: String,
  id: String,
  blogs: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Blog',
    },
  ],
});

dontSerializeMongoPrivateFields(userSchema, ['passwordHash']);

const User = mongoose.model('User', userSchema);

module.exports = User;
