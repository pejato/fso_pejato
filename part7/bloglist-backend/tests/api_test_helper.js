const mongoose = require('mongoose');
const Blog = require('../models/blog');
const User = require('../models/user');

const initialBlogs = [
  {
    title: 'HTML is easy',
    author: 'Bertrand Russell',
    url: 'google.com',
    likes: 5000,
    _id: new mongoose.Types.ObjectId('66202853e89206cbd9cfe577'),
    user: new mongoose.Types.ObjectId('66202853e89206cbd9cfe579'),
  },
  {
    title: 'CSS is hard',
    author: 'Vincent van Gogh',
    url: 'bing.com',
    likes: 9001,
    _id: new mongoose.Types.ObjectId('66202853e89206cbd9cfe578'),
    user: new mongoose.Types.ObjectId('66202853e89206cbd9cfe579'),
  },
];

const testAuthValue =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImtpbGxlcjAwNyIsImlkIjoiNjYyMDI4NTNlODkyMDZjYmQ5Y2ZlNTc5IiwiaWF0IjoxNzEzNDY1NTA4fQ.y__Wqv1TMvVGNwZL-ojJDtzCcTd7zdetvR9kA4GX1a4';
const initialUsers = [
  {
    username: 'killer007',
    name: 'The Killers',
    passwordHash: 'a',
    _id: new mongoose.Types.ObjectId('66202853e89206cbd9cfe579'),
  },
  {
    username: 'queenie',
    name: 'Queen',
    passwordHash: 'b',
    _id: new mongoose.Types.ObjectId('66202853e89206cbd9cfe580'),
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
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({}).populate('blogs', { user: 0 });
  return users.map((u) => u.toJSON());
};

module.exports = {
  initialBlogs,
  initialUsers,
  nonExistingId,
  blogsInDb,
  usersInDb,
  testAuthValue,
};
