interface SuccessScreenProps {
  correctAnswers: number;
  onPlayAgain: () => void;
}

export const SuccessScreen = ({ correctAnswers, onPlayAgain }: SuccessScreenProps) => {
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

  return (
    <div className="container">
      <div className="card">
        <div className="question">
          {hasPassed ? '✨ Grattis! ✨' : '😢 Tyvärr! 😢'}
        </div>
        
        <p>
          Du fick {correctAnswers} av 10 rätt!
          {hasPassed 
            ? ' Du är jättebra! 🎉' 
            : ' Du behöver 9 rätt för att klara spelet. Vill du försöka igen?'}
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