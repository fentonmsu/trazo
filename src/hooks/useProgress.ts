import { useCallback, useEffect, useState } from 'react';

export interface CharacterProgress {
  bestScore: number;
  attempts: number;
}

export type ProgressMap = Record<string, CharacterProgress>;

const STORAGE_KEY = 'language-game-progress';

function loadProgress(): ProgressMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ProgressMap) : {};
  } catch {
    return {};
  }
}

export function useProgress() {
  const [progress, setProgress] = useState<ProgressMap>(() => loadProgress());

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // ignore storage failures (e.g. private browsing quota)
    }
  }, [progress]);

  const recordScore = useCallback((templateId: string, score: number) => {
    setProgress((prev) => {
      const existing = prev[templateId];
      const attempts = (existing?.attempts ?? 0) + 1;
      const bestScore = Math.max(existing?.bestScore ?? 0, score);
      return { ...prev, [templateId]: { bestScore, attempts } };
    });
  }, []);

  return { progress, recordScore };
}
