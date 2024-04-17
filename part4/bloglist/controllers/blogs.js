const router = require('express').Router();
const Blog = require('../models/blog');

router.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

router.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  response.json(blog);
});

router.post('/', async (request, response) => {
  if (!request.body.title) {
    return response.status(400).end();
  }
  if (!request.body.url) {
    return response.status(400).end();
  }
  const blog = new Blog(request.body);

  const result = await blog.save();
  return response.status(201).json(result);
});

router.delete('/:id', async (request, response) => {
  const blog = await Blog.findOneAndDelete(request.params.id);
  response.json(blog);
});

module.exports = router;
