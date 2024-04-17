const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { PORT, MONGODB_URI } = require('./utils/config');

const app = express();

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

const Blog = mongoose.model('Blog', blogSchema);

mongoose.connect(MONGODB_URI);

app.use(cors());
app.use(express.json());

app.delete('/api/blogs/:id', (request, response) => {
  Blog.findOneAndDelete(request.params.id).then((blog) => {
    response.json(blog);
  });
});

app.get('/api/blogs', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
