import type { CharacterTemplate, Stroke } from '../types/character';

/**
 * The 29 letters of the Turkish alphabet (uppercase), a Latin alphabet with
 * six extra/modified letters: Ç, Ğ, I/İ (the famous dotless/dotted i pair),
 * Ö, Ş, Ü. `romanization`/`speechOverride` are each letter's real Turkish
 * name (the words used reciting the alphabet, e.g. C = "ce", pronounced
 * like English "je") rather than a naive reading of the glyph, since several
 * Turkish letters don't sound like their Latin-alphabet-in-English reading.
 *
 * Coordinates are on a normalized 0-100 grid (origin top-left, y grows
 * downward), authored as simple block-letter strokes - see the other data
 * files' comments for the same convention.
 */

const dotSize = 3;
function dot(cx: number, cy: number): Stroke {
  return [
    { x: cx - dotSize, y: cy - dotSize },
    { x: cx + dotSize, y: cy + dotSize },
  ];
}

const CEDILLA: Stroke = [
  { x: 48, y: 87 },
  { x: 53, y: 94 },
  { x: 46, y: 97 },
];

const BREVE: Stroke = [
  { x: 38, y: 6 },
  { x: 50, y: -2 },
  { x: 62, y: 6 },
];

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

const RAW_TURKISH_LETTERS: CharacterTemplate[] = [
  {
    id: 'turkish-a',
    char: 'A',
    romanization: 'a',
    language: 'turkish',
    difficulty: 1,
    strokes: [
      [{ x: 20, y: 85 }, { x: 50, y: 15 }],
      [{ x: 50, y: 15 }, { x: 80, y: 85 }],
      [{ x: 32, y: 55 }, { x: 68, y: 55 }],
    ],
  },
  {
    id: 'turkish-b',
    char: 'B',
    romanization: 'be',
    language: 'turkish',
    difficulty: 2,
    strokes: [
      [{ x: 25, y: 15 }, { x: 25, y: 85 }],
      [{ x: 25, y: 15 }, { x: 60, y: 15 }, { x: 70, y: 30 }, { x: 60, y: 50 }, { x: 25, y: 50 }],
      [{ x: 25, y: 50 }, { x: 65, y: 50 }, { x: 75, y: 68 }, { x: 65, y: 85 }, { x: 25, y: 85 }],
    ],
  },
  { id: 'turkish-c', char: 'C', romanization: 'ce', language: 'turkish', difficulty: 2, strokes: [C_CURVE] },
  {
    id: 'turkish-ce-cedilla',
    char: 'Ç',
    romanization: 'çe',
    language: 'turkish',
    difficulty: 3,
    strokes: [C_CURVE, CEDILLA],
  },
  {
    id: 'turkish-d',
    char: 'D',
    romanization: 'de',
    language: 'turkish',
    difficulty: 2,
    strokes: [
      [{ x: 25, y: 15 }, { x: 25, y: 85 }],
      [{ x: 25, y: 15 }, { x: 55, y: 15 }, { x: 75, y: 35 }, { x: 75, y: 65 }, { x: 55, y: 85 }, { x: 25, y: 85 }],
    ],
  },
  {
    id: 'turkish-e',
    char: 'E',
    romanization: 'e',
    language: 'turkish',
    difficulty: 1,
    strokes: [
      [{ x: 25, y: 15 }, { x: 25, y: 85 }],
      [{ x: 25, y: 15 }, { x: 75, y: 15 }],
      [{ x: 25, y: 50 }, { x: 65, y: 50 }],
      [{ x: 25, y: 85 }, { x: 75, y: 85 }],
    ],
  },
  {
    id: 'turkish-f',
    char: 'F',
    romanization: 'fe',
    language: 'turkish',
    difficulty: 1,
    strokes: [
      [{ x: 25, y: 15 }, { x: 25, y: 85 }],
      [{ x: 25, y: 15 }, { x: 75, y: 15 }],
      [{ x: 25, y: 50 }, { x: 65, y: 50 }],
    ],
  },
  { id: 'turkish-g', char: 'G', romanization: 'ge', language: 'turkish', difficulty: 3, strokes: [C_CURVE, G_HOOK] },
  {
    id: 'turkish-g-breve',
    char: 'Ğ',
    romanization: 'yumuşak ge',
    language: 'turkish',
    difficulty: 4,
    strokes: [C_CURVE, G_HOOK, BREVE],
  },
  {
    id: 'turkish-h',
    char: 'H',
    romanization: 'he',
    language: 'turkish',
    difficulty: 1,
    strokes: [
      [{ x: 25, y: 15 }, { x: 25, y: 85 }],
      [{ x: 75, y: 15 }, { x: 75, y: 85 }],
      [{ x: 25, y: 50 }, { x: 75, y: 50 }],
    ],
  },
  { id: 'turkish-i-dotless', char: 'I', romanization: 'ı', language: 'turkish', difficulty: 1, strokes: [[{ x: 50, y: 15 }, { x: 50, y: 85 }]] },
  {
    id: 'turkish-i-dotted',
    char: 'İ',
    romanization: 'i',
    language: 'turkish',
    difficulty: 1,
    strokes: [[{ x: 50, y: 25 }, { x: 50, y: 85 }], dot(50, 10)],
  },
  {
    id: 'turkish-j',
    char: 'J',
    romanization: 'je',
    language: 'turkish',
    difficulty: 2,
    strokes: [[{ x: 65, y: 15 }, { x: 65, y: 70 }, { x: 50, y: 85 }, { x: 30, y: 80 }]],
  },
  {
    id: 'turkish-k',
    char: 'K',
    romanization: 'ke',
    language: 'turkish',
    difficulty: 2,
    strokes: [
      [{ x: 25, y: 15 }, { x: 25, y: 85 }],
      [{ x: 75, y: 15 }, { x: 25, y: 50 }],
      [{ x: 35, y: 55 }, { x: 75, y: 85 }],
    ],
  },
  {
    id: 'turkish-l',
    char: 'L',
    romanization: 'le',
    language: 'turkish',
    difficulty: 1,
    strokes: [
      [{ x: 25, y: 15 }, { x: 25, y: 85 }],
      [{ x: 25, y: 85 }, { x: 75, y: 85 }],
    ],
  },
  {
    id: 'turkish-m',
    char: 'M',
    romanization: 'me',
    language: 'turkish',
    difficulty: 2,
    strokes: [[{ x: 20, y: 85 }, { x: 20, y: 15 }, { x: 50, y: 55 }, { x: 80, y: 15 }, { x: 80, y: 85 }]],
  },
  {
    id: 'turkish-n',
    char: 'N',
    romanization: 'ne',
    language: 'turkish',
    difficulty: 2,
    strokes: [[{ x: 20, y: 85 }, { x: 20, y: 15 }, { x: 80, y: 85 }, { x: 80, y: 15 }]],
  },
  { id: 'turkish-o', char: 'O', romanization: 'o', language: 'turkish', difficulty: 2, strokes: [O_LOOP] },
  {
    id: 'turkish-o-umlaut',
    char: 'Ö',
    romanization: 'ö',
    language: 'turkish',
    difficulty: 3,
    strokes: [O_LOOP, dot(40, 5), dot(60, 5)],
  },
  {
    id: 'turkish-p',
    char: 'P',
    romanization: 'pe',
    language: 'turkish',
    difficulty: 2,
    strokes: [
      [{ x: 25, y: 15 }, { x: 25, y: 85 }],
      [{ x: 25, y: 15 }, { x: 60, y: 15 }, { x: 72, y: 30 }, { x: 60, y: 48 }, { x: 25, y: 48 }],
    ],
  },
  {
    id: 'turkish-r',
    char: 'R',
    romanization: 're',
    language: 'turkish',
    difficulty: 3,
    strokes: [
      [{ x: 25, y: 15 }, { x: 25, y: 85 }],
      [{ x: 25, y: 15 }, { x: 60, y: 15 }, { x: 72, y: 30 }, { x: 60, y: 48 }, { x: 25, y: 48 }],
      [{ x: 45, y: 48 }, { x: 75, y: 85 }],
    ],
  },
  { id: 'turkish-s', char: 'S', romanization: 'se', language: 'turkish', difficulty: 3, strokes: [S_CURVE] },
  {
    id: 'turkish-s-cedilla',
    char: 'Ş',
    romanization: 'şe',
    language: 'turkish',
    difficulty: 4,
    strokes: [S_CURVE, CEDILLA],
  },
  {
    id: 'turkish-t',
    char: 'T',
    romanization: 'te',
    language: 'turkish',
    difficulty: 1,
    strokes: [
      [{ x: 20, y: 15 }, { x: 80, y: 15 }],
      [{ x: 50, y: 15 }, { x: 50, y: 85 }],
    ],
  },
  { id: 'turkish-u', char: 'U', romanization: 'u', language: 'turkish', difficulty: 2, strokes: [U_CURVE] },
  {
    id: 'turkish-u-umlaut',
    char: 'Ü',
    romanization: 'ü',
    language: 'turkish',
    difficulty: 3,
    strokes: [U_CURVE, dot(40, 5), dot(60, 5)],
  },
  {
    id: 'turkish-v',
    char: 'V',
    romanization: 've',
    language: 'turkish',
    difficulty: 1,
    strokes: [
      [{ x: 20, y: 15 }, { x: 50, y: 85 }],
      [{ x: 50, y: 85 }, { x: 80, y: 15 }],
    ],
  },
  {
    id: 'turkish-y',
    char: 'Y',
    romanization: 'ye',
    language: 'turkish',
    difficulty: 2,
    strokes: [
      [{ x: 20, y: 15 }, { x: 50, y: 50 }],
      [{ x: 80, y: 15 }, { x: 50, y: 50 }],
      [{ x: 50, y: 50 }, { x: 50, y: 85 }],
    ],
  },
  {
    id: 'turkish-z',
    char: 'Z',
    romanization: 'ze',
    language: 'turkish',
    difficulty: 1,
    strokes: [[{ x: 20, y: 15 }, { x: 80, y: 15 }, { x: 20, y: 85 }, { x: 80, y: 85 }]],
  },
];

// Explicit speechOverride (= the letter's real name) so TTS generation
// reads the correct Turkish word instead of guessing from the bare glyph.
export const turkishCharacters: CharacterTemplate[] = RAW_TURKISH_LETTERS.map((letter) => ({
  ...letter,
  speechOverride: letter.romanization,
}));
