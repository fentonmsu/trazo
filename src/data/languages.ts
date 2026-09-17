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
  niqqud: {
    id: 'niqqud',
    name: 'Hebreo (Nikud)',
    nativeName: 'נִקּוּד',
    direction: 'rtl',
    description: 'Los signos de vocales (nikud) del hebreo, mostrados sobre un círculo punteado.',
  },
  hebrewFull: {
    id: 'hebrewFull',
    name: 'Hebreo (Todas las vocales)',
    nativeName: 'עברית מנוקדת',
    direction: 'rtl',
    description: 'Cada letra combinada con cada nikud (א אָ אַ אֵ אֶ אִ אֹ אֻ אְ, ב בָ בַ...), como en las cartillas de lectura hebrea.',
  },
};

export const LANGUAGE_ORDER: LanguageId[] = ['kana', 'kanji', 'cyrillic', 'hebrew', 'niqqud', 'hebrewFull'];
