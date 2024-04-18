const router = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

const userPopConfig = { username: 1, name: 1 };

router.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', userPopConfig);
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
  const anyUser = await User.findOne();
  const blog = new Blog({ user: anyUser._id, ...request.body });

  const savedBlog = await blog.save();
  anyUser.blogs = anyUser.blogs.concat(savedBlog._id);
  await anyUser.save();
  return response
    .status(201)
    .json(await savedBlog.populate('user', userPopConfig));
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
