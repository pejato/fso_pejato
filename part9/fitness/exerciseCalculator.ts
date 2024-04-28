interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  exerciseHours: number[],
  targetHoursPerDay: number,
): ExerciseResult => {
  let trainingDays = 0;
  let totalHours = 0;
  for (const amount of exerciseHours) {
    totalHours += amount;
    trainingDays += amount === 0 ? 0 : 1;
  }
  const average = exerciseHours.length ? totalHours / exerciseHours.length : 0;

  let rating: number;
  let ratingDescription: string;
  if (average < 0.65 * targetHoursPerDay) {
    rating = 1;
    ratingDescription = "C'mon, you can do better than that";
  } else if (average < targetHoursPerDay) {
    rating = 2;
    ratingDescription = 'Getting there, you can push for your goal';
  } else {
    rating = 3;
    ratingDescription = "Keep it up, you're doing great";
  }

  return {
    periodLength: exerciseHours.length,
    trainingDays,
    success: average >= targetHoursPerDay,
    rating,
    ratingDescription,
    target: targetHoursPerDay,
    average,
  };
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
