interface SuccessScreenProps {
  correctAnswers: number;
  onPlayAgain: () => void;
  currentLevel: number;
  timeTaken: number;
}

export const SuccessScreen = ({ correctAnswers, onPlayAgain, currentLevel, timeTaken }: SuccessScreenProps) => {
  const hasPassed = correctAnswers >= 9;

  // Skapa tidstämpel i svenskt format
  const getSwedishTimestamp = () => {
    const days = ['sön', 'mån', 'tis', 'ons', 'tor', 'fre', 'lör'];
    const months = ['januari', 'februari', 'mars', 'april', 'maj', 'juni', 
                   'juli', 'augusti', 'september', 'oktober', 'november', 'december'];
    
    const now = new Date();
    const day = days[now.getDay()];
    const date = now.getDate();
    const month = months[now.getMonth()];
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    
    return `${day} ${date} ${month} ${hours}:${minutes}`;
  };

  // Formatera tiden till minuter och sekunder
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes} min ${remainingSeconds} sek`;
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