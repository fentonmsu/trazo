import type { CharacterTemplate, Stroke } from '../types/character';

/**
 * The 32 letters of the Polish alphabet (uppercase): the 26 base Latin
 * letters minus Q, V, X, plus nine accented letters (Ą Ć Ę Ł Ń Ó Ś Ź Ż).
 *
 * Coordinates are on a normalized 0-100 grid (origin top-left, y grows
 * downward), authored as simple block-letter strokes - see turkish.ts for
 * the same convention (several base-letter shapes are shared with it).
 * Reading a bare accented glyph with a Polish voice already says the
 * correct letter, so no speechOverride is needed here (unlike Turkish,
 * where several letter names diverge sharply from a naive reading).
 */

const dotSize = 3;
function dot(cx: number, cy: number): Stroke {
  return [
    { x: cx - dotSize, y: cy - dotSize },
    { x: cx + dotSize, y: cy + dotSize },
  ];
}

// Kreska (acute accent) - top-right diagonal tick used by Ć Ń Ó Ś Ź.
const ACUTE: Stroke = [
  { x: 58, y: 6 },
  { x: 70, y: -4 },
];

// Ogonek (little tail) - used by Ą Ę, hanging off the bottom-right.
const OGONEK: Stroke = [
  { x: 62, y: 85 },
  { x: 72, y: 92 },
  { x: 70, y: 100 },
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

const A_STROKES: Stroke[] = [
  [{ x: 20, y: 85 }, { x: 50, y: 15 }],
  [{ x: 50, y: 15 }, { x: 80, y: 85 }],
  [{ x: 32, y: 55 }, { x: 68, y: 55 }],
];

const E_STROKES: Stroke[] = [
  [{ x: 25, y: 15 }, { x: 25, y: 85 }],
  [{ x: 25, y: 15 }, { x: 75, y: 15 }],
  [{ x: 25, y: 50 }, { x: 65, y: 50 }],
  [{ x: 25, y: 85 }, { x: 75, y: 85 }],
];

const L_STROKES: Stroke[] = [
  [{ x: 25, y: 15 }, { x: 25, y: 85 }],
  [{ x: 25, y: 85 }, { x: 75, y: 85 }],
];

const N_STROKES: Stroke[] = [[{ x: 20, y: 85 }, { x: 20, y: 15 }, { x: 80, y: 85 }, { x: 80, y: 15 }]];

const Z_STROKES: Stroke[] = [[{ x: 20, y: 15 }, { x: 80, y: 15 }, { x: 20, y: 85 }, { x: 80, y: 85 }]];

const RAW_POLISH_LETTERS: CharacterTemplate[] = [
  { id: 'polish-a', char: 'A', romanization: 'a', language: 'polish', difficulty: 1, strokes: A_STROKES },
  { id: 'polish-a-ogonek', char: 'Ą', romanization: 'ą', language: 'polish', difficulty: 3, strokes: [...A_STROKES, OGONEK] },
  {
    id: 'polish-b',
    char: 'B',
    romanization: 'b',
    language: 'polish',
    difficulty: 2,
    strokes: [
      [{ x: 25, y: 15 }, { x: 25, y: 85 }],
      [{ x: 25, y: 15 }, { x: 60, y: 15 }, { x: 70, y: 30 }, { x: 60, y: 50 }, { x: 25, y: 50 }],
      [{ x: 25, y: 50 }, { x: 65, y: 50 }, { x: 75, y: 68 }, { x: 65, y: 85 }, { x: 25, y: 85 }],
    ],
  },
  { id: 'polish-c', char: 'C', romanization: 'c', language: 'polish', difficulty: 2, strokes: [C_CURVE] },
  { id: 'polish-c-acute', char: 'Ć', romanization: 'ć', language: 'polish', difficulty: 3, strokes: [C_CURVE, ACUTE] },
  {
    id: 'polish-d',
    char: 'D',
    romanization: 'd',
    language: 'polish',
    difficulty: 2,
    strokes: [
      [{ x: 25, y: 15 }, { x: 25, y: 85 }],
      [{ x: 25, y: 15 }, { x: 55, y: 15 }, { x: 75, y: 35 }, { x: 75, y: 65 }, { x: 55, y: 85 }, { x: 25, y: 85 }],
    ],
  },
  { id: 'polish-e', char: 'E', romanization: 'e', language: 'polish', difficulty: 1, strokes: E_STROKES },
  { id: 'polish-e-ogonek', char: 'Ę', romanization: 'ę', language: 'polish', difficulty: 3, strokes: [...E_STROKES, OGONEK] },
  {
    id: 'polish-f',
    char: 'F',
    romanization: 'f',
    language: 'polish',
    difficulty: 1,
    strokes: [
      [{ x: 25, y: 15 }, { x: 25, y: 85 }],
      [{ x: 25, y: 15 }, { x: 75, y: 15 }],
      [{ x: 25, y: 50 }, { x: 65, y: 50 }],
    ],
  },
  { id: 'polish-g', char: 'G', romanization: 'g', language: 'polish', difficulty: 3, strokes: [C_CURVE, G_HOOK] },
  {
    id: 'polish-h',
    char: 'H',
    romanization: 'h',
    language: 'polish',
    difficulty: 1,
    strokes: [
      [{ x: 25, y: 15 }, { x: 25, y: 85 }],
      [{ x: 75, y: 15 }, { x: 75, y: 85 }],
      [{ x: 25, y: 50 }, { x: 75, y: 50 }],
    ],
  },
  { id: 'polish-i', char: 'I', romanization: 'i', language: 'polish', difficulty: 1, strokes: [[{ x: 50, y: 15 }, { x: 50, y: 85 }]] },
  {
    id: 'polish-j',
    char: 'J',
    romanization: 'j',
    language: 'polish',
    difficulty: 2,
    strokes: [[{ x: 65, y: 15 }, { x: 65, y: 70 }, { x: 50, y: 85 }, { x: 30, y: 80 }]],
  },
  {
    id: 'polish-k',
    char: 'K',
    romanization: 'k',
    language: 'polish',
    difficulty: 2,
    strokes: [
      [{ x: 25, y: 15 }, { x: 25, y: 85 }],
      [{ x: 75, y: 15 }, { x: 25, y: 50 }],
      [{ x: 35, y: 55 }, { x: 75, y: 85 }],
    ],
  },
  { id: 'polish-l', char: 'L', romanization: 'l', language: 'polish', difficulty: 1, strokes: L_STROKES },
  {
    id: 'polish-l-stroke',
    char: 'Ł',
    romanization: 'ł',
    language: 'polish',
    difficulty: 2,
    strokes: [...L_STROKES, [{ x: 16, y: 62 }, { x: 36, y: 48 }]],
  },
  {
    id: 'polish-m',
    char: 'M',
    romanization: 'm',
    language: 'polish',
    difficulty: 2,
    strokes: [[{ x: 20, y: 85 }, { x: 20, y: 15 }, { x: 50, y: 55 }, { x: 80, y: 15 }, { x: 80, y: 85 }]],
  },
  { id: 'polish-n', char: 'N', romanization: 'n', language: 'polish', difficulty: 2, strokes: N_STROKES },
  { id: 'polish-n-acute', char: 'Ń', romanization: 'ń', language: 'polish', difficulty: 3, strokes: [...N_STROKES, ACUTE] },
  { id: 'polish-o', char: 'O', romanization: 'o', language: 'polish', difficulty: 2, strokes: [O_LOOP] },
  { id: 'polish-o-acute', char: 'Ó', romanization: 'ó', language: 'polish', difficulty: 3, strokes: [O_LOOP, ACUTE] },
  {
    id: 'polish-p',
    char: 'P',
    romanization: 'p',
    language: 'polish',
    difficulty: 2,
    strokes: [
      [{ x: 25, y: 15 }, { x: 25, y: 85 }],
      [{ x: 25, y: 15 }, { x: 60, y: 15 }, { x: 72, y: 30 }, { x: 60, y: 48 }, { x: 25, y: 48 }],
    ],
  },
  {
    id: 'polish-r',
    char: 'R',
    romanization: 'r',
    language: 'polish',
    difficulty: 3,
    strokes: [
      [{ x: 25, y: 15 }, { x: 25, y: 85 }],
      [{ x: 25, y: 15 }, { x: 60, y: 15 }, { x: 72, y: 30 }, { x: 60, y: 48 }, { x: 25, y: 48 }],
      [{ x: 45, y: 48 }, { x: 75, y: 85 }],
    ],
  },
  { id: 'polish-s', char: 'S', romanization: 's', language: 'polish', difficulty: 3, strokes: [S_CURVE] },
  { id: 'polish-s-acute', char: 'Ś', romanization: 'ś', language: 'polish', difficulty: 4, strokes: [S_CURVE, ACUTE] },
  {
    id: 'polish-t',
    char: 'T',
    romanization: 't',
    language: 'polish',
    difficulty: 1,
    strokes: [
      [{ x: 20, y: 15 }, { x: 80, y: 15 }],
      [{ x: 50, y: 15 }, { x: 50, y: 85 }],
    ],
  },
  {
    id: 'polish-u',
    char: 'U',
    romanization: 'u',
    language: 'polish',
    difficulty: 2,
    strokes: [[
      { x: 25, y: 15 }, { x: 25, y: 65 }, { x: 35, y: 82 }, { x: 50, y: 87 }, { x: 65, y: 82 }, { x: 75, y: 65 }, { x: 75, y: 15 },
    ]],
  },
  {
    id: 'polish-w',
    char: 'W',
    romanization: 'w',
    language: 'polish',
    difficulty: 2,
    strokes: [[{ x: 15, y: 15 }, { x: 30, y: 85 }, { x: 50, y: 45 }, { x: 70, y: 85 }, { x: 85, y: 15 }]],
  },
  {
    id: 'polish-y',
    char: 'Y',
    romanization: 'y',
    language: 'polish',
    difficulty: 2,
    strokes: [
      [{ x: 20, y: 15 }, { x: 50, y: 50 }],
      [{ x: 80, y: 15 }, { x: 50, y: 50 }],
      [{ x: 50, y: 50 }, { x: 50, y: 85 }],
    ],
  },
  { id: 'polish-z', char: 'Z', romanization: 'z', language: 'polish', difficulty: 1, strokes: Z_STROKES },
  { id: 'polish-z-acute', char: 'Ź', romanization: 'ź', language: 'polish', difficulty: 3, strokes: [...Z_STROKES, ACUTE] },
  { id: 'polish-z-dot', char: 'Ż', romanization: 'ż', language: 'polish', difficulty: 3, strokes: [...Z_STROKES, dot(50, 4)] },
];

export const polishCharacters: CharacterTemplate[] = RAW_POLISH_LETTERS;
