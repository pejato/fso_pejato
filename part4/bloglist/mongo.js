/* eslint-disable no-console */
const mongoose = require('mongoose');
const config = require('./utils/config');
const Blog = require('./models/blog');
const User = require('./models/user');

const url = config.MONGODB_URI;

mongoose.set('strictQuery', false);

const deleteAllBlogs = async () => {
  const response = await Blog.deleteMany({});
  console.log(response);
};

const deleteAllUsers = async () => {
  const response = await User.deleteMany({});
  console.log(response);
};

const getAllBlogsAndPrint = async () => {
  const blogs = (await Blog.find({})).map((b) => b.toJSON());
  console.log(blogs);
};

const helper = require('./tests/api_test_helper');

const main = async () => {
  await mongoose.connect(url);
  await deleteAllBlogs();
  await mongoose.connection.close();
};

main()
  .then(() => console.log('executed successfully'))
  .catch((error) => console.log(`execution failed with error ${error}`));
