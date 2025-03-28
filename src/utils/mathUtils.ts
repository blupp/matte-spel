import { Operation, Question } from '../types';

const generateRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateOptions = (correctAnswer: number): number[] => {
  const options = [correctAnswer];
  
  while (options.length < 4) {
    const option = generateRandomNumber(0, 20);
    if (!options.includes(option)) {
      options.push(option);
    }
  }
  
  // Shuffle options
  return options.sort(() => Math.random() - 0.5);
};

export const generateQuestion = (): Question => {
  const operation: Operation = Math.random() < 0.5 ? '+' : '-';
  const firstNumber = generateRandomNumber(0, 20);
  let secondNumber: number;
  let correctAnswer: number;

  if (operation === '+') {
    secondNumber = generateRandomNumber(0, 20 - firstNumber);
    correctAnswer = firstNumber + secondNumber;
  } else {
    secondNumber = generateRandomNumber(0, firstNumber);
    correctAnswer = firstNumber - secondNumber;
  }

  return {
    firstNumber,
    secondNumber,
    operation,
    correctAnswer,
    options: generateOptions(correctAnswer),
  };
};

export const generateQuestions = (count: number): Question[] => {
  return Array.from({ length: count }, () => generateQuestion());
}; 