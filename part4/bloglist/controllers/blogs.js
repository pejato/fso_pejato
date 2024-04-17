const router = require('express').Router();
const Blog = require('../models/blog');

router.get('/', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

router.post('/', (request, response) => {
  const blog = new Blog(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

router.delete('/:id', (request, response) => {
  Blog.findOneAndDelete(request.params.id).then((blog) => {
    response.json(blog);
  });
});

module.exports = router;
