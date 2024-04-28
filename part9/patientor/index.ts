import express, { json } from 'express';

const app = express();
app.use(json());

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
