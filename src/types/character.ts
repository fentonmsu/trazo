export interface Point {
  x: number;
  y: number;
}

/** A single stroke: an ordered list of points as the pen travels, in drawing order. */
export type Stroke = Point[];

export type LanguageId = 'kana' | 'kanji' | 'cyrillic' | 'hebrew';

export interface LanguageInfo {
  id: LanguageId;
  name: string;
  nativeName: string;
  direction: 'ltr' | 'rtl';
  description: string;
}

export interface CharacterTemplate {
  /** Unique id, e.g. "kana-a", "cyrillic-zhe", "hebrew-alef" */
  id: string;
  language: LanguageId;
  /** The actual character glyph, e.g. "あ", "Ж", "א" */
  char: string;
  /** Romanized reading / transliteration, e.g. "a", "zh", "alef" */
  romanization: string;
  /** Optional meaning (mainly for kanji) */
  meaning?: string;
  /**
   * Reference strokes in correct drawing order, authored on a 0-100 x 0-100
   * normalized grid (origin top-left, y grows downward, matches canvas coords).
   * Each stroke only needs enough key points to define its shape; the
   * recognizer resamples at runtime.
   */
  strokes: Stroke[];
  /** Relative difficulty, 1 (easiest) - 5 (hardest), used for sorting/progress. */
  difficulty?: number;
}

export interface CharacterSet {
  language: LanguageId;
  characters: CharacterTemplate[];
}
