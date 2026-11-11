import type { CharacterTemplate } from '../types/character';

/**
 * Hand-authored stroke-path data for the 33 uppercase Russian Cyrillic
 * letters in their cursive (прописью) form. Coordinates are on a normalized
 * 0-100 grid (origin top-left, x grows right, y grows down), traced against
 * the rendered shape of the Marck Script font (see .cyrillic-cursive-glyph
 * in App.css), which renders authentic Russian school-cursive letterforms
 * rather than a generic Latin script face.
 *
 * Each letter keeps the same id suffix and romanization as its block-print
 * counterpart (cyrillic.ts) so the two sets stay easy to cross-reference;
 * only the strokes differ, to capture the cursive shape instead of print.
 */
export const cyrillicCursiveCharacters: CharacterTemplate[] = [
  {
    id: 'cyrillicCursive-a',
    language: 'cyrillicCursive',
    char: 'А',
    romanization: 'a',
    strokes: [
      [
        { x: 78, y: 16 }, { x: 50, y: 38 }, { x: 27, y: 58 }, { x: 17, y: 66 },
        { x: 30, y: 73 }, { x: 45, y: 71 }, { x: 36, y: 60 }, { x: 50, y: 48 },
        { x: 60, y: 45 }, { x: 70, y: 55 }, { x: 76, y: 68 },
      ],
    ],
    difficulty: 3,
  },
  {
    id: 'cyrillicCursive-be',
    language: 'cyrillicCursive',
    char: 'Б',
    romanization: 'b',
    strokes: [
      [{ x: 20, y: 33 }, { x: 35, y: 18 }, { x: 55, y: 16 }, { x: 68, y: 22 }, { x: 72, y: 30 }],
      [
        { x: 30, y: 20 }, { x: 30, y: 68 }, { x: 33, y: 70 }, { x: 50, y: 68 },
        { x: 63, y: 58 }, { x: 65, y: 48 }, { x: 55, y: 35 }, { x: 35, y: 33 }, { x: 30, y: 38 },
      ],
    ],
    difficulty: 4,
  },
  {
    id: 'cyrillicCursive-ve',
    language: 'cyrillicCursive',
    char: 'В',
    romanization: 'v',
    strokes: [
      [
        { x: 95, y: 20 }, { x: 70, y: 15 }, { x: 50, y: 22 }, { x: 45, y: 35 },
        { x: 60, y: 48 }, { x: 90, y: 55 }, { x: 60, y: 60 }, { x: 45, y: 70 },
        { x: 50, y: 80 }, { x: 70, y: 83 }, { x: 90, y: 75 },
      ],
    ],
    difficulty: 4,
  },
  {
    id: 'cyrillicCursive-ge',
    language: 'cyrillicCursive',
    char: 'Г',
    romanization: 'g',
    strokes: [
      [{ x: 15, y: 35 }, { x: 22, y: 20 }, { x: 35, y: 17 }, { x: 60, y: 17 }, { x: 78, y: 19 }, { x: 83, y: 13 }],
      [{ x: 30, y: 25 }, { x: 22, y: 45 }, { x: 18, y: 60 }, { x: 15, y: 68 }, { x: 25, y: 72 }, { x: 35, y: 65 }],
    ],
    difficulty: 2,
  },
  {
    id: 'cyrillicCursive-de',
    language: 'cyrillicCursive',
    char: 'Д',
    romanization: 'd',
    strokes: [
      [
        { x: 55, y: 18 }, { x: 72, y: 25 }, { x: 78, y: 40 }, { x: 72, y: 58 },
        { x: 55, y: 68 }, { x: 40, y: 62 }, { x: 38, y: 45 }, { x: 48, y: 28 }, { x: 55, y: 18 },
      ],
      [{ x: 58, y: 28 }, { x: 58, y: 65 }, { x: 50, y: 78 }, { x: 35, y: 82 }, { x: 30, y: 72 }, { x: 40, y: 62 }],
    ],
    difficulty: 5,
  },
  {
    id: 'cyrillicCursive-ye',
    language: 'cyrillicCursive',
    char: 'Е',
    romanization: 'e',
    strokes: [
      [
        { x: 68, y: 18 }, { x: 35, y: 25 }, { x: 28, y: 45 }, { x: 50, y: 55 },
        { x: 62, y: 65 }, { x: 40, y: 72 }, { x: 22, y: 78 }, { x: 17, y: 72 },
      ],
    ],
    difficulty: 3,
  },
  {
    id: 'cyrillicCursive-yo',
    language: 'cyrillicCursive',
    char: 'Ё',
    romanization: 'yo',
    strokes: [
      [
        { x: 60, y: 35 }, { x: 28, y: 42 }, { x: 18, y: 56 }, { x: 35, y: 66 },
        { x: 50, y: 58 }, { x: 35, y: 50 }, { x: 20, y: 60 }, { x: 15, y: 72 }, { x: 20, y: 78 },
      ],
      [{ x: 56, y: 6 }, { x: 59, y: 9 }],
      [{ x: 70, y: 6 }, { x: 73, y: 9 }],
    ],
    difficulty: 4,
  },
  {
    id: 'cyrillicCursive-zhe',
    language: 'cyrillicCursive',
    char: 'Ж',
    romanization: 'zh',
    strokes: [
      [{ x: 10, y: 32 }, { x: 35, y: 18 }, { x: 55, y: 28 }, { x: 40, y: 45 }, { x: 20, y: 60 }, { x: 38, y: 68 }],
      [{ x: 62, y: 22 }, { x: 85, y: 30 }, { x: 70, y: 48 }, { x: 50, y: 55 }, { x: 65, y: 65 }, { x: 80, y: 70 }],
    ],
    difficulty: 5,
  },
  {
    id: 'cyrillicCursive-ze',
    language: 'cyrillicCursive',
    char: 'З',
    romanization: 'z',
    strokes: [
      [
        { x: 50, y: 18 }, { x: 70, y: 22 }, { x: 68, y: 38 }, { x: 48, y: 48 },
        { x: 85, y: 55 }, { x: 65, y: 62 }, { x: 68, y: 75 }, { x: 48, y: 82 }, { x: 40, y: 72 },
      ],
    ],
    difficulty: 4,
  },
  {
    id: 'cyrillicCursive-i',
    language: 'cyrillicCursive',
    char: 'И',
    romanization: 'i',
    strokes: [
      [
        { x: 20, y: 18 }, { x: 17, y: 52 }, { x: 28, y: 62 }, { x: 57, y: 20 },
        { x: 60, y: 52 }, { x: 70, y: 65 }, { x: 62, y: 58 },
      ],
    ],
    difficulty: 3,
  },
  {
    id: 'cyrillicCursive-i-kratkoye',
    language: 'cyrillicCursive',
    char: 'Й',
    romanization: 'y',
    strokes: [
      [
        { x: 20, y: 18 }, { x: 17, y: 52 }, { x: 28, y: 62 }, { x: 57, y: 20 },
        { x: 60, y: 52 }, { x: 70, y: 65 }, { x: 62, y: 58 },
      ],
      [{ x: 58, y: 8 }, { x: 65, y: 16 }, { x: 73, y: 7 }],
    ],
    difficulty: 4,
  },
  {
    id: 'cyrillicCursive-ka',
    language: 'cyrillicCursive',
    char: 'К',
    romanization: 'k',
    strokes: [
      [{ x: 62, y: 18 }, { x: 35, y: 28 }, { x: 20, y: 45 }, { x: 18, y: 65 }, { x: 28, y: 72 }],
      [{ x: 30, y: 48 }, { x: 55, y: 58 }, { x: 85, y: 70 }],
    ],
    difficulty: 3,
  },
  {
    id: 'cyrillicCursive-el',
    language: 'cyrillicCursive',
    char: 'Л',
    romanization: 'l',
    strokes: [
      [{ x: 18, y: 72 }, { x: 30, y: 60 }, { x: 55, y: 18 }, { x: 65, y: 55 }, { x: 72, y: 72 }, { x: 62, y: 78 }],
    ],
    difficulty: 3,
  },
  {
    id: 'cyrillicCursive-em',
    language: 'cyrillicCursive',
    char: 'М',
    romanization: 'm',
    strokes: [
      [
        { x: 35, y: 78 }, { x: 45, y: 55 }, { x: 42, y: 20 }, { x: 60, y: 52 },
        { x: 78, y: 18 }, { x: 72, y: 60 }, { x: 68, y: 78 },
      ],
    ],
    difficulty: 4,
  },
  {
    id: 'cyrillicCursive-en',
    language: 'cyrillicCursive',
    char: 'Н',
    romanization: 'n',
    strokes: [
      [
        { x: 62, y: 78 }, { x: 48, y: 55 }, { x: 58, y: 25 }, { x: 75, y: 20 },
        { x: 95, y: 55 }, { x: 93, y: 68 }, { x: 85, y: 72 },
      ],
    ],
    difficulty: 3,
  },
  {
    id: 'cyrillicCursive-o',
    language: 'cyrillicCursive',
    char: 'О',
    romanization: 'o',
    strokes: [
      [
        { x: 55, y: 20 }, { x: 28, y: 28 }, { x: 17, y: 48 }, { x: 25, y: 65 },
        { x: 48, y: 73 }, { x: 63, y: 60 }, { x: 62, y: 42 }, { x: 45, y: 30 },
        { x: 55, y: 38 }, { x: 82, y: 38 },
      ],
    ],
    difficulty: 2,
  },
  {
    id: 'cyrillicCursive-pe',
    language: 'cyrillicCursive',
    char: 'П',
    romanization: 'p',
    strokes: [
      [{ x: 48, y: 68 }, { x: 45, y: 35 }, { x: 30, y: 22 }, { x: 48, y: 18 }, { x: 65, y: 20 }, { x: 78, y: 18 }, { x: 84, y: 12 }],
      [{ x: 62, y: 28 }, { x: 62, y: 55 }, { x: 65, y: 68 }],
    ],
    difficulty: 3,
  },
  {
    id: 'cyrillicCursive-er',
    language: 'cyrillicCursive',
    char: 'Р',
    romanization: 'r',
    strokes: [
      [
        { x: 55, y: 20 }, { x: 82, y: 25 }, { x: 80, y: 48 }, { x: 55, y: 55 },
        { x: 48, y: 40 }, { x: 60, y: 62 }, { x: 48, y: 78 }, { x: 32, y: 70 }, { x: 40, y: 58 },
      ],
    ],
    difficulty: 3,
  },
  {
    id: 'cyrillicCursive-es',
    language: 'cyrillicCursive',
    char: 'С',
    romanization: 's',
    strokes: [
      [{ x: 65, y: 25 }, { x: 35, y: 18 }, { x: 20, y: 32 }, { x: 15, y: 50 }, { x: 20, y: 65 }, { x: 38, y: 68 }],
    ],
    difficulty: 2,
  },
  {
    id: 'cyrillicCursive-te',
    language: 'cyrillicCursive',
    char: 'Т',
    romanization: 't',
    strokes: [
      [{ x: 45, y: 65 }, { x: 42, y: 35 }, { x: 28, y: 22 }, { x: 45, y: 18 }, { x: 62, y: 20 }, { x: 78, y: 18 }, { x: 85, y: 10 }],
      [{ x: 60, y: 28 }, { x: 62, y: 55 }, { x: 65, y: 68 }],
    ],
    difficulty: 2,
  },
  {
    id: 'cyrillicCursive-u',
    language: 'cyrillicCursive',
    char: 'У',
    romanization: 'u',
    strokes: [
      [{ x: 48, y: 18 }, { x: 65, y: 45 }, { x: 70, y: 58 }],
      [
        { x: 90, y: 22 }, { x: 72, y: 45 }, { x: 65, y: 60 }, { x: 90, y: 75 },
        { x: 78, y: 90 }, { x: 62, y: 78 }, { x: 72, y: 62 },
      ],
    ],
    difficulty: 3,
  },
  {
    id: 'cyrillicCursive-ef',
    language: 'cyrillicCursive',
    char: 'Ф',
    romanization: 'f',
    strokes: [
      [{ x: 62, y: 15 }, { x: 58, y: 75 }],
      [
        { x: 58, y: 28 }, { x: 35, y: 30 }, { x: 20, y: 45 }, { x: 30, y: 62 },
        { x: 55, y: 65 }, { x: 80, y: 60 }, { x: 88, y: 45 }, { x: 75, y: 30 }, { x: 58, y: 30 },
      ],
    ],
    difficulty: 4,
  },
  {
    id: 'cyrillicCursive-kha',
    language: 'cyrillicCursive',
    char: 'Х',
    romanization: 'kh',
    strokes: [
      [{ x: 22, y: 25 }, { x: 68, y: 70 }],
      [{ x: 70, y: 20 }, { x: 20, y: 68 }],
    ],
    difficulty: 2,
  },
  {
    id: 'cyrillicCursive-tse',
    language: 'cyrillicCursive',
    char: 'Ц',
    romanization: 'ts',
    strokes: [
      [{ x: 48, y: 20 }, { x: 42, y: 45 }, { x: 50, y: 60 }, { x: 65, y: 50 }, { x: 68, y: 20 }],
      [{ x: 62, y: 55 }, { x: 72, y: 62 }, { x: 68, y: 72 }],
    ],
    difficulty: 4,
  },
  {
    id: 'cyrillicCursive-che',
    language: 'cyrillicCursive',
    char: 'Ч',
    romanization: 'ch',
    strokes: [
      [{ x: 18, y: 35 }, { x: 30, y: 18 }, { x: 42, y: 28 }, { x: 35, y: 45 }, { x: 33, y: 68 }, { x: 22, y: 75 }, { x: 20, y: 68 }],
    ],
    difficulty: 3,
  },
  {
    id: 'cyrillicCursive-sha',
    language: 'cyrillicCursive',
    char: 'Ш',
    romanization: 'sh',
    strokes: [
      [
        { x: 15, y: 20 }, { x: 12, y: 55 }, { x: 42, y: 60 }, { x: 40, y: 20 },
        { x: 68, y: 60 }, { x: 62, y: 20 }, { x: 80, y: 18 },
      ],
    ],
    difficulty: 4,
  },
  {
    id: 'cyrillicCursive-shcha',
    language: 'cyrillicCursive',
    char: 'Щ',
    romanization: 'shch',
    strokes: [
      [
        { x: 15, y: 20 }, { x: 12, y: 55 }, { x: 42, y: 60 }, { x: 40, y: 20 },
        { x: 68, y: 60 }, { x: 62, y: 20 }, { x: 95, y: 25 },
      ],
      [{ x: 88, y: 48 }, { x: 100, y: 65 }, { x: 90, y: 72 }, { x: 95, y: 60 }],
    ],
    difficulty: 5,
  },
  {
    id: 'cyrillicCursive-hard-sign',
    language: 'cyrillicCursive',
    char: 'Ъ',
    romanization: '"',
    strokes: [
      [{ x: 15, y: 25 }, { x: 38, y: 18 }, { x: 42, y: 35 }, { x: 40, y: 55 }],
      [{ x: 40, y: 55 }, { x: 68, y: 52 }, { x: 78, y: 62 }, { x: 65, y: 75 }, { x: 42, y: 72 }, { x: 40, y: 58 }],
    ],
    difficulty: 5,
  },
  {
    id: 'cyrillicCursive-yery',
    language: 'cyrillicCursive',
    char: 'Ы',
    romanization: 'y',
    strokes: [
      [{ x: 48, y: 20 }, { x: 45, y: 55 }, { x: 52, y: 68 }, { x: 72, y: 65 }, { x: 75, y: 50 }, { x: 60, y: 42 }, { x: 46, y: 48 }],
      [{ x: 88, y: 18 }, { x: 82, y: 45 }, { x: 85, y: 70 }, { x: 92, y: 62 }],
    ],
    difficulty: 5,
  },
  {
    id: 'cyrillicCursive-soft-sign',
    language: 'cyrillicCursive',
    char: 'Ь',
    romanization: "'",
    strokes: [
      [{ x: 55, y: 20 }, { x: 50, y: 55 }, { x: 58, y: 68 }, { x: 82, y: 62 }, { x: 85, y: 48 }, { x: 68, y: 40 }, { x: 52, y: 48 }],
    ],
    difficulty: 3,
  },
  {
    id: 'cyrillicCursive-e',
    language: 'cyrillicCursive',
    char: 'Э',
    romanization: 'e',
    strokes: [
      [{ x: 22, y: 20 }, { x: 55, y: 18 }, { x: 62, y: 30 }, { x: 38, y: 40 }, { x: 18, y: 55 }, { x: 30, y: 67 }, { x: 58, y: 65 }],
      [{ x: 62, y: 33 }, { x: 78, y: 30 }],
    ],
    difficulty: 3,
  },
  {
    id: 'cyrillicCursive-yu',
    language: 'cyrillicCursive',
    char: 'Ю',
    romanization: 'yu',
    strokes: [
      [{ x: 30, y: 28 }, { x: 45, y: 18 }, { x: 48, y: 40 }, { x: 45, y: 65 }, { x: 50, y: 70 }],
      [
        { x: 62, y: 20 }, { x: 88, y: 25 }, { x: 98, y: 45 }, { x: 85, y: 63 },
        { x: 60, y: 68 }, { x: 50, y: 55 }, { x: 55, y: 40 }, { x: 75, y: 30 }, { x: 95, y: 30 },
      ],
    ],
    difficulty: 4,
  },
  {
    id: 'cyrillicCursive-ya',
    language: 'cyrillicCursive',
    char: 'Я',
    romanization: 'ya',
    strokes: [
      [
        { x: 68, y: 18 }, { x: 50, y: 22 }, { x: 42, y: 38 }, { x: 55, y: 48 },
        { x: 68, y: 40 }, { x: 60, y: 60 }, { x: 25, y: 75 }, { x: 18, y: 68 },
      ],
    ],
    difficulty: 5,
  },
];
