import { useEffect } from 'react';
import { saveResult } from '../api/client';

interface SuccessScreenProps {
  correctAnswers: number;
  onPlayAgain: () => void;
  currentLevel: number;
  timeTaken: number;
}

export const SuccessScreen = ({ correctAnswers, onPlayAgain, currentLevel, timeTaken }: SuccessScreenProps) => {
  const TOTAL_QUESTIONS = 10;
  const PASS_THRESHOLD = 9;
  const hasPassed = correctAnswers >= PASS_THRESHOLD;

  useEffect(() => {
    // Spara resultatet när komponenten mountas
    const saveGameResult = async () => {
      try {
        await saveResult({
          level: currentLevel,
          correctAnswers,
          totalQuestions: TOTAL_QUESTIONS,
          timeSpent: timeTaken,
          passed: hasPassed
        });
      } catch (error) {
        console.error('Failed to save result:', error);
      }
    };

    saveGameResult();
  }, []); // Tom dependency array eftersom vi bara vill spara en gång

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getSwedishTimestamp = () => {
    return new Date().toLocaleString('sv-SE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className={`container ${currentLevel === 2 ? 'level-2' : currentLevel === 3 ? 'level-3' : ''}`}>
      <div className="card">
        <div className="question">
          {hasPassed ? '✨ Grattis! ✨' : '😢 Tyvärr! 😢'}
        </div>
        
        <p>
          Du fick {correctAnswers} av {TOTAL_QUESTIONS} rätt på nivå {currentLevel}!
          {hasPassed 
            ? ' Du är jättebra! 🎉' 
            : ` Du behöver ${PASS_THRESHOLD} rätt för att klara spelet. Vill du försöka igen?`}
        </p>

        <p>
          Tid: {formatTime(timeTaken)}
        </p>

        <button 
          onClick={onPlayAgain}
          className={`btn ${hasPassed ? 'btn-primary' : 'btn-secondary'}`}
        >
          {hasPassed ? 'Spela Igen 🎮' : 'Försök Igen 🔄'}
        </button>

        <div style={{ 
          marginTop: '2rem', 
          fontSize: '0.8rem', 
          color: '#666',
          opacity: 0.8 
        }}>
          {getSwedishTimestamp()}
        </div>
      </div>
    </div>
  );
}; 