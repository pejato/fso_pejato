const mongoose = require('mongoose');
const { dontSerializeMongoPrivateFields } = require('./modelsUtils');

const commentSchema = new mongoose.Schema({
  id: String,
  text: { type: String, required: true },
  blog: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: 'Blog',
  },
});

dontSerializeMongoPrivateFields(commentSchema);
const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
