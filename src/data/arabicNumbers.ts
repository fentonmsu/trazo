import type { CharacterTemplate } from '../types/character';

/**
 * The 10 Eastern Arabic-Indic digits (٠-٩) - the digit glyphs actually used
 * when writing Arabic by hand, distinct from the "Arabic numerals" (0-9)
 * used in Western typography. Shapes traced against Noto Naskh Arabic on a
 * 0-100 grid, same convention as the other data files (origin top-left, y
 * grows downward).
 *
 * `speechOverride` is each digit's real Arabic number word (the same
 * convention used for arabic.ts's letter names), so text-to-speech reads
 * real, natural Arabic instead of trying to pronounce a bare glyph.
 */
export const arabicNumberCharacters: CharacterTemplate[] = [
  {
    id: 'arabic-num-0',
    language: 'arabicNumbers',
    char: '٠',
    romanization: '0',
    meaning: 'cero',
    speechOverride: 'صفر',
    difficulty: 1,
    strokes: [
      [
        { x: 59, y: 50 },
        { x: 51, y: 43 },
        { x: 43, y: 51 },
        { x: 51, y: 59 },
        { x: 59, y: 50 },
      ],
    ],
  },
  {
    id: 'arabic-num-1',
    language: 'arabicNumbers',
    char: '١',
    romanization: '1',
    meaning: 'uno',
    speechOverride: 'واحد',
    difficulty: 1,
    strokes: [
      [
        { x: 48, y: 20 },
        { x: 45, y: 35 },
        { x: 48, y: 50 },
        { x: 53, y: 68 },
      ],
    ],
  },
  {
    id: 'arabic-num-2',
    language: 'arabicNumbers',
    char: '٢',
    romanization: '2',
    meaning: 'dos',
    speechOverride: 'اثنان',
    difficulty: 2,
    strokes: [
      [
        { x: 63, y: 24 },
        { x: 52, y: 19 },
        { x: 42, y: 26 },
        { x: 40, y: 33 },
        { x: 45, y: 35 },
        { x: 48, y: 48 },
        { x: 49, y: 60 },
        { x: 50, y: 70 },
      ],
    ],
  },
  {
    id: 'arabic-num-3',
    language: 'arabicNumbers',
    char: '٣',
    romanization: '3',
    meaning: 'tres',
    speechOverride: 'ثلاثة',
    difficulty: 3,
    strokes: [
      [
        { x: 63, y: 24 },
        { x: 56, y: 18 },
        { x: 50, y: 26 },
        { x: 44, y: 19 },
        { x: 38, y: 27 },
        { x: 41, y: 34 },
        { x: 46, y: 36 },
        { x: 48, y: 48 },
        { x: 49, y: 60 },
        { x: 48, y: 70 },
      ],
    ],
  },
  {
    id: 'arabic-num-4',
    language: 'arabicNumbers',
    char: '٤',
    romanization: '4',
    meaning: 'cuatro',
    speechOverride: 'أربعة',
    difficulty: 3,
    strokes: [
      [
        { x: 55, y: 20 },
        { x: 44, y: 34 },
        { x: 58, y: 50 },
        { x: 45, y: 58 },
        { x: 50, y: 62 },
        { x: 60, y: 61 },
        { x: 63, y: 57 },
      ],
    ],
  },
  {
    id: 'arabic-num-5',
    language: 'arabicNumbers',
    char: '٥',
    romanization: '5',
    meaning: 'cinco',
    speechOverride: 'خمسة',
    difficulty: 2,
    strokes: [
      [
        { x: 55, y: 30 },
        { x: 62, y: 45 },
        { x: 55, y: 62 },
        { x: 42, y: 58 },
        { x: 38, y: 42 },
        { x: 48, y: 30 },
        { x: 55, y: 30 },
      ],
    ],
  },
  {
    id: 'arabic-num-6',
    language: 'arabicNumbers',
    char: '٦',
    romanization: '6',
    meaning: 'seis',
    speechOverride: 'ستة',
    difficulty: 2,
    strokes: [
      [
        { x: 60, y: 24 },
        { x: 48, y: 32 },
        { x: 42, y: 30 },
        { x: 45, y: 45 },
        { x: 50, y: 58 },
        { x: 45, y: 66 },
      ],
    ],
  },
  {
    id: 'arabic-num-7',
    language: 'arabicNumbers',
    char: '٧',
    romanization: '7',
    meaning: 'siete',
    speechOverride: 'سبعة',
    difficulty: 1,
    strokes: [
      [
        { x: 42, y: 28 },
        { x: 50, y: 65 },
        { x: 60, y: 28 },
      ],
    ],
  },
  {
    id: 'arabic-num-8',
    language: 'arabicNumbers',
    char: '٨',
    romanization: '8',
    meaning: 'ocho',
    speechOverride: 'ثمانية',
    difficulty: 1,
    strokes: [
      [
        { x: 40, y: 65 },
        { x: 50, y: 22 },
        { x: 62, y: 65 },
      ],
    ],
  },
  {
    id: 'arabic-num-9',
    language: 'arabicNumbers',
    char: '٩',
    romanization: '9',
    meaning: 'nueve',
    speechOverride: 'تسعة',
    difficulty: 2,
    strokes: [
      [
        { x: 58, y: 28 },
        { x: 48, y: 22 },
        { x: 40, y: 32 },
        { x: 46, y: 44 },
        { x: 56, y: 40 },
        { x: 58, y: 30 },
        { x: 54, y: 45 },
        { x: 48, y: 58 },
        { x: 44, y: 67 },
      ],
    ],
  },
];
