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
  await Blog.deleteOne({ _id: request.params.id });
  response.status(204).end();
});

router.patch('/:id', async (request, response) => {
  const schemaKeys = Blog.schema.paths;
  for (const key of Object.keys(request.body)) {
    if (!schemaKeys[key]) {
      return response.status(400).end();
    }
  }
  const result = await Blog.findByIdAndUpdate(request.params.id, request.body, {
    new: true,
  });
  return response.json(result);
});

router.put('/:id', async (request, response) => {
  const update = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes || 0,
  };
  const result = await Blog.findByIdAndUpdate(request.params.id, update, {
    new: true,
  });
  response.json(result);
});

module.exports = router;
