import type { CharacterTemplate, Stroke } from '../types/character';

/**
 * The 26 letters of the (modern, post-2009-reform) Portuguese alphabet,
 * which added K, W, Y to the traditional 23-letter set. Like French,
 * accented letters (á, ç, ã, ...) are orthographic marks on these same
 * base letters, not separate alphabet members, so this is the plain A-Z set.
 *
 * `romanization`/`speechOverride` are each letter's real Portuguese name
 * (e.g. H = "agá", G = "gê", W = "dáblio"), since several letters don't
 * sound like a naive reading of the glyph.
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

// Til (~) - the wavy mark used in ã/õ, drawn as a single small S-curve above the letter.
const TIL: Stroke = [
  { x: 30, y: 2 },
  { x: 40, y: -5 },
  { x: 50, y: 2 },
  { x: 60, y: -5 },
  { x: 70, y: 2 },
];

const RAW_PORTUGUESE_LETTERS: CharacterTemplate[] = [
  { id: 'portuguese-a', char: 'A', romanization: 'á', language: 'portuguese', difficulty: 1, strokes: A_STROKES },
  {
    id: 'portuguese-b',
    char: 'B',
    romanization: 'bê',
    language: 'portuguese',
    difficulty: 2,
    strokes: [
      [{ x: 25, y: 15 }, { x: 25, y: 85 }],
      [{ x: 25, y: 15 }, { x: 60, y: 15 }, { x: 70, y: 30 }, { x: 60, y: 50 }, { x: 25, y: 50 }],
      [{ x: 25, y: 50 }, { x: 65, y: 50 }, { x: 75, y: 68 }, { x: 65, y: 85 }, { x: 25, y: 85 }],
    ],
  },
  { id: 'portuguese-c', char: 'C', romanization: 'cê', language: 'portuguese', difficulty: 2, strokes: [C_CURVE] },
  {
    id: 'portuguese-d',
    char: 'D',
    romanization: 'dê',
    language: 'portuguese',
    difficulty: 2,
    strokes: [
      [{ x: 25, y: 15 }, { x: 25, y: 85 }],
      [{ x: 25, y: 15 }, { x: 55, y: 15 }, { x: 75, y: 35 }, { x: 75, y: 65 }, { x: 55, y: 85 }, { x: 25, y: 85 }],
    ],
  },
  {
    id: 'portuguese-e',
    char: 'E',
    romanization: 'é',
    language: 'portuguese',
    difficulty: 1,
    strokes: [
      [{ x: 25, y: 15 }, { x: 25, y: 85 }],
      [{ x: 25, y: 15 }, { x: 75, y: 15 }],
      [{ x: 25, y: 50 }, { x: 65, y: 50 }],
      [{ x: 25, y: 85 }, { x: 75, y: 85 }],
    ],
  },
  {
    id: 'portuguese-f',
    char: 'F',
    romanization: 'efe',
    language: 'portuguese',
    difficulty: 1,
    strokes: [
      [{ x: 25, y: 15 }, { x: 25, y: 85 }],
      [{ x: 25, y: 15 }, { x: 75, y: 15 }],
      [{ x: 25, y: 50 }, { x: 65, y: 50 }],
    ],
  },
  { id: 'portuguese-g', char: 'G', romanization: 'gê', language: 'portuguese', difficulty: 3, strokes: [C_CURVE, G_HOOK] },
  {
    id: 'portuguese-h',
    char: 'H',
    romanization: 'agá',
    language: 'portuguese',
    difficulty: 1,
    strokes: [
      [{ x: 25, y: 15 }, { x: 25, y: 85 }],
      [{ x: 75, y: 15 }, { x: 75, y: 85 }],
      [{ x: 25, y: 50 }, { x: 75, y: 50 }],
    ],
  },
  { id: 'portuguese-i', char: 'I', romanization: 'i', language: 'portuguese', difficulty: 1, strokes: [[{ x: 50, y: 15 }, { x: 50, y: 85 }]] },
  {
    id: 'portuguese-j',
    char: 'J',
    romanization: 'jota',
    language: 'portuguese',
    difficulty: 2,
    strokes: [[{ x: 65, y: 15 }, { x: 65, y: 70 }, { x: 50, y: 85 }, { x: 30, y: 80 }]],
  },
  {
    id: 'portuguese-k',
    char: 'K',
    romanization: 'cá',
    language: 'portuguese',
    difficulty: 2,
    strokes: [
      [{ x: 25, y: 15 }, { x: 25, y: 85 }],
      [{ x: 75, y: 15 }, { x: 25, y: 50 }],
      [{ x: 35, y: 55 }, { x: 75, y: 85 }],
    ],
  },
  {
    id: 'portuguese-l',
    char: 'L',
    romanization: 'ele',
    language: 'portuguese',
    difficulty: 1,
    strokes: [
      [{ x: 25, y: 15 }, { x: 25, y: 85 }],
      [{ x: 25, y: 85 }, { x: 75, y: 85 }],
    ],
  },
  {
    id: 'portuguese-m',
    char: 'M',
    romanization: 'eme',
    language: 'portuguese',
    difficulty: 2,
    strokes: [[{ x: 20, y: 85 }, { x: 20, y: 15 }, { x: 50, y: 55 }, { x: 80, y: 15 }, { x: 80, y: 85 }]],
  },
  {
    id: 'portuguese-n',
    char: 'N',
    romanization: 'ene',
    language: 'portuguese',
    difficulty: 2,
    strokes: [[{ x: 20, y: 85 }, { x: 20, y: 15 }, { x: 80, y: 85 }, { x: 80, y: 15 }]],
  },
  { id: 'portuguese-o', char: 'O', romanization: 'ó', language: 'portuguese', difficulty: 2, strokes: [O_LOOP] },
  {
    id: 'portuguese-p',
    char: 'P',
    romanization: 'pê',
    language: 'portuguese',
    difficulty: 2,
    strokes: [
      [{ x: 25, y: 15 }, { x: 25, y: 85 }],
      [{ x: 25, y: 15 }, { x: 60, y: 15 }, { x: 72, y: 30 }, { x: 60, y: 48 }, { x: 25, y: 48 }],
    ],
  },
  {
    id: 'portuguese-q',
    char: 'Q',
    romanization: 'quê',
    language: 'portuguese',
    difficulty: 3,
    strokes: [O_LOOP, [{ x: 55, y: 70 }, { x: 80, y: 95 }]],
  },
  {
    id: 'portuguese-r',
    char: 'R',
    romanization: 'erre',
    language: 'portuguese',
    difficulty: 3,
    strokes: [
      [{ x: 25, y: 15 }, { x: 25, y: 85 }],
      [{ x: 25, y: 15 }, { x: 60, y: 15 }, { x: 72, y: 30 }, { x: 60, y: 48 }, { x: 25, y: 48 }],
      [{ x: 45, y: 48 }, { x: 75, y: 85 }],
    ],
  },
  { id: 'portuguese-s', char: 'S', romanization: 'esse', language: 'portuguese', difficulty: 3, strokes: [S_CURVE] },
  {
    id: 'portuguese-t',
    char: 'T',
    romanization: 'tê',
    language: 'portuguese',
    difficulty: 1,
    strokes: [
      [{ x: 20, y: 15 }, { x: 80, y: 15 }],
      [{ x: 50, y: 15 }, { x: 50, y: 85 }],
    ],
  },
  { id: 'portuguese-u', char: 'U', romanization: 'u', language: 'portuguese', difficulty: 2, strokes: [U_CURVE] },
  {
    id: 'portuguese-v',
    char: 'V',
    romanization: 'vê',
    language: 'portuguese',
    difficulty: 1,
    strokes: [
      [{ x: 20, y: 15 }, { x: 50, y: 85 }],
      [{ x: 50, y: 85 }, { x: 80, y: 15 }],
    ],
  },
  {
    id: 'portuguese-w',
    char: 'W',
    romanization: 'dáblio',
    language: 'portuguese',
    difficulty: 2,
    strokes: [[{ x: 15, y: 15 }, { x: 30, y: 85 }, { x: 50, y: 45 }, { x: 70, y: 85 }, { x: 85, y: 15 }]],
  },
  {
    id: 'portuguese-x',
    char: 'X',
    romanization: 'xis',
    language: 'portuguese',
    difficulty: 1,
    strokes: [
      [{ x: 20, y: 15 }, { x: 80, y: 85 }],
      [{ x: 80, y: 15 }, { x: 20, y: 85 }],
    ],
  },
  {
    id: 'portuguese-y',
    char: 'Y',
    romanization: 'ípsilon',
    language: 'portuguese',
    difficulty: 2,
    strokes: [
      [{ x: 20, y: 15 }, { x: 50, y: 50 }],
      [{ x: 80, y: 15 }, { x: 50, y: 50 }],
      [{ x: 50, y: 50 }, { x: 50, y: 85 }],
    ],
  },
  {
    id: 'portuguese-z',
    char: 'Z',
    romanization: 'zê',
    language: 'portuguese',
    difficulty: 1,
    strokes: [[{ x: 20, y: 15 }, { x: 80, y: 15 }, { x: 20, y: 85 }, { x: 80, y: 85 }]],
  },
  // --- Til (nasal vowels) ---
  { id: 'portuguese-a-til', char: 'Ã', romanization: 'a til', language: 'portuguese', difficulty: 2, strokes: [...A_STROKES, TIL] },
  { id: 'portuguese-o-til', char: 'Õ', romanization: 'o til', language: 'portuguese', difficulty: 2, strokes: [O_LOOP, TIL] },
];

// Explicit speechOverride (= the letter's real Portuguese name) so TTS
// reads the correct word instead of guessing from the bare glyph.
export const portugueseCharacters: CharacterTemplate[] = RAW_PORTUGUESE_LETTERS.map((letter) => ({
  ...letter,
  speechOverride: letter.romanization,
}));
