import type { CharacterTemplate, LanguageId } from '../types/character';
import { kanaCharacters } from './kana';
import { kanjiCharacters } from './kanji';
import { cyrillicCharacters } from './cyrillic';
import { hebrewCharacters } from './hebrew';
import { niqqudCharacters } from './niqqud';
import { hebrewFullCharacters } from './hebrewFull';
import { arabicCharacters } from './arabic';
import { chineseCharacters } from './chinese';
import { turkishCharacters } from './turkish';
import { koreanCharacters } from './korean';
import { polishCharacters } from './polish';
import { frenchCharacters } from './french';
import { portugueseCharacters } from './portuguese';

export const CHARACTERS_BY_LANGUAGE: Record<LanguageId, CharacterTemplate[]> = {
  kana: kanaCharacters,
  kanji: kanjiCharacters,
  cyrillic: cyrillicCharacters,
  hebrew: hebrewCharacters,
  niqqud: niqqudCharacters,
  hebrewFull: hebrewFullCharacters,
  arabic: arabicCharacters,
  chinese: chineseCharacters,
  turkish: turkishCharacters,
  korean: koreanCharacters,
  polish: polishCharacters,
  french: frenchCharacters,
  portuguese: portugueseCharacters,
};

export function getCharactersForLanguage(language: LanguageId): CharacterTemplate[] {
  return CHARACTERS_BY_LANGUAGE[language] ?? [];
}
