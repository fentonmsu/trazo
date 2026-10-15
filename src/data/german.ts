import type { CharacterTemplate, Stroke } from '../types/character';

/**
 * The 26 letters of the German alphabet (uppercase) plus its four extra
 * letters: the umlauts Ä, Ö, Ü and the Eszett/scharfes S (ß).
 *
 * `romanization`/`speechOverride` are each letter's real German name (used
 * reciting the alphabet, e.g. J = "jot", V = "fau", W = "we", Y = "ypsilon",
 * Z = "zett", ß = "Eszett"), since several letters don't sound like a naive
 * reading of the glyph.
 *
 * Coordinates are on a normalized 0-100 grid (origin top-left, y grows
 * downward) - see turkish.ts for the same convention and several of the
 * same base-letter shapes.
 */

const C_CURVE: Stroke = [
  { x: 75, y: 25 },
  { x: 50, y: 15 },
  { x: 25, y: 30 },
  { x: 20, y: 50 },
  { x: 25, y: 70 },
  { x: 50, y: 85 },
  { x: 75, y: 75 },
];

const G_HOOK: Stroke = [
  { x: 75, y: 55 },
  { x: 75, y: 72 },
  { x: 55, y: 72 },
];

const S_CURVE: Stroke = [
  { x: 72, y: 25 },
  { x: 50, y: 15 },
  { x: 28, y: 25 },
  { x: 28, y: 42 },
  { x: 50, y: 50 },
  { x: 72, y: 58 },
  { x: 72, y: 75 },
  { x: 50, y: 85 },
  { x: 28, y: 75 },
];

const O_LOOP: Stroke = [
  { x: 50, y: 15 },
  { x: 25, y: 25 },
  { x: 18, y: 50 },
  { x: 25, y: 75 },
  { x: 50, y: 85 },
  { x: 75, y: 75 },
  { x: 82, y: 50 },
  { x: 75, y: 25 },
  { x: 50, y: 15 },
];

const U_CURVE: Stroke = [
  { x: 25, y: 15 },
  { x: 25, y: 65 },
  { x: 35, y: 82 },
  { x: 50, y: 87 },
  { x: 65, y: 82 },
  { x: 75, y: 65 },
  { x: 75, y: 15 },
];

const A_STROKES: Stroke[] = [
  [{ x: 20, y: 85 }, { x: 50, y: 15 }],
  [{ x: 50, y: 15 }, { x: 80, y: 85 }],
  [{ x: 32, y: 55 }, { x: 68, y: 55 }],
];

// Umlaut (¨) - two dots side by side above the letter.
const UMLAUT: Stroke[] = [
  [{ x: 38, y: -2 }, { x: 42, y: 2 }],
  [{ x: 58, y: -2 }, { x: 62, y: 2 }],
];

const RAW_GERMAN_LETTERS: CharacterTemplate[] = [
  { id: 'german-a', char: 'A', romanization: 'a', language: 'german', difficulty: 1, strokes: A_STROKES },
  {
    id: 'german-b',
    char: 'B',
    romanization: 'be',
    language: 'german',
    difficulty: 2,
    strokes: [
      [{ x: 25, y: 15 }, { x: 25, y: 85 }],
      [{ x: 25, y: 15 }, { x: 60, y: 15 }, { x: 70, y: 30 }, { x: 60, y: 50 }, { x: 25, y: 50 }],
      [{ x: 25, y: 50 }, { x: 65, y: 50 }, { x: 75, y: 68 }, { x: 65, y: 85 }, { x: 25, y: 85 }],
    ],
  },
  { id: 'german-c', char: 'C', romanization: 'ce', language: 'german', difficulty: 2, strokes: [C_CURVE] },
  {
    id: 'german-d',
    char: 'D',
    romanization: 'de',
    language: 'german',
    difficulty: 2,
    strokes: [
      [{ x: 25, y: 15 }, { x: 25, y: 85 }],
      [{ x: 25, y: 15 }, { x: 55, y: 15 }, { x: 75, y: 35 }, { x: 75, y: 65 }, { x: 55, y: 85 }, { x: 25, y: 85 }],
    ],
  },
  {
    id: 'german-e',
    char: 'E',
    romanization: 'e',
    language: 'german',
    difficulty: 1,
    strokes: [
      [{ x: 25, y: 15 }, { x: 25, y: 85 }],
      [{ x: 25, y: 15 }, { x: 75, y: 15 }],
      [{ x: 25, y: 50 }, { x: 65, y: 50 }],
      [{ x: 25, y: 85 }, { x: 75, y: 85 }],
    ],
  },
  {
    id: 'german-f',
    char: 'F',
    romanization: 'ef',
    language: 'german',
    difficulty: 1,
    strokes: [
      [{ x: 25, y: 15 }, { x: 25, y: 85 }],
      [{ x: 25, y: 15 }, { x: 75, y: 15 }],
      [{ x: 25, y: 50 }, { x: 65, y: 50 }],
    ],
  },
  { id: 'german-g', char: 'G', romanization: 'ge', language: 'german', difficulty: 3, strokes: [C_CURVE, G_HOOK] },
  {
    id: 'german-h',
    char: 'H',
    romanization: 'ha',
    language: 'german',
    difficulty: 1,
    strokes: [
      [{ x: 25, y: 15 }, { x: 25, y: 85 }],
      [{ x: 75, y: 15 }, { x: 75, y: 85 }],
      [{ x: 25, y: 50 }, { x: 75, y: 50 }],
    ],
  },
  { id: 'german-i', char: 'I', romanization: 'i', language: 'german', difficulty: 1, strokes: [[{ x: 50, y: 15 }, { x: 50, y: 85 }]] },
  {
    id: 'german-j',
    char: 'J',
    romanization: 'jot',
    language: 'german',
    difficulty: 2,
    strokes: [[{ x: 65, y: 15 }, { x: 65, y: 70 }, { x: 50, y: 85 }, { x: 30, y: 80 }]],
  },
  {
    id: 'german-k',
    char: 'K',
    romanization: 'ka',
    language: 'german',
    difficulty: 2,
    strokes: [
      [{ x: 25, y: 15 }, { x: 25, y: 85 }],
      [{ x: 75, y: 15 }, { x: 25, y: 50 }],
      [{ x: 35, y: 55 }, { x: 75, y: 85 }],
    ],
  },
  {
    id: 'german-l',
    char: 'L',
    romanization: 'el',
    language: 'german',
    difficulty: 1,
    strokes: [
      [{ x: 25, y: 15 }, { x: 25, y: 85 }],
      [{ x: 25, y: 85 }, { x: 75, y: 85 }],
    ],
  },
  {
    id: 'german-m',
    char: 'M',
    romanization: 'em',
    language: 'german',
    difficulty: 2,
    strokes: [[{ x: 20, y: 85 }, { x: 20, y: 15 }, { x: 50, y: 55 }, { x: 80, y: 15 }, { x: 80, y: 85 }]],
  },
  {
    id: 'german-n',
    char: 'N',
    romanization: 'en',
    language: 'german',
    difficulty: 2,
    strokes: [[{ x: 20, y: 85 }, { x: 20, y: 15 }, { x: 80, y: 85 }, { x: 80, y: 15 }]],
  },
  { id: 'german-o', char: 'O', romanization: 'o', language: 'german', difficulty: 2, strokes: [O_LOOP] },
  {
    id: 'german-p',
    char: 'P',
    romanization: 'pe',
    language: 'german',
    difficulty: 2,
    strokes: [
      [{ x: 25, y: 15 }, { x: 25, y: 85 }],
      [{ x: 25, y: 15 }, { x: 60, y: 15 }, { x: 72, y: 30 }, { x: 60, y: 48 }, { x: 25, y: 48 }],
    ],
  },
  {
    id: 'german-q',
    char: 'Q',
    romanization: 'ku',
    language: 'german',
    difficulty: 3,
    strokes: [O_LOOP, [{ x: 55, y: 70 }, { x: 80, y: 95 }]],
  },
  {
    id: 'german-r',
    char: 'R',
    romanization: 'er',
    language: 'german',
    difficulty: 3,
    strokes: [
      [{ x: 25, y: 15 }, { x: 25, y: 85 }],
      [{ x: 25, y: 15 }, { x: 60, y: 15 }, { x: 72, y: 30 }, { x: 60, y: 48 }, { x: 25, y: 48 }],
      [{ x: 45, y: 48 }, { x: 75, y: 85 }],
    ],
  },
  { id: 'german-s', char: 'S', romanization: 'es', language: 'german', difficulty: 3, strokes: [S_CURVE] },
  {
    id: 'german-t',
    char: 'T',
    romanization: 'te',
    language: 'german',
    difficulty: 1,
    strokes: [
      [{ x: 20, y: 15 }, { x: 80, y: 15 }],
      [{ x: 50, y: 15 }, { x: 50, y: 85 }],
    ],
  },
  { id: 'german-u', char: 'U', romanization: 'u', language: 'german', difficulty: 2, strokes: [U_CURVE] },
  {
    id: 'german-v',
    char: 'V',
    romanization: 'fau',
    language: 'german',
    difficulty: 1,
    strokes: [
      [{ x: 20, y: 15 }, { x: 50, y: 85 }],
      [{ x: 50, y: 85 }, { x: 80, y: 15 }],
    ],
  },
  {
    id: 'german-w',
    char: 'W',
    romanization: 'we',
    language: 'german',
    difficulty: 2,
    strokes: [[{ x: 15, y: 15 }, { x: 30, y: 85 }, { x: 50, y: 45 }, { x: 70, y: 85 }, { x: 85, y: 15 }]],
  },
  {
    id: 'german-x',
    char: 'X',
    romanization: 'ix',
    language: 'german',
    difficulty: 1,
    strokes: [
      [{ x: 20, y: 15 }, { x: 80, y: 85 }],
      [{ x: 80, y: 15 }, { x: 20, y: 85 }],
    ],
  },
  {
    id: 'german-y',
    char: 'Y',
    romanization: 'ypsilon',
    language: 'german',
    difficulty: 2,
    strokes: [
      [{ x: 20, y: 15 }, { x: 50, y: 50 }],
      [{ x: 80, y: 15 }, { x: 50, y: 50 }],
      [{ x: 50, y: 50 }, { x: 50, y: 85 }],
    ],
  },
  {
    id: 'german-z',
    char: 'Z',
    romanization: 'zett',
    language: 'german',
    difficulty: 1,
    strokes: [[{ x: 20, y: 15 }, { x: 80, y: 15 }, { x: 20, y: 85 }, { x: 80, y: 85 }]],
  },
  // --- Umlauts and Eszett ---
  { id: 'german-a-umlaut', char: 'Ä', romanization: 'ä', language: 'german', difficulty: 2, strokes: [...A_STROKES, ...UMLAUT] },
  { id: 'german-o-umlaut', char: 'Ö', romanization: 'ö', language: 'german', difficulty: 2, strokes: [O_LOOP, ...UMLAUT] },
  { id: 'german-u-umlaut', char: 'Ü', romanization: 'ü', language: 'german', difficulty: 2, strokes: [U_CURVE, ...UMLAUT] },
  {
    id: 'german-eszett',
    char: 'ß',
    romanization: 'Eszett',
    language: 'german',
    difficulty: 3,
    strokes: [
      [{ x: 35, y: 85 }, { x: 35, y: 25 }, { x: 45, y: 15 }, { x: 58, y: 20 }, { x: 58, y: 35 }, { x: 45, y: 42 }],
      [{ x: 45, y: 42 }, { x: 60, y: 48 }, { x: 65, y: 65 }, { x: 55, y: 82 }, { x: 40, y: 85 }],
    ],
  },
];

// Explicit speechOverride (= the letter's real German name) so TTS reads
// the correct word instead of guessing from the bare glyph.
export const germanCharacters: CharacterTemplate[] = RAW_GERMAN_LETTERS.map((letter) => ({
  ...letter,
  speechOverride: letter.romanization,
}));
