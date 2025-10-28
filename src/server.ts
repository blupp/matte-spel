import express from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const db = new Database(path.join(__dirname, '../results.db'));

// Skapa tabellen om den inte finns
db.exec(`
  CREATE TABLE IF NOT EXISTS level_results (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    level INTEGER NOT NULL,
    correctAnswers INTEGER NOT NULL,
    totalQuestions INTEGER NOT NULL,
    timeSpent INTEGER NOT NULL,
    passed BOOLEAN NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Funktioner för att hantera databasen
const saveLevelResult = (
  level: number,
  correctAnswers: number,
  totalQuestions: number,
  timeSpent: number,
  passed: boolean
) => {
  console.log(`Saving result - Level: ${level}, Correct: ${correctAnswers}/${totalQuestions}, Time: ${timeSpent}ms, Passed: ${passed}`);
  const stmt = db.prepare(`
    INSERT INTO level_results (level, correctAnswers, totalQuestions, timeSpent, passed)
    VALUES (?, ?, ?, ?, ?)
  `);
  const result = stmt.run(level, correctAnswers, totalQuestions, timeSpent, passed ? 1 : 0);
  console.log('Result saved successfully:', result);
  return result;
};

const getResults = () => {
  console.log('Fetching all results...');
  const stmt = db.prepare('SELECT * FROM level_results ORDER BY createdAt DESC LIMIT 100');
  const results = stmt.all();
  console.log(`Found ${results.length} results`);
  return results;
};

const getStats = () => {
  console.log('Fetching overall statistics...');
  const stmt = db.prepare(`
    SELECT 
      COUNT(*) as totalAttempts,
      SUM(CASE WHEN passed = 1 THEN 1 ELSE 0 END) as totalPassed,
      ROUND(AVG(CASE WHEN passed = 1 THEN 1 ELSE 0 END) * 100, 2) as passRate,
      ROUND(AVG(CAST(correctAnswers AS FLOAT) / totalQuestions * 100), 2) as averageScore,
      AVG(timeSpent) as averageTime,
      MIN(timeSpent) as bestTime
    FROM level_results
  `);
  return stmt.get();
};

const getStatsByLevel = () => {
  console.log('Fetching statistics by level...');
  const stmt = db.prepare(`
    SELECT 
      level,
      COUNT(*) as attempts,
      SUM(CASE WHEN passed = 1 THEN 1 ELSE 0 END) as passed,
      ROUND(AVG(CASE WHEN passed = 1 THEN 1 ELSE 0 END) * 100, 2) as passRate,
      ROUND(AVG(CAST(correctAnswers AS FLOAT) / totalQuestions * 100), 2) as averageScore,
      AVG(timeSpent) as averageTime,
      MIN(timeSpent) as bestTime
    FROM level_results
    GROUP BY level
    ORDER BY level
  `);
  return stmt.all();
};

const app = express();
app.use(cors());
app.use(express.json());

// Spara ett nytt resultat
app.post('/api/results', (req, res) => {
  try {
    const { level, correctAnswers, totalQuestions, timeSpent, passed } = req.body;
    const result = saveLevelResult(level, correctAnswers, totalQuestions, timeSpent, passed);
    res.json(result);
  } catch (error) {
    console.error('Error saving result:', error);
    res.status(500).json({ error: 'Failed to save result' });
  }
});

// Hämta alla resultat
app.get('/api/results', (_req, res) => {
  try {
    const results = getResults();
    res.json(results);
  } catch (error) {
    console.error('Error fetching results:', error);
    res.status(500).json({ error: 'Failed to fetch results' });
  }
});

// Hämta total statistik
app.get('/api/stats', (_req, res) => {
  try {
    const stats = getStats();
    res.json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// Hämta statistik per nivå
app.get('/api/stats/by-level', (_req, res) => {
  try {
    const levelStats = getStatsByLevel();
    res.json(levelStats);
  } catch (error) {
    console.error('Error fetching level stats:', error);
    res.status(500).json({ error: 'Failed to fetch level stats' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 