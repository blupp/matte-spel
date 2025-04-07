export type GameLevel = 1 | 2;

export type Operation = '+' | '-';

export interface Question {
  firstNumber: number;
  secondNumber: number;
  operation: Operation;
  correctAnswer: number;
  options: number[];
}

export interface GameState {
  currentQuestion: number;
  totalQuestions: number;
  correctAnswers: number;
  isComplete: boolean;
} 