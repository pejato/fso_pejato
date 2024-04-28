import express, { json } from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

interface BmiQuery {
  height: string;
  weight: string;
}

app.get<unknown, unknown, unknown, BmiQuery>('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if (height === undefined || weight === undefined) {
    return res.status(400).json({ error: 'parameters missing' });
  }
  const heightNumber = parseInt(height);
  const weightNumber = parseInt(weight);
  if (isNaN(heightNumber) || isNaN(weightNumber)) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const message = calculateBmi(heightNumber, weightNumber);
  return res.json({ height, weight, bmi: message });
});

interface ExercisesResBody {
  daily_exercises: number[];
  target: number;
}

app.post<unknown, unknown, ExercisesResBody>('/exercises', (req, res) => {
  const { daily_exercises: dailyExercises, target } = req.body;
  if (dailyExercises === undefined || target === undefined) {
    return res.status(400).json({ error: 'parameters missing' });
  }

  if (
    !Array.isArray(dailyExercises) ||
    !dailyExercises.some((e) => typeof e !== 'string') ||
    typeof target !== 'number'
  ) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  return res.json(calculateExercises(dailyExercises, target));
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
