const API_BASE_URL = 'http://localhost:3001/api';

export interface LevelResult {
  level: number;
  correctAnswers: number;
  totalQuestions: number;
  timeSpent: number;
  passed: boolean;
}

export interface Result extends LevelResult {
  id: number;
  createdAt: string;
}

export interface Stats {
  totalAttempts: number;
  totalPassed: number;
  passRate: number;
  averageScore: number;
  averageTime: number;
  bestTime: number;
}

export interface LevelStats {
  level: number;
  attempts: number;
  passed: number;
  passRate: number;
  averageScore: number;
  averageTime: number;
  bestTime: number;
}

// Spara ett nytt resultat
export const saveResult = async (result: LevelResult): Promise<Result> => {
  const response = await fetch(`${API_BASE_URL}/results`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(result),
  });
  
  if (!response.ok) {
    throw new Error('Failed to save result');
  }
  
  return response.json();
};

// Hämta alla resultat
export const getResults = async (): Promise<Result[]> => {
  const response = await fetch(`${API_BASE_URL}/results`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch results');
  }
  
  return response.json();
};

// Hämta total statistik
export const getStats = async (): Promise<Stats> => {
  const response = await fetch(`${API_BASE_URL}/stats`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch stats');
  }
  
  return response.json();
};

// Hämta statistik per nivå
export const getStatsByLevel = async (): Promise<LevelStats[]> => {
  const response = await fetch(`${API_BASE_URL}/stats/by-level`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch level stats');
  }
  
  return response.json();
}; 