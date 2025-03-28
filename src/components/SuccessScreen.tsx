interface SuccessScreenProps {
  correctAnswers: number;
  onPlayAgain: () => void;
}

export const SuccessScreen = ({ correctAnswers, onPlayAgain }: SuccessScreenProps) => {
  const hasPassed = correctAnswers >= 9;

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
      </div>
    </div>
  );
}; 