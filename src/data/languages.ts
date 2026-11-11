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
  cyrillicCursive: {
    id: 'cyrillicCursive',
    name: 'Ruso (Cursiva)',
    nativeName: 'Рукописный',
    direction: 'ltr',
    description: 'Las 33 letras del alfabeto ruso en su forma cursiva manuscrita (прописью), tal como se enseña en la escuela.',
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
  hebrewCursive: {
    id: 'hebrewCursive',
    name: 'Hebreo (Cursiva)',
    nativeName: 'כתב יד',
    direction: 'rtl',
    description: 'Las 22 letras hebreas en su forma cursiva manuscrita (ktav yad), más las 5 formas finales.',
  },
  arabic: {
    id: 'arabic',
    name: 'Árabe',
    nativeName: 'العربية',
    direction: 'rtl',
    description: 'Las 28 letras del alfabeto árabe en su forma aislada.',
  },
  arabicNumbers: {
    id: 'arabicNumbers',
    name: 'Árabe (Números)',
    nativeName: 'الأرقام',
    direction: 'ltr',
    description: 'Los 10 dígitos arábigo-índicos (٠-٩) usados al escribir árabe a mano.',
  },
  arabicHarakat: {
    id: 'arabicHarakat',
    name: 'Árabe (Tashkil)',
    nativeName: 'التشكيل',
    direction: 'rtl',
    description: 'Los signos de vocales breves y duplicación (tashkil/harakat): fatha, damma, kasra, sukun, shadda y tanwin.',
  },
  arabicForms: {
    id: 'arabicForms',
    name: 'Árabe (Formas por posición)',
    nativeName: 'أشكال الحروف',
    direction: 'rtl',
    description: 'Las formas inicial, medial y final de cada letra árabe conectora, más la forma final de las letras que no se conectan a la izquierda.',
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
  korean: {
    id: 'korean',
    name: 'Coreano (Hangul)',
    nativeName: '한글',
    direction: 'ltr',
    description: 'Los 24 jamo básicos del hangul: 14 consonantes y 10 vocales.',
  },
  polish: {
    id: 'polish',
    name: 'Polaco',
    nativeName: 'Polski',
    direction: 'ltr',
    description: 'Las 32 letras del alfabeto polaco, incluidas ą, ć, ę, ł, ń, ó, ś, ź, ż.',
  },
  french: {
    id: 'french',
    name: 'Francés',
    nativeName: 'Français',
    direction: 'ltr',
    description: 'Las 26 letras del alfabeto francés, con el nombre real de cada letra.',
  },
  portuguese: {
    id: 'portuguese',
    name: 'Portugués',
    nativeName: 'Português',
    direction: 'ltr',
    description: 'Las 26 letras del alfabeto portugués, con el nombre real de cada letra.',
  },
  german: {
    id: 'german',
    name: 'Alemán',
    nativeName: 'Deutsch',
    direction: 'ltr',
    description: 'Las 26 letras del alfabeto alemán, más ä, ö, ü y la ß (Eszett).',
  },
  vietnamese: {
    id: 'vietnamese',
    name: 'Vietnamita',
    nativeName: 'Tiếng Việt',
    direction: 'ltr',
    description: 'Las 29 letras del alfabeto vietnamita, incluidas ă, â, đ, ê, ô, ơ, ư.',
  },
  spanish: {
    id: 'spanish',
    name: 'Español',
    nativeName: 'Español',
    direction: 'ltr',
    description: 'Las 27 letras del alfabeto español (con la ñ), las vocales con tilde y los signos de apertura ¡ ¿.',
  },
};

export const LANGUAGE_ORDER: LanguageId[] = [
  'kana',
  'kanji',
  'cyrillic',
  'cyrillicCursive',
  'hebrew',
  'niqqud',
  'hebrewFull',
  'hebrewCursive',
  'arabic',
  'arabicNumbers',
  'arabicHarakat',
  'arabicForms',
  'chinese',
  'turkish',
  'korean',
  'polish',
  'french',
  'portuguese',
  'german',
  'vietnamese',
  'spanish',
];

/** True for any language rendered in Hebrew script (letters, niqqud, or both). */
export function isHebrewScript(language: LanguageId): boolean {
  return language === 'hebrew' || language === 'niqqud' || language === 'hebrewFull' || language === 'hebrewCursive';
}

/**
 * The font-family class a glyph needs for its script, if any. Centralized
 * here so every place that renders a raw character (CharacterGrid,
 * TrainerView, ScriptGlyph) picks the same font - the cursive Hebrew data
 * is authored against Gveret Levin specifically, not the block-print Noto
 * Sans Hebrew the other Hebrew variants use, and both differ from Arabic.
 */
export function scriptFontClass(language: LanguageId): string {
  if (language === 'cyrillicCursive') return 'cyrillic-cursive-glyph';
  if (language === 'hebrewCursive') return 'hebrew-cursive-glyph';
  if (isHebrewScript(language)) return 'hebrew-glyph';
  if (
    language === 'arabic' ||
    language === 'arabicNumbers' ||
    language === 'arabicHarakat' ||
    language === 'arabicForms'
  )
    return 'arabic-glyph';
  return '';
}

/** True for any language that reads right-to-left, used for grid/layout direction. */
export function isRtl(language: LanguageId): boolean {
  return LANGUAGES[language].direction === 'rtl';
}
