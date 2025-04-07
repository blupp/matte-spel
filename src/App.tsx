import { useState } from 'react'
import { StartScreen } from './components/StartScreen'
import { GameScreen } from './components/GameScreen'
import { SuccessScreen } from './components/SuccessScreen'
import { generateQuestions } from './utils/mathUtils'
import { GameLevel } from './types'
import './App.css'

type GamePhase = 'start' | 'playing' | 'complete'

function App() {
  const [gamePhase, setGamePhase] = useState<GamePhase>('start')
  const [questions, setQuestions] = useState(generateQuestions(10, 1))
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [currentLevel, setCurrentLevel] = useState<GameLevel>(1)
  const [timeTaken, setTimeTaken] = useState(0)

  const handleStart = (level: GameLevel) => {
    setCurrentLevel(level)
    setGamePhase('playing')
    setQuestions(generateQuestions(10, level))
    setCorrectAnswers(0)
    setTimeTaken(0)
  }

  const handleComplete = (correct: number, time: number) => {
    setCorrectAnswers(correct)
    setTimeTaken(time)
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
          onBack={() => setGamePhase('start')}
          currentLevel={currentLevel}
        />
      )}
      {gamePhase === 'complete' && (
        <SuccessScreen 
          correctAnswers={correctAnswers} 
          onPlayAgain={handlePlayAgain}
          currentLevel={currentLevel}
          timeTaken={timeTaken}
        />
      )}
    </div>
  )
}

export default App
