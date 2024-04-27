const mongoose = require('mongoose');
const Blog = require('../models/blog');
const User = require('../models/user');
const Comment = require('../models/comment');

const initialBlogs = [
  {
    title: 'HTML is easy',
    author: 'Bertrand Russell',
    url: 'google.com',
    likes: 5000,
    _id: new mongoose.Types.ObjectId('66202853e89206cbd9cfe577'),
    user: new mongoose.Types.ObjectId('66202853e89206cbd9cfe579'),
    comments: [
      {
        _id: new mongoose.Types.ObjectId('67202853e89206cbd9cfe580'),
        text: 'wolf',
        blog: new mongoose.Types.ObjectId('66202853e89206cbd9cfe577'),
      },
    ],
  },
  {
    title: 'CSS is hard',
    author: 'Vincent van Gogh',
    url: 'bing.com',
    likes: 9001,
    _id: new mongoose.Types.ObjectId('66202853e89206cbd9cfe578'),
    user: new mongoose.Types.ObjectId('66202853e89206cbd9cfe579'),
    comments: [],
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

const initialComments = initialBlogs.reduce((comments, blog) => {
  return comments.concat(blog.comments);
}, []);

const nonExistingId = async () => {
  const note = new Blog({ content: 'willremovethissoon' });
  await note.save();
  await note.deleteOne();

  // eslint-disable-next-line no-underscore-dangle
  return note._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1 })
    .populate('comments', { text: 1 });
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({}).populate('blogs', { user: 0 });
  return users.map((u) => u.toJSON());
};

const commentsInDb = async () => {
  const comments = await Comment.find({}).populate('blog', { comments: 0 });
  return comments.map((c) => c.toJSON());
};

module.exports = {
  initialBlogs,
  initialUsers,
  initialComments,
  nonExistingId,
  blogsInDb,
  usersInDb,
  commentsInDb,
  testAuthValue,
};
