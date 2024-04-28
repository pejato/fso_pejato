import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

interface BmiQuery {
  height: string;
  weight: string;
}

app.get<unknown, unknown, unknown, BmiQuery>('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if (!height) {
    return res
      .status(400)
      .json({ error: 'Must include height query parameter' });
  }
  if (!weight) {
    return res
      .status(400)
      .json({ error: 'Must include weight query parameter' });
  }
  const heightNumber = parseInt(height);
  if (isNaN(heightNumber)) {
    return res
      .status(400)
      .json({ error: 'height query parameter must be a number' });
  }
  const weightNumber = parseInt(weight);
  if (isNaN(weightNumber)) {
    return res
      .status(400)
      .json({ error: 'weight query parameter must be a number' });
  }

  const message = calculateBmi(heightNumber, weightNumber);
  return res.json({ height, weight, bmi: message });
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
