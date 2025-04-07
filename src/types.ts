export type GameLevel = 1 | 2 | 3;

export type Operation = '+' | '-';

export interface Question {
  expression: string;
  correctAnswer: number;
  options: number[];
}

export interface GameState {
  currentQuestion: number;
  totalQuestions: number;
  correctAnswers: number;
  isComplete: boolean;
} 