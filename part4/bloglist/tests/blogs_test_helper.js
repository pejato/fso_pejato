const Blog = require('../models/blog');

const initialBlogs = [
  {
    title: 'HTML is easy',
    author: 'Bertrand Russell',
    url: 'google.com',
    likes: 5000,
    id: '66202853e89206cbd9cfe577',
  },
  {
    title: 'CSS is hard',
    author: 'Vincent van Gogh',
    url: 'bing.com',
    likes: 9001,
    id: '66202853e89206cbd9cfe578',
  },
];

const nonExistingId = async () => {
  const note = new Blog({ content: 'willremovethissoon' });
  await note.save();
  await note.deleteOne();

  // eslint-disable-next-line no-underscore-dangle
  return note._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
};
