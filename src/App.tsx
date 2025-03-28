import { useState } from 'react'
import { StartScreen } from './components/StartScreen'
import { GameScreen } from './components/GameScreen'
import { SuccessScreen } from './components/SuccessScreen'
import { generateQuestions } from './utils/mathUtils'
import './App.css'

type GamePhase = 'start' | 'playing' | 'complete'

function App() {
  const [gamePhase, setGamePhase] = useState<GamePhase>('start')
  const [questions, setQuestions] = useState(generateQuestions(10))
  const [correctAnswers, setCorrectAnswers] = useState(0)

  const handleStart = () => {
    setGamePhase('playing')
    setQuestions(generateQuestions(10))
    setCorrectAnswers(0)
  }

  const handleComplete = (correct: number) => {
    setCorrectAnswers(correct)
    setGamePhase('complete')
  }

  const handlePlayAgain = () => {
    setGamePhase('start')
  }

  return (
    <div className="min-h-screen">
      {gamePhase === 'start' && <StartScreen onStart={handleStart} />}
      {gamePhase === 'playing' && (
        <GameScreen 
          questions={questions} 
          onComplete={handleComplete} 
        />
      )}
      {gamePhase === 'complete' && (
        <SuccessScreen 
          correctAnswers={correctAnswers} 
          onPlayAgain={handlePlayAgain} 
        />
      )}
    </div>
  )
}

export default App
