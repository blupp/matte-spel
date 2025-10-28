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
      <div className="card success-card">
        <div className="success-icon" aria-hidden="true">
          {hasPassed ? '🏆' : '💪'}
        </div>

        <div className="game-header">
          <span className={`level-chip level-${currentLevel}`}>
            Nivå {currentLevel}
          </span>
          <span className="game-progress-label">10 frågor klara!</span>
        </div>

        <div className="question-bubble" style={{ fontSize: '2.2rem', minHeight: 'auto' }}>
          {hasPassed ? '✨ Fantastiskt jobbat! ✨' : 'Nästan! Vi klarar det nästa gång!'}
        </div>

        <p className="success-message">
          Du prickade in {correctAnswers} av 10 rätt på nivå {currentLevel}.{hasPassed
            ? ' Visa den här skärmen för att få din belöning!'
            : ' Samla 9 rätt nästa gång så väntar en belöning.'}
        </p>

        <div className="stat-bubbles">
          <div className="stat-bubble">⏱ Tid: {formatTime(timeTaken)}</div>
          <div className="stat-bubble">⭐ Stjärnor: {correctAnswers}</div>
        </div>

        <button
          onClick={onPlayAgain}
          className={`btn ${hasPassed ? 'btn-primary' : 'btn-secondary'}`}
        >
          {hasPassed ? 'Spela igen 🎉' : 'Jag provar igen! 🔄'}
        </button>

        <div className="timestamp">{getSwedishTimestamp()}</div>
      </div>
    </div>
  );
};