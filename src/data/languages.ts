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
  arabic: {
    id: 'arabic',
    name: 'Árabe',
    nativeName: 'العربية',
    direction: 'rtl',
    description: 'Las 28 letras del alfabeto árabe en su forma aislada.',
  },
  chinese: {
    id: 'chinese',
    name: 'Chino (Mandarín)',
    nativeName: '中文',
    direction: 'ltr',
    description: 'Caracteres básicos chinos con lectura en pinyin y audio en mandarín.',
  },
  turkish: {
    id: 'turkish',
    name: 'Turco',
    nativeName: 'Türkçe',
    direction: 'ltr',
    description: 'Las 29 letras del alfabeto turco, incluidas ç, ğ, ı/İ, ö, ş, ü.',
  },
};

export const LANGUAGE_ORDER: LanguageId[] = [
  'kana',
  'kanji',
  'cyrillic',
  'hebrew',
  'niqqud',
  'hebrewFull',
  'arabic',
  'chinese',
  'turkish',
];

/** True for any language rendered in Hebrew script (letters, niqqud, or both). */
export function isHebrewScript(language: LanguageId): boolean {
  return language === 'hebrew' || language === 'niqqud' || language === 'hebrewFull';
}

/** True for any language that reads right-to-left, used for grid/layout direction. */
export function isRtl(language: LanguageId): boolean {
  return LANGUAGES[language].direction === 'rtl';
}
