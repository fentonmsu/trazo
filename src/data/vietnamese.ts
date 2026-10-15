import type { CharacterTemplate, Stroke } from '../types/character';

/**
 * The 29-letter Vietnamese alphabet (uppercase): the Latin alphabet without
 * F, J, W, Z, plus seven modified-vowel/consonant letters - Ă, Â, Đ, Ê, Ô,
 * Ơ, Ư - which, unlike French/Portuguese's accents, ARE distinct alphabet
 * members in Vietnamese (same status as Turkish/Polish's extra letters).
 *
 * This covers the base alphabet only, not Vietnamese's six tone marks
 * (sắc/huyền/hỏi/ngã/nặng, plus unmarked) - combining every vowel with
 * every tone would be a large combinatorial drill set (like hebrewFull),
 * out of scope here unless asked for separately.
 *
 * `romanization` is just the lowercase letter; an isolated Vietnamese
 * letter reads fine from a Vietnamese TTS voice, so no speechOverride is
 * needed (same reasoning as cyrillic.ts/polish.ts).
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

const D_STROKES: Stroke[] = [
  [{ x: 25, y: 15 }, { x: 25, y: 85 }],
  [{ x: 25, y: 15 }, { x: 55, y: 15 }, { x: 75, y: 35 }, { x: 75, y: 65 }, { x: 55, y: 85 }, { x: 25, y: 85 }],
];

const E_STROKES: Stroke[] = [
  [{ x: 25, y: 15 }, { x: 25, y: 85 }],
  [{ x: 25, y: 15 }, { x: 75, y: 15 }],
  [{ x: 25, y: 50 }, { x: 65, y: 50 }],
  [{ x: 25, y: 85 }, { x: 75, y: 85 }],
];

// Mũ (circumflex, ˆ) - used by Â, Ê, Ô.
const CIRCUMFLEX: Stroke = [{ x: 38, y: 2 }, { x: 50, y: -8 }, { x: 62, y: 2 }];
// Trăng (breve, ˘) - used by Ă, a shallow upward-opening arc.
const BREVE: Stroke = [{ x: 40, y: -6 }, { x: 50, y: 2 }, { x: 60, y: -6 }];
// Móc (horn) - used by Ơ, Ư, a small hook off the upper-right of the letter.
const HORN: Stroke = [{ x: 76, y: 10 }, { x: 86, y: 2 }, { x: 88, y: 10 }];
// Crossbar through Đ's vertical stroke (like Polish Ł).
const D_STROKE_BAR: Stroke = [{ x: 16, y: 50 }, { x: 34, y: 50 }];

const RAW_VIETNAMESE_LETTERS: CharacterTemplate[] = [
  { id: 'vietnamese-a', char: 'A', romanization: 'a', language: 'vietnamese', difficulty: 1, strokes: A_STROKES },
  { id: 'vietnamese-a-breve', char: 'Ă', romanization: 'ă', language: 'vietnamese', difficulty: 2, strokes: [...A_STROKES, BREVE] },
  { id: 'vietnamese-a-circumflex', char: 'Â', romanization: 'â', language: 'vietnamese', difficulty: 2, strokes: [...A_STROKES, CIRCUMFLEX] },
  {
    id: 'vietnamese-b',
    char: 'B',
    romanization: 'b',
    language: 'vietnamese',
    difficulty: 2,
    strokes: [
      [{ x: 25, y: 15 }, { x: 25, y: 85 }],
      [{ x: 25, y: 15 }, { x: 60, y: 15 }, { x: 70, y: 30 }, { x: 60, y: 50 }, { x: 25, y: 50 }],
      [{ x: 25, y: 50 }, { x: 65, y: 50 }, { x: 75, y: 68 }, { x: 65, y: 85 }, { x: 25, y: 85 }],
    ],
  },
  { id: 'vietnamese-c', char: 'C', romanization: 'c', language: 'vietnamese', difficulty: 2, strokes: [C_CURVE] },
  { id: 'vietnamese-d', char: 'D', romanization: 'd', language: 'vietnamese', difficulty: 2, strokes: D_STROKES },
  { id: 'vietnamese-dd', char: 'Đ', romanization: 'đ', language: 'vietnamese', difficulty: 2, strokes: [...D_STROKES, D_STROKE_BAR] },
  { id: 'vietnamese-e', char: 'E', romanization: 'e', language: 'vietnamese', difficulty: 1, strokes: E_STROKES },
  { id: 'vietnamese-e-circumflex', char: 'Ê', romanization: 'ê', language: 'vietnamese', difficulty: 2, strokes: [...E_STROKES, CIRCUMFLEX] },
  {
    id: 'vietnamese-g',
    char: 'G',
    romanization: 'g',
    language: 'vietnamese',
    difficulty: 3,
    strokes: [C_CURVE, [{ x: 75, y: 55 }, { x: 75, y: 72 }, { x: 55, y: 72 }]],
  },
  {
    id: 'vietnamese-h',
    char: 'H',
    romanization: 'h',
    language: 'vietnamese',
    difficulty: 1,
    strokes: [
      [{ x: 25, y: 15 }, { x: 25, y: 85 }],
      [{ x: 75, y: 15 }, { x: 75, y: 85 }],
      [{ x: 25, y: 50 }, { x: 75, y: 50 }],
    ],
  },
  { id: 'vietnamese-i', char: 'I', romanization: 'i', language: 'vietnamese', difficulty: 1, strokes: [[{ x: 50, y: 15 }, { x: 50, y: 85 }]] },
  {
    id: 'vietnamese-k',
    char: 'K',
    romanization: 'k',
    language: 'vietnamese',
    difficulty: 2,
    strokes: [
      [{ x: 25, y: 15 }, { x: 25, y: 85 }],
      [{ x: 75, y: 15 }, { x: 25, y: 50 }],
      [{ x: 35, y: 55 }, { x: 75, y: 85 }],
    ],
  },
  {
    id: 'vietnamese-l',
    char: 'L',
    romanization: 'l',
    language: 'vietnamese',
    difficulty: 1,
    strokes: [
      [{ x: 25, y: 15 }, { x: 25, y: 85 }],
      [{ x: 25, y: 85 }, { x: 75, y: 85 }],
    ],
  },
  {
    id: 'vietnamese-m',
    char: 'M',
    romanization: 'm',
    language: 'vietnamese',
    difficulty: 2,
    strokes: [[{ x: 20, y: 85 }, { x: 20, y: 15 }, { x: 50, y: 55 }, { x: 80, y: 15 }, { x: 80, y: 85 }]],
  },
  {
    id: 'vietnamese-n',
    char: 'N',
    romanization: 'n',
    language: 'vietnamese',
    difficulty: 2,
    strokes: [[{ x: 20, y: 85 }, { x: 20, y: 15 }, { x: 80, y: 85 }, { x: 80, y: 15 }]],
  },
  { id: 'vietnamese-o', char: 'O', romanization: 'o', language: 'vietnamese', difficulty: 2, strokes: [O_LOOP] },
  { id: 'vietnamese-o-circumflex', char: 'Ô', romanization: 'ô', language: 'vietnamese', difficulty: 2, strokes: [O_LOOP, CIRCUMFLEX] },
  { id: 'vietnamese-o-horn', char: 'Ơ', romanization: 'ơ', language: 'vietnamese', difficulty: 2, strokes: [O_LOOP, HORN] },
  {
    id: 'vietnamese-p',
    char: 'P',
    romanization: 'p',
    language: 'vietnamese',
    difficulty: 2,
    strokes: [
      [{ x: 25, y: 15 }, { x: 25, y: 85 }],
      [{ x: 25, y: 15 }, { x: 60, y: 15 }, { x: 72, y: 30 }, { x: 60, y: 48 }, { x: 25, y: 48 }],
    ],
  },
  {
    id: 'vietnamese-q',
    char: 'Q',
    romanization: 'q',
    language: 'vietnamese',
    difficulty: 3,
    strokes: [O_LOOP, [{ x: 55, y: 70 }, { x: 80, y: 95 }]],
  },
  {
    id: 'vietnamese-r',
    char: 'R',
    romanization: 'r',
    language: 'vietnamese',
    difficulty: 3,
    strokes: [
      [{ x: 25, y: 15 }, { x: 25, y: 85 }],
      [{ x: 25, y: 15 }, { x: 60, y: 15 }, { x: 72, y: 30 }, { x: 60, y: 48 }, { x: 25, y: 48 }],
      [{ x: 45, y: 48 }, { x: 75, y: 85 }],
    ],
  },
  { id: 'vietnamese-s', char: 'S', romanization: 's', language: 'vietnamese', difficulty: 3, strokes: [S_CURVE] },
  {
    id: 'vietnamese-t',
    char: 'T',
    romanization: 't',
    language: 'vietnamese',
    difficulty: 1,
    strokes: [
      [{ x: 20, y: 15 }, { x: 80, y: 15 }],
      [{ x: 50, y: 15 }, { x: 50, y: 85 }],
    ],
  },
  { id: 'vietnamese-u', char: 'U', romanization: 'u', language: 'vietnamese', difficulty: 2, strokes: [U_CURVE] },
  { id: 'vietnamese-u-horn', char: 'Ư', romanization: 'ư', language: 'vietnamese', difficulty: 2, strokes: [U_CURVE, HORN] },
  {
    id: 'vietnamese-v',
    char: 'V',
    romanization: 'v',
    language: 'vietnamese',
    difficulty: 1,
    strokes: [
      [{ x: 20, y: 15 }, { x: 50, y: 85 }],
      [{ x: 50, y: 85 }, { x: 80, y: 15 }],
    ],
  },
  {
    id: 'vietnamese-x',
    char: 'X',
    romanization: 'x',
    language: 'vietnamese',
    difficulty: 1,
    strokes: [
      [{ x: 20, y: 15 }, { x: 80, y: 85 }],
      [{ x: 80, y: 15 }, { x: 20, y: 85 }],
    ],
  },
  {
    id: 'vietnamese-y',
    char: 'Y',
    romanization: 'y',
    language: 'vietnamese',
    difficulty: 2,
    strokes: [
      [{ x: 20, y: 15 }, { x: 50, y: 50 }],
      [{ x: 80, y: 15 }, { x: 50, y: 50 }],
      [{ x: 50, y: 50 }, { x: 50, y: 85 }],
    ],
  },
];

export const vietnameseCharacters: CharacterTemplate[] = RAW_VIETNAMESE_LETTERS;
