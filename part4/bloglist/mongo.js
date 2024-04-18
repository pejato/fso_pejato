/* eslint-disable no-console */
const mongoose = require('mongoose');
const config = require('./utils/config');
const Blog = require('./models/blog');

const url = config.MONGODB_URI;

mongoose.set('strictQuery', false);

const deleteAll = async () => {
  const response = await Blog.deleteMany({});
  console.log(response);
};

const getAllAndPrint = async () => {
  const blogs = (await Blog.find({})).map((b) => b.toJSON());
  console.log(blogs);
};

const main = async () => {
  await mongoose.connect(url);
  await deleteAll();
  await mongoose.connection.close();
};

main()
  .then(() => console.log('executed successfully'))
  .catch((error) => console.log(`execution failed with error ${error}`));
