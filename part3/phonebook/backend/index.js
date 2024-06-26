require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const Person = require('./models/person');

morgan.token('body', (req) => JSON.stringify(req.body));

app.use(cors());
app.use(express.json());
app.use(express.static('dist'));

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body'),
);

app.get('/info', (_request, response, next) => {
  const now = new Date().toLocaleString();
  Person.find({})
    .then((result) => {
      response.send(
        `<p>Phonebook has info for ${result.length} people</p><p>${now}</p>`,
      );
    })
    .catch((error) => next(error));
});

app.get('/api/persons', (_request, response, next) => {
  Person.find({})
    .then((result) => {
      response.json(result);
    })
    .catch((error) => next(error));
});

app.get('/api/persons/:id', (request, response, next) => {
  const { id } = request.params;
  Person.findById(id)
    .then((result) => {
      response.json(result);
    })
    .catch((error) => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
  const { id } = request.params;
  Person.findByIdAndDelete(id)
    .then(() => response.status(204).end())
    .catch((error) => next(error));
});

app.post('/api/persons', (request, response, next) => {
  const { body } = request;

  if (!body.name) {
    return response.status(400).json({
      error: 'name missing',
    });
  }
  if (!body.number) {
    return response.status(400).json({
      error: 'number missing',
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });
  person
    .save()
    .then((result) => {
      response.json(result);
    })
    .catch((error) => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {
  const { body } = request;
  const person = {
    name: body.name,
    number: body.number,
  };
  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((result) => {
      response.json(result);
    })
    .catch((error) => next(error));
});

// MARK - Error Handling

app.use((_request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
});

app.use((error, _request, response, next) => {
  // eslint-disable-next-line no-console
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  }

  next(error);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${PORT}`);
});
