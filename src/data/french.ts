import type { CharacterTemplate, Stroke } from '../types/character';

/**
 * The 26 letters of the French alphabet (uppercase). Unlike Turkish/Polish,
 * French doesn't treat accented letters (é, è, ç, ...) as distinct alphabet
 * members - they're orthographic marks on the same 26 base Latin letters,
 * so this is the plain A-Z set.
 *
 * `romanization`/`speechOverride` are each letter's real French name (used
 * reciting the alphabet, e.g. H = "ache", G = "gé", W = "double vé"), since
 * several letters don't sound like a naive reading of the glyph.
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

const RAW_FRENCH_LETTERS: CharacterTemplate[] = [
  {
    id: 'french-a',
    char: 'A',
    romanization: 'a',
    language: 'french',
    difficulty: 1,
    strokes: [
      [{ x: 20, y: 85 }, { x: 50, y: 15 }],
      [{ x: 50, y: 15 }, { x: 80, y: 85 }],
      [{ x: 32, y: 55 }, { x: 68, y: 55 }],
    ],
  },
  {
    id: 'french-b',
    char: 'B',
    romanization: 'bé',
    language: 'french',
    difficulty: 2,
    strokes: [
      [{ x: 25, y: 15 }, { x: 25, y: 85 }],
      [{ x: 25, y: 15 }, { x: 60, y: 15 }, { x: 70, y: 30 }, { x: 60, y: 50 }, { x: 25, y: 50 }],
      [{ x: 25, y: 50 }, { x: 65, y: 50 }, { x: 75, y: 68 }, { x: 65, y: 85 }, { x: 25, y: 85 }],
    ],
  },
  { id: 'french-c', char: 'C', romanization: 'cé', language: 'french', difficulty: 2, strokes: [C_CURVE] },
  {
    id: 'french-d',
    char: 'D',
    romanization: 'dé',
    language: 'french',
    difficulty: 2,
    strokes: [
      [{ x: 25, y: 15 }, { x: 25, y: 85 }],
      [{ x: 25, y: 15 }, { x: 55, y: 15 }, { x: 75, y: 35 }, { x: 75, y: 65 }, { x: 55, y: 85 }, { x: 25, y: 85 }],
    ],
  },
  {
    id: 'french-e',
    char: 'E',
    romanization: 'e',
    language: 'french',
    difficulty: 1,
    strokes: [
      [{ x: 25, y: 15 }, { x: 25, y: 85 }],
      [{ x: 25, y: 15 }, { x: 75, y: 15 }],
      [{ x: 25, y: 50 }, { x: 65, y: 50 }],
      [{ x: 25, y: 85 }, { x: 75, y: 85 }],
    ],
  },
  {
    id: 'french-f',
    char: 'F',
    romanization: 'effe',
    language: 'french',
    difficulty: 1,
    strokes: [
      [{ x: 25, y: 15 }, { x: 25, y: 85 }],
      [{ x: 25, y: 15 }, { x: 75, y: 15 }],
      [{ x: 25, y: 50 }, { x: 65, y: 50 }],
    ],
  },
  { id: 'french-g', char: 'G', romanization: 'gé', language: 'french', difficulty: 3, strokes: [C_CURVE, G_HOOK] },
  {
    id: 'french-h',
    char: 'H',
    romanization: 'ache',
    language: 'french',
    difficulty: 1,
    strokes: [
      [{ x: 25, y: 15 }, { x: 25, y: 85 }],
      [{ x: 75, y: 15 }, { x: 75, y: 85 }],
      [{ x: 25, y: 50 }, { x: 75, y: 50 }],
    ],
  },
  { id: 'french-i', char: 'I', romanization: 'i', language: 'french', difficulty: 1, strokes: [[{ x: 50, y: 15 }, { x: 50, y: 85 }]] },
  {
    id: 'french-j',
    char: 'J',
    romanization: 'ji',
    language: 'french',
    difficulty: 2,
    strokes: [[{ x: 65, y: 15 }, { x: 65, y: 70 }, { x: 50, y: 85 }, { x: 30, y: 80 }]],
  },
  {
    id: 'french-k',
    char: 'K',
    romanization: 'ka',
    language: 'french',
    difficulty: 2,
    strokes: [
      [{ x: 25, y: 15 }, { x: 25, y: 85 }],
      [{ x: 75, y: 15 }, { x: 25, y: 50 }],
      [{ x: 35, y: 55 }, { x: 75, y: 85 }],
    ],
  },
  {
    id: 'french-l',
    char: 'L',
    romanization: 'elle',
    language: 'french',
    difficulty: 1,
    strokes: [
      [{ x: 25, y: 15 }, { x: 25, y: 85 }],
      [{ x: 25, y: 85 }, { x: 75, y: 85 }],
    ],
  },
  {
    id: 'french-m',
    char: 'M',
    romanization: 'emme',
    language: 'french',
    difficulty: 2,
    strokes: [[{ x: 20, y: 85 }, { x: 20, y: 15 }, { x: 50, y: 55 }, { x: 80, y: 15 }, { x: 80, y: 85 }]],
  },
  {
    id: 'french-n',
    char: 'N',
    romanization: 'enne',
    language: 'french',
    difficulty: 2,
    strokes: [[{ x: 20, y: 85 }, { x: 20, y: 15 }, { x: 80, y: 85 }, { x: 80, y: 15 }]],
  },
  { id: 'french-o', char: 'O', romanization: 'o', language: 'french', difficulty: 2, strokes: [O_LOOP] },
  {
    id: 'french-p',
    char: 'P',
    romanization: 'pé',
    language: 'french',
    difficulty: 2,
    strokes: [
      [{ x: 25, y: 15 }, { x: 25, y: 85 }],
      [{ x: 25, y: 15 }, { x: 60, y: 15 }, { x: 72, y: 30 }, { x: 60, y: 48 }, { x: 25, y: 48 }],
    ],
  },
  {
    id: 'french-q',
    char: 'Q',
    romanization: 'ku',
    language: 'french',
    difficulty: 3,
    strokes: [O_LOOP, [{ x: 55, y: 70 }, { x: 80, y: 95 }]],
  },
  {
    id: 'french-r',
    char: 'R',
    romanization: 'erre',
    language: 'french',
    difficulty: 3,
    strokes: [
      [{ x: 25, y: 15 }, { x: 25, y: 85 }],
      [{ x: 25, y: 15 }, { x: 60, y: 15 }, { x: 72, y: 30 }, { x: 60, y: 48 }, { x: 25, y: 48 }],
      [{ x: 45, y: 48 }, { x: 75, y: 85 }],
    ],
  },
  { id: 'french-s', char: 'S', romanization: 'esse', language: 'french', difficulty: 3, strokes: [S_CURVE] },
  {
    id: 'french-t',
    char: 'T',
    romanization: 'té',
    language: 'french',
    difficulty: 1,
    strokes: [
      [{ x: 20, y: 15 }, { x: 80, y: 15 }],
      [{ x: 50, y: 15 }, { x: 50, y: 85 }],
    ],
  },
  { id: 'french-u', char: 'U', romanization: 'u', language: 'french', difficulty: 2, strokes: [U_CURVE] },
  {
    id: 'french-v',
    char: 'V',
    romanization: 'vé',
    language: 'french',
    difficulty: 1,
    strokes: [
      [{ x: 20, y: 15 }, { x: 50, y: 85 }],
      [{ x: 50, y: 85 }, { x: 80, y: 15 }],
    ],
  },
  {
    id: 'french-w',
    char: 'W',
    romanization: 'double vé',
    language: 'french',
    difficulty: 2,
    strokes: [[{ x: 15, y: 15 }, { x: 30, y: 85 }, { x: 50, y: 45 }, { x: 70, y: 85 }, { x: 85, y: 15 }]],
  },
  {
    id: 'french-x',
    char: 'X',
    romanization: 'ixe',
    language: 'french',
    difficulty: 1,
    strokes: [
      [{ x: 20, y: 15 }, { x: 80, y: 85 }],
      [{ x: 80, y: 15 }, { x: 20, y: 85 }],
    ],
  },
  {
    id: 'french-y',
    char: 'Y',
    romanization: 'i grec',
    language: 'french',
    difficulty: 2,
    strokes: [
      [{ x: 20, y: 15 }, { x: 50, y: 50 }],
      [{ x: 80, y: 15 }, { x: 50, y: 50 }],
      [{ x: 50, y: 50 }, { x: 50, y: 85 }],
    ],
  },
  {
    id: 'french-z',
    char: 'Z',
    romanization: 'zède',
    language: 'french',
    difficulty: 1,
    strokes: [[{ x: 20, y: 15 }, { x: 80, y: 15 }, { x: 20, y: 85 }, { x: 80, y: 85 }]],
  },
];

// Explicit speechOverride (= the letter's real French name) so TTS reads
// the correct word instead of guessing from the bare glyph.
export const frenchCharacters: CharacterTemplate[] = RAW_FRENCH_LETTERS.map((letter) => ({
  ...letter,
  speechOverride: letter.romanization,
}));
