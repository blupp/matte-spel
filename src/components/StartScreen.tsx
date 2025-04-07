import { GameLevel } from '../types';

interface StartScreenProps {
  onStart: (level: GameLevel) => void;
}

export const StartScreen = ({ onStart }: StartScreenProps) => {
  const isDev = import.meta.env.DEV;

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
          
          {isDev && (
            <button 
              onClick={() => onStart(2)}
              className="btn btn-secondary"
              style={{ marginTop: '1rem' }}
            >
              Starta Level 2 🎮
            </button>
          )}
        </div>
      </div>
    </div>
  );
}; 