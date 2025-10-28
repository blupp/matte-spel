import { useEffect, useState } from 'react';
import { getResults, getStats, getStatsByLevel, Result, Stats, LevelStats } from '../api/client';
import './Results.css';

export default function Results() {
  const [results, setResults] = useState<Result[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [levelStats, setLevelStats] = useState<LevelStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        const [fetchedResults, fetchedStats, fetchedLevelStats] = await Promise.all([
          getResults(),
          getStats(),
          getStatsByLevel()
        ]);
        
        if (mounted) {
          setResults(fetchedResults);
          setStats(fetchedStats);
          setLevelStats(fetchedLevelStats);
        }
      } catch (error) {
        console.error('Failed to fetch results:', error);
        if (mounted) {
          setError('Kunde inte ladda resultaten. Försök igen senare.');
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, []);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div>Laddar resultat...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="loading-container">
        <div>Inga resultat att visa än.</div>
      </div>
    );
  }

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="results-container">
      <div className="stats-card">
        <h2 className="stats-title">Total Statistik</h2>
        <div className="stats-grid">
          <div className="stat-item blue">
            <p className="stat-label">Totalt antal försök</p>
            <p className="stat-value">{stats.totalAttempts}</p>
          </div>
          <div className="stat-item green">
            <p className="stat-label">Antal klarade</p>
            <p className="stat-value">{stats.totalPassed}</p>
          </div>
          <div className="stat-item yellow">
            <p className="stat-label">Procent klarade</p>
            <p className="stat-value">{stats.passRate}%</p>
          </div>
          <div className="stat-item purple">
            <p className="stat-label">Genomsnittlig poäng</p>
            <p className="stat-value">{stats.averageScore}%</p>
          </div>
          <div className="stat-item indigo">
            <p className="stat-label">Genomsnittlig tid</p>
            <p className="stat-value">{formatTime(stats.averageTime)}</p>
          </div>
          <div className="stat-item pink">
            <p className="stat-label">Bästa tid</p>
            <p className="stat-value">{formatTime(stats.bestTime)}</p>
          </div>
        </div>
      </div>

      <div className="level-stats-grid">
        {levelStats.map((levelStat) => (
          <div key={levelStat.level} className="level-card">
            <h3 className="level-title">Nivå {levelStat.level}</h3>
            <div className="level-stats-list">
              <div>
                <p className="result-detail-label">Antal försök</p>
                <p className="result-detail-value">{levelStat.attempts}</p>
              </div>
              <div>
                <p className="result-detail-label">Antal klarade</p>
                <p className="result-detail-value">{levelStat.passed}</p>
              </div>
              <div>
                <p className="result-detail-label">Procent klarade</p>
                <p className="result-detail-value">{levelStat.passRate}%</p>
              </div>
              <div>
                <p className="result-detail-label">Genomsnittlig poäng</p>
                <p className="result-detail-value">{levelStat.averageScore}%</p>
              </div>
              <div>
                <p className="result-detail-label">Bästa tid</p>
                <p className="result-detail-value">{formatTime(levelStat.bestTime)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="stats-card">
        <h2 className="stats-title">Senaste resultat</h2>
        <div className="results-list">
          {results.map((result) => (
            <div
              key={result.id}
              className={`result-item ${result.passed ? 'passed' : 'failed'}`}
            >
              <div className="result-grid">
                <div>
                  <p className="result-detail-label">Nivå</p>
                  <p className="result-detail-value">{result.level}</p>
                </div>
                <div>
                  <p className="result-detail-label">Resultat</p>
                  <p className="result-detail-value">
                    {result.correctAnswers} av {result.totalQuestions} rätt
                  </p>
                </div>
                <div>
                  <p className="result-detail-label">Tid</p>
                  <p className="result-detail-value">{formatTime(result.timeSpent)}</p>
                </div>
                <div>
                  <p className="result-detail-label">Datum</p>
                  <p className="result-detail-value">
                    {new Date(result.createdAt).toLocaleString('sv-SE')}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 