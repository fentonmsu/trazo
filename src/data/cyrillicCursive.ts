import type { CharacterTemplate } from '../types/character';

/**
 * Hand-authored stroke-path data for the 33 Russian Cyrillic letters in
 * their cursive (прописью) form, uppercase and lowercase (66 templates).
 * Coordinates are on a normalized 0-100 grid (origin top-left, x grows right, y grows down), traced against
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
  // Lowercase (строчные) letters, same order as the uppercase set above;
  // each id adds a -lower suffix to its uppercase counterpart's id.
  {
    id: 'cyrillicCursive-a-lower',
    language: 'cyrillicCursive',
    char: 'а',
    romanization: 'a',
    strokes: [
      [
        { x: 70, y: 23 }, { x: 50, y: 26 }, { x: 32, y: 36 }, { x: 20, y: 52 },
        { x: 19, y: 68 }, { x: 27, y: 76 }, { x: 38, y: 72 }, { x: 52, y: 60 },
        { x: 65, y: 45 }, { x: 72, y: 36 }, { x: 66, y: 50 }, { x: 61, y: 63 },
        { x: 63, y: 72 }, { x: 70, y: 72 }, { x: 82, y: 65 },
      ],
    ],
    difficulty: 3,
  },
  {
    id: 'cyrillicCursive-be-lower',
    language: 'cyrillicCursive',
    char: 'б',
    romanization: 'b',
    strokes: [
      [
        { x: 49, y: 49 }, { x: 40, y: 54 }, { x: 32, y: 64 }, { x: 32, y: 77 },
        { x: 40, y: 85 }, { x: 50, y: 85 }, { x: 59, y: 75 }, { x: 61, y: 62 },
        { x: 56, y: 47 }, { x: 50, y: 35 }, { x: 45, y: 22 }, { x: 48, y: 14 },
        { x: 58, y: 12 }, { x: 70, y: 13 },
      ],
    ],
    difficulty: 4,
  },
  {
    id: 'cyrillicCursive-ve-lower',
    language: 'cyrillicCursive',
    char: 'в',
    romanization: 'v',
    strokes: [
      [
        { x: 26, y: 58 }, { x: 40, y: 53 }, { x: 52, y: 47 }, { x: 66, y: 38 },
        { x: 74, y: 24 }, { x: 70, y: 14 }, { x: 60, y: 13 }, { x: 52, y: 22 },
        { x: 46, y: 38 }, { x: 41, y: 55 }, { x: 39, y: 72 }, { x: 43, y: 83 },
        { x: 51, y: 84 }, { x: 60, y: 77 }, { x: 65, y: 66 }, { x: 64, y: 56 },
        { x: 57, y: 52 }, { x: 50, y: 55 },
      ],
    ],
    difficulty: 4,
  },
  {
    id: 'cyrillicCursive-ge-lower',
    language: 'cyrillicCursive',
    char: 'г',
    romanization: 'g',
    strokes: [
      [
        { x: 30, y: 28 }, { x: 42, y: 20 }, { x: 55, y: 14 }, { x: 65, y: 14 },
        { x: 68, y: 20 }, { x: 62, y: 32 }, { x: 50, y: 46 }, { x: 36, y: 62 },
        { x: 27, y: 76 }, { x: 32, y: 82 }, { x: 42, y: 80 }, { x: 55, y: 72 },
        { x: 68, y: 64 },
      ],
    ],
    difficulty: 3,
  },
  {
    id: 'cyrillicCursive-de-lower',
    language: 'cyrillicCursive',
    char: 'д',
    romanization: 'd',
    strokes: [
      [
        { x: 57, y: 13 }, { x: 46, y: 15 }, { x: 38, y: 25 }, { x: 38, y: 35 },
        { x: 44, y: 40 }, { x: 54, y: 35 }, { x: 62, y: 27 }, { x: 68, y: 22 },
        { x: 63, y: 40 }, { x: 58, y: 58 }, { x: 54, y: 72 }, { x: 47, y: 83 },
        { x: 39, y: 85 }, { x: 34, y: 78 }, { x: 37, y: 67 }, { x: 48, y: 58 },
        { x: 68, y: 47 },
      ],
    ],
    difficulty: 4,
  },
  {
    id: 'cyrillicCursive-ye-lower',
    language: 'cyrillicCursive',
    char: 'е',
    romanization: 'e',
    strokes: [
      [
        { x: 33, y: 58 }, { x: 50, y: 52 }, { x: 68, y: 43 }, { x: 78, y: 33 },
        { x: 78, y: 20 }, { x: 68, y: 13 }, { x: 55, y: 16 }, { x: 40, y: 28 },
        { x: 28, y: 45 }, { x: 25, y: 62 }, { x: 32, y: 75 }, { x: 45, y: 80 },
        { x: 60, y: 76 }, { x: 75, y: 66 },
      ],
    ],
    difficulty: 2,
  },
  {
    id: 'cyrillicCursive-yo-lower',
    language: 'cyrillicCursive',
    char: 'ё',
    romanization: 'yo',
    strokes: [
      [
        { x: 35, y: 63 }, { x: 50, y: 57 }, { x: 65, y: 48 }, { x: 72, y: 40 },
        { x: 72, y: 32 }, { x: 64, y: 28 }, { x: 50, y: 32 }, { x: 37, y: 45 },
        { x: 28, y: 60 }, { x: 27, y: 75 }, { x: 35, y: 82 }, { x: 48, y: 84 },
        { x: 60, y: 80 }, { x: 68, y: 72 },
      ],
      [{ x: 54, y: 16 }, { x: 57, y: 19 }],
      [{ x: 72, y: 16 }, { x: 75, y: 19 }],
    ],
    difficulty: 3,
  },
  {
    id: 'cyrillicCursive-zhe-lower',
    language: 'cyrillicCursive',
    char: 'ж',
    romanization: 'zh',
    strokes: [
      [{ x: 24, y: 22 }, { x: 37, y: 37 }, { x: 50, y: 48 }, { x: 64, y: 58 }, { x: 80, y: 73 }],
      [{ x: 50, y: 20 }, { x: 49, y: 45 }, { x: 46, y: 65 }, { x: 43, y: 78 }],
      [{ x: 79, y: 26 }, { x: 64, y: 35 }, { x: 50, y: 47 }, { x: 34, y: 62 }, { x: 17, y: 77 }],
    ],
    difficulty: 5,
  },
  {
    id: 'cyrillicCursive-ze-lower',
    language: 'cyrillicCursive',
    char: 'з',
    romanization: 'z',
    strokes: [
      [
        { x: 33, y: 33 }, { x: 48, y: 23 }, { x: 65, y: 17 }, { x: 77, y: 20 },
        { x: 80, y: 30 }, { x: 72, y: 40 }, { x: 57, y: 45 }, { x: 45, y: 47 },
        { x: 60, y: 52 }, { x: 70, y: 60 }, { x: 70, y: 72 }, { x: 60, y: 82 },
        { x: 45, y: 86 }, { x: 30, y: 85 }, { x: 18, y: 80 },
      ],
    ],
    difficulty: 4,
  },
  {
    id: 'cyrillicCursive-i-lower',
    language: 'cyrillicCursive',
    char: 'и',
    romanization: 'i',
    strokes: [
      [
        { x: 38, y: 22 }, { x: 31, y: 38 }, { x: 25, y: 55 }, { x: 24, y: 68 },
        { x: 30, y: 73 }, { x: 40, y: 68 }, { x: 52, y: 55 }, { x: 63, y: 40 },
        { x: 73, y: 23 }, { x: 66, y: 40 }, { x: 60, y: 58 }, { x: 58, y: 68 },
        { x: 62, y: 74 }, { x: 70, y: 72 }, { x: 78, y: 63 },
      ],
    ],
    difficulty: 3,
  },
  {
    id: 'cyrillicCursive-i-kratkoye-lower',
    language: 'cyrillicCursive',
    char: 'й',
    romanization: 'y',
    strokes: [
      [
        { x: 35, y: 30 }, { x: 28, y: 45 }, { x: 23, y: 60 }, { x: 24, y: 74 },
        { x: 30, y: 82 }, { x: 40, y: 77 }, { x: 52, y: 62 }, { x: 62, y: 45 },
        { x: 70, y: 30 }, { x: 65, y: 47 }, { x: 60, y: 63 }, { x: 59, y: 75 },
        { x: 64, y: 82 }, { x: 71, y: 79 }, { x: 77, y: 72 },
      ],
      [{ x: 38, y: 15 }, { x: 45, y: 22 }, { x: 55, y: 23 }, { x: 64, y: 15 }],
    ],
    difficulty: 4,
  },
  {
    id: 'cyrillicCursive-ka-lower',
    language: 'cyrillicCursive',
    char: 'к',
    romanization: 'k',
    strokes: [
      [{ x: 38, y: 15 }, { x: 33, y: 38 }, { x: 28, y: 62 }, { x: 24, y: 80 }],
      [
        { x: 73, y: 20 }, { x: 62, y: 24 }, { x: 52, y: 33 }, { x: 46, y: 45 },
        { x: 47, y: 58 }, { x: 53, y: 70 }, { x: 62, y: 77 }, { x: 70, y: 73 },
        { x: 78, y: 66 },
      ],
    ],
    difficulty: 3,
  },
  {
    id: 'cyrillicCursive-el-lower',
    language: 'cyrillicCursive',
    char: 'л',
    romanization: 'l',
    strokes: [
      [
        { x: 20, y: 62 }, { x: 22, y: 70 }, { x: 30, y: 72 }, { x: 40, y: 65 },
        { x: 50, y: 50 }, { x: 58, y: 35 }, { x: 65, y: 25 }, { x: 68, y: 30 },
        { x: 65, y: 45 }, { x: 61, y: 58 }, { x: 62, y: 72 }, { x: 68, y: 75 },
        { x: 77, y: 63 },
      ],
    ],
    difficulty: 3,
  },
  {
    id: 'cyrillicCursive-em-lower',
    language: 'cyrillicCursive',
    char: 'м',
    romanization: 'm',
    strokes: [
      [
        { x: 14, y: 62 }, { x: 18, y: 70 }, { x: 27, y: 68 }, { x: 37, y: 55 },
        { x: 46, y: 40 }, { x: 51, y: 33 }, { x: 52, y: 40 }, { x: 47, y: 55 },
        { x: 45, y: 65 }, { x: 50, y: 71 }, { x: 58, y: 65 }, { x: 67, y: 50 },
        { x: 77, y: 33 }, { x: 74, y: 45 }, { x: 69, y: 58 }, { x: 70, y: 70 },
        { x: 75, y: 72 }, { x: 82, y: 63 },
      ],
    ],
    difficulty: 4,
  },
  {
    id: 'cyrillicCursive-en-lower',
    language: 'cyrillicCursive',
    char: 'н',
    romanization: 'n',
    strokes: [
      [{ x: 55, y: 16 }, { x: 47, y: 32 }, { x: 37, y: 52 }, { x: 30, y: 68 }, { x: 27, y: 82 }],
      [{ x: 12, y: 55 }, { x: 30, y: 52 }, { x: 50, y: 49 }, { x: 65, y: 47 }],
      [{ x: 85, y: 17 }, { x: 75, y: 38 }, { x: 67, y: 55 }, { x: 63, y: 75 }],
    ],
    difficulty: 3,
  },
  {
    id: 'cyrillicCursive-o-lower',
    language: 'cyrillicCursive',
    char: 'о',
    romanization: 'o',
    strokes: [
      [
        { x: 70, y: 14 }, { x: 55, y: 14 }, { x: 40, y: 22 }, { x: 28, y: 38 },
        { x: 23, y: 55 }, { x: 26, y: 72 }, { x: 36, y: 82 }, { x: 50, y: 84 },
        { x: 62, y: 78 }, { x: 71, y: 64 }, { x: 74, y: 48 }, { x: 72, y: 35 },
        { x: 66, y: 28 },
      ],
    ],
    difficulty: 2,
  },
  {
    id: 'cyrillicCursive-pe-lower',
    language: 'cyrillicCursive',
    char: 'п',
    romanization: 'p',
    strokes: [
      [
        { x: 33, y: 18 }, { x: 26, y: 45 }, { x: 20, y: 65 }, { x: 17, y: 79 },
        { x: 22, y: 62 }, { x: 32, y: 43 }, { x: 42, y: 30 }, { x: 52, y: 25 },
        { x: 60, y: 30 }, { x: 60, y: 42 }, { x: 56, y: 57 }, { x: 56, y: 70 },
        { x: 62, y: 75 }, { x: 70, y: 71 }, { x: 78, y: 62 },
      ],
    ],
    difficulty: 3,
  },
  {
    id: 'cyrillicCursive-er-lower',
    language: 'cyrillicCursive',
    char: 'р',
    romanization: 'r',
    strokes: [
      [
        { x: 38, y: 12 }, { x: 42, y: 17 }, { x: 42, y: 28 }, { x: 36, y: 48 },
        { x: 28, y: 70 }, { x: 21, y: 88 },
      ],
      [
        { x: 40, y: 40 }, { x: 50, y: 22 }, { x: 62, y: 15 }, { x: 72, y: 17 },
        { x: 75, y: 27 }, { x: 70, y: 40 }, { x: 60, y: 47 }, { x: 46, y: 48 },
      ],
    ],
    difficulty: 3,
  },
  {
    id: 'cyrillicCursive-es-lower',
    language: 'cyrillicCursive',
    char: 'с',
    romanization: 's',
    strokes: [
      [
        { x: 82, y: 13 }, { x: 65, y: 13 }, { x: 45, y: 22 }, { x: 28, y: 38 },
        { x: 18, y: 55 }, { x: 17, y: 70 }, { x: 25, y: 80 }, { x: 40, y: 82 },
        { x: 55, y: 76 }, { x: 69, y: 64 },
      ],
    ],
    difficulty: 2,
  },
  {
    id: 'cyrillicCursive-te-lower',
    language: 'cyrillicCursive',
    char: 'т',
    romanization: 't',
    strokes: [
      [
        { x: 28, y: 28 }, { x: 22, y: 48 }, { x: 16, y: 67 }, { x: 21, y: 52 },
        { x: 30, y: 38 }, { x: 40, y: 31 }, { x: 47, y: 33 }, { x: 46, y: 45 },
        { x: 44, y: 57 }, { x: 42, y: 67 }, { x: 45, y: 55 }, { x: 52, y: 40 },
        { x: 60, y: 33 }, { x: 70, y: 31 }, { x: 76, y: 37 }, { x: 72, y: 48 },
        { x: 69, y: 59 }, { x: 73, y: 66 }, { x: 82, y: 58 },
      ],
    ],
    difficulty: 4,
  },
  {
    id: 'cyrillicCursive-u-lower',
    language: 'cyrillicCursive',
    char: 'у',
    romanization: 'u',
    strokes: [
      [
        { x: 44, y: 12 }, { x: 39, y: 25 }, { x: 39, y: 37 }, { x: 45, y: 43 },
        { x: 53, y: 40 }, { x: 60, y: 32 }, { x: 66, y: 22 }, { x: 61, y: 42 },
        { x: 57, y: 60 }, { x: 52, y: 76 }, { x: 44, y: 85 }, { x: 36, y: 85 },
        { x: 32, y: 77 }, { x: 38, y: 67 }, { x: 52, y: 57 }, { x: 67, y: 47 },
      ],
    ],
    difficulty: 3,
  },
  {
    id: 'cyrillicCursive-ef-lower',
    language: 'cyrillicCursive',
    char: 'ф',
    romanization: 'f',
    strokes: [
      [
        { x: 48, y: 62 }, { x: 38, y: 61 }, { x: 30, y: 55 }, { x: 29, y: 45 },
        { x: 36, y: 38 }, { x: 45, y: 36 },
      ],
      [{ x: 58, y: 12 }, { x: 55, y: 35 }, { x: 52, y: 58 }, { x: 49, y: 85 }],
      [{ x: 48, y: 62 }, { x: 58, y: 62 }, { x: 65, y: 55 }, { x: 68, y: 45 }, { x: 65, y: 38 }],
    ],
    difficulty: 4,
  },
  {
    id: 'cyrillicCursive-kha-lower',
    language: 'cyrillicCursive',
    char: 'х',
    romanization: 'kh',
    strokes: [
      [{ x: 37, y: 18 }, { x: 42, y: 35 }, { x: 48, y: 52 }, { x: 58, y: 70 }, { x: 72, y: 82 }],
      [{ x: 82, y: 20 }, { x: 65, y: 32 }, { x: 50, y: 45 }, { x: 35, y: 62 }, { x: 18, y: 80 }],
    ],
    difficulty: 3,
  },
  {
    id: 'cyrillicCursive-tse-lower',
    language: 'cyrillicCursive',
    char: 'ц',
    romanization: 'ts',
    strokes: [
      [
        { x: 40, y: 20 }, { x: 32, y: 38 }, { x: 25, y: 55 }, { x: 23, y: 65 },
        { x: 28, y: 70 }, { x: 38, y: 66 }, { x: 50, y: 52 }, { x: 60, y: 35 },
        { x: 66, y: 20 }, { x: 60, y: 40 }, { x: 55, y: 57 }, { x: 55, y: 66 },
        { x: 62, y: 70 }, { x: 72, y: 62 }, { x: 80, y: 55 }, { x: 84, y: 60 },
        { x: 80, y: 72 }, { x: 76, y: 82 },
      ],
    ],
    difficulty: 4,
  },
  {
    id: 'cyrillicCursive-che-lower',
    language: 'cyrillicCursive',
    char: 'ч',
    romanization: 'ch',
    strokes: [
      [
        { x: 36, y: 14 }, { x: 27, y: 30 }, { x: 22, y: 45 }, { x: 27, y: 52 },
        { x: 38, y: 51 }, { x: 52, y: 42 }, { x: 66, y: 28 }, { x: 77, y: 16 },
        { x: 70, y: 32 }, { x: 62, y: 50 }, { x: 56, y: 68 }, { x: 58, y: 79 },
        { x: 66, y: 80 }, { x: 77, y: 70 },
      ],
    ],
    difficulty: 3,
  },
  {
    id: 'cyrillicCursive-sha-lower',
    language: 'cyrillicCursive',
    char: 'ш',
    romanization: 'sh',
    strokes: [
      [
        { x: 30, y: 28 }, { x: 24, y: 45 }, { x: 20, y: 62 }, { x: 24, y: 68 },
        { x: 32, y: 64 }, { x: 43, y: 48 }, { x: 52, y: 28 }, { x: 49, y: 45 },
        { x: 46, y: 58 }, { x: 48, y: 67 }, { x: 56, y: 64 }, { x: 68, y: 50 },
        { x: 82, y: 28 }, { x: 76, y: 45 }, { x: 71, y: 58 }, { x: 73, y: 67 },
        { x: 80, y: 64 }, { x: 87, y: 56 },
      ],
    ],
    difficulty: 4,
  },
  {
    id: 'cyrillicCursive-shcha-lower',
    language: 'cyrillicCursive',
    char: 'щ',
    romanization: 'shch',
    strokes: [
      [
        { x: 25, y: 29 }, { x: 20, y: 45 }, { x: 18, y: 58 }, { x: 23, y: 63 },
        { x: 32, y: 57 }, { x: 40, y: 43 }, { x: 46, y: 30 }, { x: 43, y: 45 },
        { x: 41, y: 57 }, { x: 45, y: 63 }, { x: 53, y: 58 }, { x: 62, y: 45 },
        { x: 68, y: 32 }, { x: 64, y: 45 }, { x: 61, y: 56 }, { x: 64, y: 62 },
        { x: 72, y: 57 }, { x: 80, y: 50 }, { x: 84, y: 55 }, { x: 82, y: 65 },
        { x: 78, y: 74 },
      ],
    ],
    difficulty: 5,
  },
  {
    id: 'cyrillicCursive-hard-sign-lower',
    language: 'cyrillicCursive',
    char: 'ъ',
    romanization: '"',
    strokes: [
      [
        { x: 18, y: 32 }, { x: 27, y: 25 }, { x: 38, y: 18 }, { x: 47, y: 17 },
        { x: 52, y: 22 }, { x: 50, y: 30 }, { x: 42, y: 52 }, { x: 34, y: 72 },
        { x: 33, y: 82 }, { x: 40, y: 87 }, { x: 52, y: 84 }, { x: 65, y: 74 },
        { x: 74, y: 60 }, { x: 72, y: 50 }, { x: 63, y: 47 }, { x: 50, y: 50 },
        { x: 42, y: 55 },
      ],
    ],
    difficulty: 4,
  },
  {
    id: 'cyrillicCursive-yery-lower',
    language: 'cyrillicCursive',
    char: 'ы',
    romanization: 'y',
    strokes: [
      [
        { x: 37, y: 18 }, { x: 32, y: 38 }, { x: 26, y: 60 }, { x: 25, y: 75 },
        { x: 30, y: 83 }, { x: 39, y: 80 }, { x: 47, y: 70 }, { x: 50, y: 58 },
        { x: 44, y: 50 }, { x: 33, y: 53 },
      ],
      [{ x: 85, y: 18 }, { x: 78, y: 45 }, { x: 72, y: 68 }, { x: 68, y: 82 }],
    ],
    difficulty: 4,
  },
  {
    id: 'cyrillicCursive-soft-sign-lower',
    language: 'cyrillicCursive',
    char: 'ь',
    romanization: "'",
    strokes: [
      [
        { x: 50, y: 13 }, { x: 43, y: 35 }, { x: 35, y: 60 }, { x: 33, y: 78 },
        { x: 40, y: 86 }, { x: 52, y: 82 }, { x: 65, y: 70 }, { x: 73, y: 57 },
        { x: 70, y: 48 }, { x: 60, y: 47 }, { x: 48, y: 50 }, { x: 40, y: 55 },
      ],
    ],
    difficulty: 3,
  },
  {
    id: 'cyrillicCursive-e-lower',
    language: 'cyrillicCursive',
    char: 'э',
    romanization: 'e',
    strokes: [
      [
        { x: 27, y: 28 }, { x: 38, y: 20 }, { x: 52, y: 15 }, { x: 65, y: 15 },
        { x: 72, y: 25 }, { x: 72, y: 40 }, { x: 66, y: 55 }, { x: 55, y: 68 },
        { x: 40, y: 78 }, { x: 25, y: 87 },
      ],
      [{ x: 35, y: 46 }, { x: 50, y: 47 }, { x: 65, y: 48 }, { x: 78, y: 47 }],
    ],
    difficulty: 3,
  },
  {
    id: 'cyrillicCursive-yu-lower',
    language: 'cyrillicCursive',
    char: 'ю',
    romanization: 'yu',
    strokes: [
      [{ x: 42, y: 13 }, { x: 37, y: 25 }, { x: 30, y: 42 }, { x: 25, y: 58 }, { x: 22, y: 77 }],
      [{ x: 12, y: 56 }, { x: 28, y: 53 }, { x: 45, y: 50 }, { x: 55, y: 49 }],
      [
        { x: 80, y: 20 }, { x: 68, y: 24 }, { x: 57, y: 38 }, { x: 52, y: 55 },
        { x: 55, y: 70 }, { x: 65, y: 76 }, { x: 76, y: 70 }, { x: 84, y: 55 },
        { x: 84, y: 40 }, { x: 80, y: 32 },
      ],
    ],
    difficulty: 4,
  },
  {
    id: 'cyrillicCursive-ya-lower',
    language: 'cyrillicCursive',
    char: 'я',
    romanization: 'ya',
    strokes: [
      [
        { x: 14, y: 66 }, { x: 18, y: 76 }, { x: 27, y: 78 }, { x: 38, y: 70 },
        { x: 48, y: 58 }, { x: 52, y: 48 }, { x: 40, y: 48 }, { x: 27, y: 44 },
        { x: 22, y: 33 }, { x: 28, y: 20 }, { x: 42, y: 13 }, { x: 55, y: 15 },
        { x: 60, y: 25 }, { x: 60, y: 40 },
      ],
      [{ x: 85, y: 17 }, { x: 78, y: 40 }, { x: 72, y: 62 }, { x: 67, y: 82 }],
    ],
    difficulty: 5,
  },
];
