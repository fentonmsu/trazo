import type { LanguageId } from '../types/character';
import { getCharactersForLanguage } from './index';

export interface Lesson {
  id: string;
  language: LanguageId;
  index: number;
  title: string;
  characterIds: string[];
}

const LESSON_SIZE = 6;

/** Languages with structured lessons. hebrewFull is a combinatorial drill
 *  tool (200+ entries), not primary learning content, so it's excluded. */
export const LESSON_LANGUAGES: LanguageId[] = [
  'kana',
  'kanji',
  'cyrillic',
  'hebrew',
  'niqqud',
  'arabic',
  'chinese',
  'turkish',
];

const lessonCache = new Map<LanguageId, Lesson[]>();

/** Chunks a language's characters (in their existing curated order) into fixed-size lessons. */
export function getLessonsForLanguage(language: LanguageId): Lesson[] {
  const cached = lessonCache.get(language);
  if (cached) return cached;

  const characters = getCharactersForLanguage(language);
  const lessons: Lesson[] = [];
  for (let i = 0; i < characters.length; i += LESSON_SIZE) {
    const chunk = characters.slice(i, i + LESSON_SIZE);
    const index = lessons.length + 1;
    lessons.push({
      id: `${language}-lesson-${index}`,
      language,
      index,
      title: `Lección ${index}`,
      characterIds: chunk.map((c) => c.id),
    });
  }
  lessonCache.set(language, lessons);
  return lessons;
}
