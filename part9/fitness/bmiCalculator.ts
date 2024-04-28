import { parseNumericArguments } from './utils/userInput';

type centimeters = number;
type kilograms = number;

const calculateBmi = (height: centimeters, weight: kilograms): string => {
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);

  let bmiMessage: string;
  if (bmi < 16) {
    bmiMessage = 'Underweight (Severe thinness)';
  } else if (bmi < 17) {
    bmiMessage = 'Underweight (Moderate thinness)';
  } else if (bmi < 18.5) {
    bmiMessage = 'Underweight (Mild thinness)';
  } else if (bmi < 25) {
    bmiMessage = 'Normal range';
  } else if (bmi < 30) {
    bmiMessage = 'Overweight (Pre-obese)';
  } else if (bmi < 35) {
    bmiMessage = 'Obese (Class I)';
  } else if (bmi < 40) {
    bmiMessage = 'Obese (Class II)';
  } else {
    bmiMessage = 'Obese (Class III)';
  }
  return bmiMessage;
};

try {
  const [height, weight] = parseNumericArguments(process.argv, 2, 2);
  const bmiMessage = calculateBmi(height, weight);
  console.log(bmiMessage);
} catch (error) {
  let message = 'Something bad happened...';
  if (error instanceof Error) {
    message += ' ' + error.message;
  }
  console.log(message);
}
