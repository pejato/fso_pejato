const express = require("express");
const morgan = require("morgan");
const app = express();

morgan.token("body", (req, res) => {
  return JSON.stringify(req.body);
});

app.use(express.json());
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

let entries = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/info", (request, response) => {
  const now = new Date().toLocaleString();
  response.send(
    `<p>Phonebook has info for ${entries.length} people</p><p>${now}</p>`
  );
});

app.get("/api/persons", (request, response) => {
  response.json(entries);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const entry = entries.find((e) => e.id === id);
  if (entry) {
    response.json(entry);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  entries = entries.filter((e) => e.id !== id);
  response.status(204).end();
});

const makeId = () => {
  return Math.floor(Math.random() * 10000);
};

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({
      error: "name missing",
    });
  } else if (!body.number) {
    return response.status(400).json({
      error: "number missing",
    });
  } else if (entries.find((e) => e.name === body.name)) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  const entry = {
    id: makeId(),
    name: body.name,
    number: body.number,
  };
  entries = entries.concat(entry);
  response.json(entry);
});

app.use(unknownEndpoint);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
