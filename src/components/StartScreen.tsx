import { GameLevel } from '../types';

interface StartScreenProps {
  onStart: (level: GameLevel) => void;
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
        <div className="level-buttons">
          <button 
            onClick={() => onStart(1)}
            className="btn btn-primary"
          >
            Starta Level 1 🚀
          </button>
          
          <button 
            onClick={() => onStart(2)}
            className="btn btn-secondary"
            style={{ marginTop: '1rem' }}
          >
            Starta Level 2 🎮
          </button>

          <button 
            onClick={() => onStart(3)}
            className="btn btn-tertiary"
            style={{ marginTop: '1rem' }}
          >
            Starta Level 3 🧩
          </button>
        </div>
      </div>
    </div>
  );
}; 