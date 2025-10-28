import { GameLevel } from '../types';
import { FloatingMathSymbols } from './FloatingMathSymbols';

interface StartScreenProps {
  onStart: (level: GameLevel) => void;
}

export const StartScreen = ({ onStart }: StartScreenProps) => {
  return (
    <div className="container">
      <FloatingMathSymbols />
      <div className="card start-card">
        <div className="start-header">
          <span>Hej mattehjälte! 🌈</span>
          <span>Träna + och − upp till 20</span>
        </div>
        <h1>Matte-äventyret</h1>
        <p className="tagline">
          Värm upp superhjärnan och samla stjärnor! Klara minst <strong>9 av 10</strong> frågor för att låsa upp en belöning. ✨
        </p>

        <div className="level-grid">
          <button onClick={() => onStart(1)} className="level-card level-1">
            <strong>Level 1 • Start!</strong>
            <span>Snälla plus och minus med tal upp till 10.</span>
            <span className="level-cta">Starta 🚀</span>
          </button>

          <button onClick={() => onStart(2)} className="level-card level-2">
            <strong>Level 2 • Super</strong>
            <span>Lite klurigare tal och fler stjärnor.</span>
            <span className="level-cta">Kör igång 🎮</span>
          </button>

          <button onClick={() => onStart(3)} className="level-card level-3">
            <strong>Level 3 • Proffs</strong>
            <span>Utmaningar med både plus och minus!</span>
            <span className="level-cta">Jag fixar det! 🧠</span>
          </button>
        </div>
      </div>
    </div>
  );
};