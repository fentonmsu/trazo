import type { CharacterTemplate, LanguageId } from '../types/character';
import { kanaCharacters } from './kana';
import { kanjiCharacters } from './kanji';
import { cyrillicCharacters } from './cyrillic';
import { cyrillicCursiveCharacters } from './cyrillicCursive';
import { hebrewCharacters } from './hebrew';
import { niqqudCharacters } from './niqqud';
import { hebrewFullCharacters } from './hebrewFull';
import { hebrewCursiveCharacters } from './hebrewCursive';
import { arabicCharacters } from './arabic';
import { arabicNumberCharacters } from './arabicNumbers';
import { arabicHarakatCharacters } from './arabicHarakat';
import { arabicFormsCharacters } from './arabicForms';
import { chineseCharacters } from './chinese';
import { turkishCharacters } from './turkish';
import { koreanCharacters } from './korean';
import { polishCharacters } from './polish';
import { frenchCharacters } from './french';
import { portugueseCharacters } from './portuguese';
import { germanCharacters } from './german';
import { vietnameseCharacters } from './vietnamese';
import { spanishCharacters } from './spanish';

export const CHARACTERS_BY_LANGUAGE: Record<LanguageId, CharacterTemplate[]> = {
  kana: kanaCharacters,
  kanji: kanjiCharacters,
  cyrillic: cyrillicCharacters,
  cyrillicCursive: cyrillicCursiveCharacters,
  hebrew: hebrewCharacters,
  niqqud: niqqudCharacters,
  hebrewFull: hebrewFullCharacters,
  hebrewCursive: hebrewCursiveCharacters,
  arabic: arabicCharacters,
  arabicNumbers: arabicNumberCharacters,
  arabicHarakat: arabicHarakatCharacters,
  arabicForms: arabicFormsCharacters,
  chinese: chineseCharacters,
  turkish: turkishCharacters,
  korean: koreanCharacters,
  polish: polishCharacters,
  french: frenchCharacters,
  portuguese: portugueseCharacters,
  german: germanCharacters,
  vietnamese: vietnameseCharacters,
  spanish: spanishCharacters,
};

export function getCharactersForLanguage(language: LanguageId): CharacterTemplate[] {
  return CHARACTERS_BY_LANGUAGE[language] ?? [];
}
