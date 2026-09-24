import type { CharacterTemplate } from '../types/character';

export type Exercise =
  | { type: 'choose-sound'; prompt: CharacterTemplate; options: CharacterTemplate[] }
  | { type: 'choose-char'; prompt: CharacterTemplate; options: CharacterTemplate[] }
  | { type: 'listen'; prompt: CharacterTemplate; options: CharacterTemplate[] }
  | { type: 'match'; pairs: CharacterTemplate[] }
  | { type: 'draw'; target: CharacterTemplate };

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function pickDistractors(correct: CharacterTemplate, pool: CharacterTemplate[], count: number): CharacterTemplate[] {
  const others = pool.filter((c) => c.id !== correct.id);
  return shuffle(others).slice(0, Math.min(count, others.length));
}

function buildChoiceOptions(correct: CharacterTemplate, pool: CharacterTemplate[]): CharacterTemplate[] {
  return shuffle([correct, ...pickDistractors(correct, pool, 3)]);
}

/**
 * Builds a mixed sequence of exercises for a lesson: a couple of each
 * question type per lesson character, plus a matching round and a drawing
 * round, then shuffled into a randomized (but reproducible-per-call) order.
 */
export function buildLessonExercises(lessonCharacters: CharacterTemplate[], languagePool: CharacterTemplate[]): Exercise[] {
  const exercises: Exercise[] = [];

  lessonCharacters.forEach((char, i) => {
    if (i % 2 === 0) {
      exercises.push({ type: 'choose-sound', prompt: char, options: buildChoiceOptions(char, languagePool) });
    } else {
      exercises.push({ type: 'choose-char', prompt: char, options: buildChoiceOptions(char, languagePool) });
    }
    if (i % 3 === 0) {
      exercises.push({ type: 'listen', prompt: char, options: buildChoiceOptions(char, languagePool) });
    }
  });

  if (languagePool.length >= 4) {
    const matchPool = shuffle(lessonCharacters).slice(0, Math.min(4, lessonCharacters.length));
    if (matchPool.length >= 2) {
      exercises.push({ type: 'match', pairs: matchPool });
    }
  }

  for (const char of shuffle(lessonCharacters).slice(0, Math.min(2, lessonCharacters.length))) {
    exercises.push({ type: 'draw', target: char });
  }

  return shuffle(exercises);
}
