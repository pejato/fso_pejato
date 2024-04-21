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
  userExtractor,
} = require('./utils/middleware');

const app = express();

mongoose.connect(MONGODB_URI);

app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV === 'test') {
  // eslint-disable-next-line global-require
  const testRouter = require('./controllers/testing');
  app.use('/api/testing', testRouter);
}
app.post('/api/blogs', [tokenExtractor, userExtractor]);
app.delete('/api/blogs/:id', [tokenExtractor, userExtractor]);
app.put('/api/blogs/:id', [tokenExtractor, userExtractor]);
app.patch('/api/blogs/:id', [tokenExtractor, userExtractor]);

app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
