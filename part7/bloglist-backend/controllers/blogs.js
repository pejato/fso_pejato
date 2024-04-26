const router = require('express').Router();
const Blog = require('../models/blog');

const userPopConfig = { username: 1, name: 1 };

// MARK: - GET

router.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', userPopConfig);
  response.json(blogs);
});

router.get('/basic_view', async (request, response) => {
  const blogs = await Blog.find({}, { author: 1, title: 1 });
  response.json(blogs);
});

router.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate(
    'user',
    userPopConfig,
  );
  response.json(blog);
});

// MARK: - POST

router.post('/', async (request, response) => {
  if (!request.body.title) {
    return response.status(400).json({ error: 'Blog must have a title' }).end();
  }
  if (!request.body.url) {
    return response.status(400).end({ error: 'Blog must have an url' });
  }

  const { user } = request;
  const blog = new Blog({ user: user._id, ...request.body });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  return response
    .status(201)
    .json(await savedBlog.populate('user', userPopConfig));
});

// MARK: - DELETE

router.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (!blog) {
    return response.status(204).end();
  }
  if (request.user._id.toString() !== blog.user.toString()) {
    return response.status(401).json({ error: 'invalid token' });
  }

  await blog.deleteOne();
  return response.status(204).end();
});

// MARK: - PATCH

router.patch('/:id', async (request, response) => {
  const schemaKeys = Blog.schema.paths;
  for (const key of Object.keys(request.body)) {
    if (!schemaKeys[key]) {
      return response.status(400).end();
    }
  }
  const result = await Blog.findByIdAndUpdate(request.params.id, request.body, {
    new: true,
  }).populate('user', userPopConfig);
  return response.json(result);
});

// MARK: - PUT

router.put('/:id', async (request, response) => {
  const update = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes || 0,
  };
  const result = await Blog.findByIdAndUpdate(request.params.id, update, {
    new: true,
  }).populate('user', userPopConfig);
  response.json(result);
});

module.exports = router;
