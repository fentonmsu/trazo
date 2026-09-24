import { useCallback, useEffect, useState } from 'react';
import { api } from '../api/client';
import { useAuth } from './useAuth';

export interface StreakState {
  current: number;
  longest: number;
  lastPracticeDate: string | null;
}

export interface CharacterProgress {
  bestScore: number;
  attempts: number;
}

export interface LessonProgress {
  stars: number;
  completedAt: string | null;
}

export interface ProfileState {
  characterProgress: Record<string, CharacterProgress>;
  lessons: Record<string, LessonProgress>;
  streak: StreakState;
  xp: number;
  hearts: number;
}

interface ActivityResult {
  streak: StreakState;
  xp: number;
  hearts: number;
}

/** Server-backed replacement for the old localStorage progress hook - one profile per logged-in user. */
export function useProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<ProfileState | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const data = await api.get<ProfileState>('/profile');
      setProfile(data);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const recordCharacterScore = useCallback(async (characterId: string, score: number) => {
    const result = await api.post<CharacterProgress & ActivityResult>('/profile/character', { characterId, score });
    setProfile((prev) =>
      prev
        ? {
            ...prev,
            characterProgress: {
              ...prev.characterProgress,
              [characterId]: { bestScore: result.bestScore, attempts: result.attempts },
            },
            streak: result.streak,
            xp: result.xp,
            hearts: result.hearts,
          }
        : prev,
    );
  }, []);

  const recordLessonResult = useCallback(async (lessonId: string, stars: number, xpEarned: number) => {
    const result = await api.post<{ stars: number } & ActivityResult>('/profile/lesson', {
      lessonId,
      stars,
      xpEarned,
    });
    setProfile((prev) =>
      prev
        ? {
            ...prev,
            lessons: { ...prev.lessons, [lessonId]: { stars: result.stars, completedAt: new Date().toISOString() } },
            streak: result.streak,
            xp: result.xp,
            hearts: result.hearts,
          }
        : prev,
    );
  }, []);

  const loseHeart = useCallback(async () => {
    const result = await api.post<{ hearts: number }>('/profile/heart-lost');
    setProfile((prev) => (prev ? { ...prev, hearts: result.hearts } : prev));
    return result.hearts;
  }, []);

  return { profile, loading, recordCharacterScore, recordLessonResult, loseHeart, refresh };
}
