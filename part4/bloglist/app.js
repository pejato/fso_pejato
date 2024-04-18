const express = require('express');
require('express-async-errors');
const cors = require('cors');
const mongoose = require('mongoose');
const { MONGODB_URI } = require('./utils/config');
const blogRouter = require('./controllers/blogs');
const userRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const {
  errorHandler,
  unknownEndpoint,
  tokenExtractor,
} = require('./utils/middleware');

const app = express();

mongoose.connect(MONGODB_URI);

app.use(cors());
app.use(express.json());
app.use(tokenExtractor);

app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
