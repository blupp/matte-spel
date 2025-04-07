import { Question, GameState } from '../types';
import { useState, useEffect } from 'react';
import ReactConfetti from 'react-confetti';

interface GameScreenProps {
  questions: Question[];
  onComplete: (correctAnswers: number) => void;
  onBack: () => void;
}

export const GameScreen = ({ questions, onComplete, onBack }: GameScreenProps) => {
  const [gameState, setGameState] = useState<GameState>({
    currentQuestion: 0,
    totalQuestions: questions.length,
    correctAnswers: 0,
    isComplete: false,
  });

  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const currentQuestion = questions[gameState.currentQuestion];

  // Nollställ feedback när frågan ändras
  useEffect(() => {
    setShowFeedback(false);
    setIsCorrect(false);
    setShowConfetti(false);
  }, [gameState.currentQuestion]);

  const playSound = (correct: boolean) => {
    const audio = new Audio(correct ? '/correct.mp3' : '/wrong.mp3');
    audio.play().catch(() => {}); // Ignore errors if sound is blocked
  };

  const handleAnswer = (answer: number) => {
    // Ta bort fokus från knappen som klickades
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    const correct = answer === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    playSound(correct);
    setShowFeedback(true);
    
    if (correct) {
      setShowConfetti(true);
    }

    setTimeout(() => {
      if (correct) {
        setGameState(prev => ({
          ...prev,
          correctAnswers: prev.correctAnswers + 1,
        }));
      }

      if (gameState.currentQuestion === gameState.totalQuestions - 1) {
        setGameState(prev => ({ ...prev, isComplete: true }));
        onComplete(correct ? gameState.correctAnswers + 1 : gameState.correctAnswers);
      } else {
        setGameState(prev => ({
          ...prev,
          currentQuestion: prev.currentQuestion + 1,
        }));
      }
    }, 1500);
  };

  return (
    <div className="container">
      <button 
        className="back-button"
        onClick={onBack}
        aria-label="Gå tillbaka"
      >
        ←
      </button>
      {showConfetti && (
        <ReactConfetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
          onConfettiComplete={() => setShowConfetti(false)}
        />
      )}
      <div className="card">
        <div>
          <span>
            Fråga {gameState.currentQuestion + 1} av {gameState.totalQuestions}
          </span>
        </div>

        <div className="question">
          {currentQuestion.expression} = ?
        </div>

        <div className="options">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              disabled={showFeedback}
              onTouchStart={(e) => e.currentTarget.style.backgroundColor = 'var(--white)'}
              className={`option ${
                showFeedback
                  ? option === currentQuestion.correctAnswer
                    ? 'correct'
                    : option === currentQuestion.options[index]
                    ? 'incorrect'
                    : ''
                  : ''
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        {showFeedback && (
          <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
            {isCorrect ? 'Rätt! 🎉' : 'Fel! 😢'}
          </div>
        )}
      </div>
    </div>
  );
}; 