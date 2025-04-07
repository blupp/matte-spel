import { Operation, Question } from '../types';

const generateRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateOptions = (correctAnswer: number): number[] => {
  const options = [correctAnswer];
  
  while (options.length < 4) {
    // For Level 2, we want options that are reasonably close to the correct answer
    const variation = Math.floor(Math.random() * 3) + 1; // 1 to 3
    const option = correctAnswer + (Math.random() < 0.5 ? variation : -variation);
    
    // Ensure option is between 0 and 25
    if (option >= 0 && option <= 25 && !options.includes(option)) {
      options.push(option);
    }
  }
  
  // Shuffle options
  return options.sort(() => Math.random() - 0.5);
};

const generateLevel1Question = (): Question => {
  const operation: Operation = Math.random() < 0.5 ? '+' : '-';
  const firstNumber = generateRandomNumber(1, 20);
  let secondNumber: number;
  let correctAnswer: number;

  if (operation === '+') {
    secondNumber = generateRandomNumber(1, 20 - firstNumber);
    correctAnswer = firstNumber + secondNumber;
  } else {
    secondNumber = generateRandomNumber(1, firstNumber - 1);
    correctAnswer = firstNumber - secondNumber;
  }

  return {
    expression: `${firstNumber} ${operation} ${secondNumber}`,
    correctAnswer,
    options: generateOptions(correctAnswer),
  };
};

const generateLevel2Question = (): Question => {
  let firstNumber = 0;
  let secondNumber = 0;
  let thirdNumber = 0;
  let firstOperation: Operation = '+';
  let secondOperation: Operation = '+';
  let correctAnswer = 0;
  let valid = false;

  while (!valid) {
    // Randomly decide if we want a "big" number (10-15) at all
    const useBigNumber = Math.random() < 0.5;
    
    if (useBigNumber) {
      // If using a big number, randomly place it
      const bigNumberPosition = generateRandomNumber(1, 3);
      if (bigNumberPosition === 1) {
        firstNumber = generateRandomNumber(10, 15);
        secondNumber = generateRandomNumber(0, 9);
        thirdNumber = generateRandomNumber(0, 9);
      } else if (bigNumberPosition === 2) {
        firstNumber = generateRandomNumber(0, 9);
        secondNumber = generateRandomNumber(10, 15);
        thirdNumber = generateRandomNumber(0, 9);
      } else {
        firstNumber = generateRandomNumber(0, 9);
        secondNumber = generateRandomNumber(0, 9);
        thirdNumber = generateRandomNumber(10, 15);
      }
    } else {
      // All numbers under 10
      firstNumber = generateRandomNumber(0, 9);
      secondNumber = generateRandomNumber(0, 9);
      thirdNumber = generateRandomNumber(0, 9);
    }

    firstOperation = Math.random() < 0.5 ? '+' : '-';
    secondOperation = Math.random() < 0.5 ? '+' : '-';

    // Calculate intermediate result
    let intermediateResult = firstOperation === '+' 
      ? firstNumber + secondNumber 
      : firstNumber - secondNumber;

    // If intermediate result is negative, we need to try again
    if (intermediateResult < 0) {
      continue;
    }

    // Calculate final result
    correctAnswer = secondOperation === '+' 
      ? intermediateResult + thirdNumber 
      : intermediateResult - thirdNumber;

    // Check if the result is valid (between 0 and 25)
    valid = correctAnswer >= 0 && correctAnswer <= 25;
  }

  return {
    expression: `${firstNumber} ${firstOperation} ${secondNumber} ${secondOperation} ${thirdNumber}`,
    correctAnswer,
    options: generateOptions(correctAnswer),
  };
};

const generateLevel3Question = (): Question => {
  // Define different sequence patterns
  const patterns = [
    // Increasing by constant
    (start: number, step: number) => [start, start + step, start + step * 2, start + step * 3],
    // Decreasing by constant
    (start: number, step: number) => [start, start - step, start - step * 2, start - step * 3],
    // Even numbers
    (start: number) => [start, start + 2, start + 4, start + 6],
    // Odd numbers
    (start: number) => [start, start + 2, start + 4, start + 6]
  ];

  // Randomly select a pattern
  const patternIndex = Math.floor(Math.random() * patterns.length);
  const pattern = patterns[patternIndex];

  let sequence: number[] = [];
  let valid = false;

  while (!valid) {
    // Generate sequence based on pattern
    if (patternIndex < 2) {
      // For constant increase/decrease patterns
      const start = generateRandomNumber(0, 20);
      const step = generateRandomNumber(1, 5);
      sequence = pattern(start, step);
    } else {
      // For even/odd patterns
      const start = generateRandomNumber(0, 20);
      sequence = pattern(start);
    }

    // Validate sequence
    valid = sequence.every(num => num >= 0 && num <= 30);
  }

  // Create question with first three numbers in boxes and question mark
  const question = `[${sequence[0]}] [${sequence[1]}] [${sequence[2]}] [?]`;
  const correctAnswer = sequence[3];

  return {
    expression: question,
    correctAnswer,
    options: generateOptions(correctAnswer),
  };
};

export const generateQuestion = (level: number): Question => {
  switch (level) {
    case 1:
      return generateLevel1Question();
    case 2:
      return generateLevel2Question();
    case 3:
      return generateLevel3Question();
    default:
      return generateLevel1Question();
  }
};

export const generateQuestions = (count: number, level: number): Question[] => {
  return Array.from({ length: count }, () => generateQuestion(level));
}; 