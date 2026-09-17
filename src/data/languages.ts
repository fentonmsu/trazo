import type { LanguageInfo, LanguageId } from '../types/character';

export const LANGUAGES: Record<LanguageId, LanguageInfo> = {
  kana: {
    id: 'kana',
    name: 'Japonés (Kana)',
    nativeName: 'かな',
    direction: 'ltr',
    description: 'Hiragana y katakana, los silabarios base del japonés.',
  },
  kanji: {
    id: 'kanji',
    name: 'Japonés (Kanji)',
    nativeName: '漢字',
    direction: 'ltr',
    description: 'Caracteres de origen chino usados en japonés.',
  },
  cyrillic: {
    id: 'cyrillic',
    name: 'Ruso (Cirílico)',
    nativeName: 'Кириллица',
    direction: 'ltr',
    description: 'Alfabeto cirílico usado para escribir ruso.',
  },
  hebrew: {
    id: 'hebrew',
    name: 'Hebreo',
    nativeName: 'עברית',
    direction: 'rtl',
    description: 'Alfabeto hebreo.',
  },
};

export const LANGUAGE_ORDER: LanguageId[] = ['kana', 'kanji', 'cyrillic', 'hebrew'];
