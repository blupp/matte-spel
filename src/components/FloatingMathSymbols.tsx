import React from 'react';
import './FloatingMathSymbols.css';

const mathSymbols = [
  '+', '-', '×', '÷', '=', 'π', '√', '∞', '∑', '∫',
  //'±', '≠', '≈', '≤', '≥', '∈', '∉', '∏', '∝', '∠'
];

export const FloatingMathSymbols = () => {
  return (
    <div className="floating-symbols-container">
      {mathSymbols.map((symbol, index) => {
        // Generate random positions across the entire viewport
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight;
        
        // Generate random size between 24rem and 40rem
        const size = 24 + Math.random() * 16;
        
        return (
          <div
            key={index}
            className="floating-symbol"
            style={{
              '--delay': `${index * 0.75}s`, // Reduced delay since we have more symbols
              '--duration': `${15 + Math.random() * 15}s`,
              '--start-x': `${startX}px`,
              '--start-y': `${startY}px`,
              '--size': `${size}rem`,
            } as React.CSSProperties}
          >
            {symbol}
          </div>
        );
      })}
    </div>
  );
}; 