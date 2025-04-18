import { Question, GameState } from '../types';
import { useState, useEffect } from 'react';
import ReactConfetti from 'react-confetti';

interface GameScreenProps {
  questions: Question[];
  onComplete: (correctAnswers: number, timeTaken: number) => void;
  onBack: () => void;
  currentLevel: number;
}

export const GameScreen = ({ questions, onComplete, onBack, currentLevel }: GameScreenProps) => {
  const [gameState, setGameState] = useState<GameState>({
    currentQuestion: 0,
    totalQuestions: questions.length,
    correctAnswers: 0,
    isComplete: false,
  });

  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [progress, setProgress] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);

  const currentQuestion = questions[gameState.currentQuestion];

  // Starta tidtagning när komponenten mountas
  useEffect(() => {
    setStartTime(Date.now());
  }, []);

  // Nollställ feedback när frågan ändras
  useEffect(() => {
    setShowFeedback(false);
    setIsCorrect(false);
    setShowConfetti(false);
    // Animate progress bar
    setProgress((gameState.currentQuestion / gameState.totalQuestions) * 100);
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
        const timeTaken = startTime ? Math.floor((Date.now() - startTime) / 1000) : 0;
        onComplete(correct ? gameState.correctAnswers + 1 : gameState.correctAnswers, timeTaken);
      } else {
        setGameState(prev => ({
          ...prev,
          currentQuestion: prev.currentQuestion + 1,
        }));
      }
    }, 1500);
  };

  return (
    <div className={`container ${currentLevel === 2 ? 'level-2' : currentLevel === 3 ? 'level-3' : ''}`}>
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
          recycle={true}
          numberOfPieces={500}
          gravity={0.3}
          wind={0.05}
          onConfettiComplete={() => setShowConfetti(false)}
        />
      )}
      <div className="card">
        <div className="progress-container">
          <div 
            className="progress-bar"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div>
          <span>
            Fråga {gameState.currentQuestion + 1} av {gameState.totalQuestions}
          </span>
        </div>

        <div className="question">
          {currentLevel === 3 ? (
            <>
              <span className="number-box">{currentQuestion.expression.split(' ')[0].replace('[', '').replace(']', '')}</span>
              <span className="number-box">{currentQuestion.expression.split(' ')[1].replace('[', '').replace(']', '')}</span>
              <span className="number-box">{currentQuestion.expression.split(' ')[2].replace('[', '').replace(']', '')}</span>
              <span className="question-mark">?</span>
            </>
          ) : (
            `${currentQuestion.expression} = ?`
          )}
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