interface StartScreenProps {
  onStart: () => void;
}

export const StartScreen = ({ onStart }: StartScreenProps) => {
  return (
    <div className="container">
      <div className="card">
        <h1>🎯 Matte Spelet 🎯</h1>
        <p>
          Hej! Är du redo att lösa några roliga matteuppgifter? 
          Du behöver få 9 av 10 rätt för att klara spelet! 
          Lycka till! ✨
        </p>
        <button 
          onClick={onStart}
          className="btn btn-primary"
        >
          Starta Spelet 🚀
        </button>
      </div>
    </div>
  );
}; 