import type { CharacterTemplate, Stroke } from '../types/character';

/**
 * The 28 letters of the Arabic alphabet in their standalone (isolated)
 * form - the shape a letter takes when written on its own, not connected
 * to a neighbor. Arabic is a cursive script where most letters take up to
 * 4 different shapes depending on position in a word (isolated, initial,
 * medial, final); isolated forms are the standard starting point for
 * learning the alphabet, the same way this app starts Hebrew with its
 * printed/block letterforms rather than cursive joins.
 *
 * Coordinates are on a normalized 0-100 grid (origin top-left, y grows
 * downward, matching canvas coordinates); only relative proportions,
 * topology, and stroke direction matter, not absolute scale - see the
 * other data files' comments for the same convention.
 *
 * `speechOverride` is each letter's real Arabic name (alif, baa, taa...) -
 * the same words used when reciting the alphabet. A bare consonant with no
 * vowel is barely pronounceable on its own (the same issue Hebrew letters
 * have without niqqud), so an ar-SA voice reads the full letter name
 * instead, which is real, natural Arabic text.
 */

const dotSize = 3;
function dot(cx: number, cy: number): Stroke {
  return [
    { x: cx - dotSize, y: cy - dotSize },
    { x: cx + dotSize, y: cy + dotSize },
  ];
}

// Shallow "boat" bowl shared by ba/ta/tha/ya, dotted differently.
const BOAT_BOWL: Stroke = [
  { x: 78, y: 40 },
  { x: 65, y: 55 },
  { x: 50, y: 60 },
  { x: 35, y: 55 },
  { x: 22, y: 40 },
];

// Hook shape shared by jeem/haa/khaa (loop dips below the baseline).
const JEEM_HOOK: Stroke = [
  { x: 72, y: 30 },
  { x: 50, y: 35 },
  { x: 33, y: 46 },
  { x: 30, y: 60 },
  { x: 40, y: 72 },
  { x: 55, y: 72 },
  { x: 62, y: 62 },
];

// Descending hook shared by dal/dhal.
const DAL_HOOK: Stroke = [
  { x: 65, y: 25 },
  { x: 50, y: 30 },
  { x: 38, y: 45 },
  { x: 38, y: 60 },
  { x: 48, y: 65 },
];

// Descending tail shared by ra/zay.
const RA_TAIL: Stroke = [
  { x: 65, y: 25 },
  { x: 55, y: 45 },
  { x: 50, y: 65 },
  { x: 42, y: 75 },
];

// Three-tooth zigzag shared by seen/sheen.
const SEEN_TEETH: Stroke = [
  { x: 78, y: 50 },
  { x: 68, y: 35 },
  { x: 58, y: 50 },
  { x: 48, y: 35 },
  { x: 38, y: 50 },
  { x: 28, y: 35 },
  { x: 20, y: 50 },
];

// Loop + long left tail with an upward hook, shared by sad/dad/taa/zaa.
const SAD_BODY: Stroke = [
  { x: 70, y: 35 },
  { x: 58, y: 25 },
  { x: 48, y: 32 },
  { x: 48, y: 48 },
  { x: 60, y: 52 },
  { x: 45, y: 52 },
  { x: 25, y: 52 },
  { x: 20, y: 40 },
];

// Curled hook shared by ain/ghain.
const AIN_HOOK: Stroke = [
  { x: 65, y: 25 },
  { x: 45, y: 20 },
  { x: 32, y: 30 },
  { x: 30, y: 45 },
  { x: 40, y: 55 },
  { x: 55, y: 58 },
  { x: 65, y: 50 },
];

// Small closed loop shared by fa/qaf/meem/waw (slightly repositioned per letter).
function loop(cx: number, cy: number, r: number): Stroke {
  return [
    { x: cx + r, y: cy },
    { x: cx, y: cy - r },
    { x: cx - r, y: cy },
    { x: cx, y: cy + r },
    { x: cx + r, y: cy },
  ];
}

export const arabicCharacters: CharacterTemplate[] = [
  {
    id: 'arabic-alif',
    language: 'arabic',
    char: 'ا',
    romanization: 'a',
    speechOverride: 'ألف',
    difficulty: 1,
    strokes: [
      [
        { x: 50, y: 10 },
        { x: 50, y: 90 },
      ],
    ],
  },
  {
    id: 'arabic-ba',
    language: 'arabic',
    char: 'ب',
    romanization: 'b',
    speechOverride: 'باء',
    difficulty: 2,
    strokes: [BOAT_BOWL, dot(50, 78)],
  },
  {
    id: 'arabic-ta',
    language: 'arabic',
    char: 'ت',
    romanization: 't',
    speechOverride: 'تاء',
    difficulty: 2,
    strokes: [BOAT_BOWL, dot(42, 25), dot(58, 25)],
  },
  {
    id: 'arabic-tha',
    language: 'arabic',
    char: 'ث',
    romanization: 'th',
    speechOverride: 'ثاء',
    difficulty: 2,
    strokes: [BOAT_BOWL, dot(38, 22), dot(50, 14), dot(62, 22)],
  },
  {
    id: 'arabic-jeem',
    language: 'arabic',
    char: 'ج',
    romanization: 'j',
    speechOverride: 'جيم',
    difficulty: 3,
    strokes: [JEEM_HOOK, dot(47, 62)],
  },
  {
    id: 'arabic-haa',
    language: 'arabic',
    char: 'ح',
    romanization: 'h',
    speechOverride: 'حاء',
    difficulty: 3,
    strokes: [JEEM_HOOK],
  },
  {
    id: 'arabic-khaa',
    language: 'arabic',
    char: 'خ',
    romanization: 'kh',
    speechOverride: 'خاء',
    difficulty: 3,
    strokes: [JEEM_HOOK, dot(50, 18)],
  },
  {
    id: 'arabic-dal',
    language: 'arabic',
    char: 'د',
    romanization: 'd',
    speechOverride: 'دال',
    difficulty: 1,
    strokes: [DAL_HOOK],
  },
  {
    id: 'arabic-dhal',
    language: 'arabic',
    char: 'ذ',
    romanization: 'dh',
    speechOverride: 'ذال',
    difficulty: 2,
    strokes: [DAL_HOOK, dot(50, 14)],
  },
  {
    id: 'arabic-ra',
    language: 'arabic',
    char: 'ر',
    romanization: 'r',
    speechOverride: 'راء',
    difficulty: 1,
    strokes: [RA_TAIL],
  },
  {
    id: 'arabic-zay',
    language: 'arabic',
    char: 'ز',
    romanization: 'z',
    speechOverride: 'زاي',
    difficulty: 2,
    strokes: [RA_TAIL, dot(55, 14)],
  },
  {
    id: 'arabic-seen',
    language: 'arabic',
    char: 'س',
    romanization: 's',
    speechOverride: 'سين',
    difficulty: 3,
    strokes: [SEEN_TEETH],
  },
  {
    id: 'arabic-sheen',
    language: 'arabic',
    char: 'ش',
    romanization: 'sh',
    speechOverride: 'شين',
    difficulty: 3,
    strokes: [SEEN_TEETH, dot(68, 20), dot(50, 14), dot(32, 20)],
  },
  {
    id: 'arabic-sad',
    language: 'arabic',
    char: 'ص',
    romanization: 's',
    speechOverride: 'صاد',
    difficulty: 4,
    strokes: [SAD_BODY],
  },
  {
    id: 'arabic-dad',
    language: 'arabic',
    char: 'ض',
    romanization: 'd',
    speechOverride: 'ضاد',
    difficulty: 4,
    strokes: [SAD_BODY, dot(55, 15)],
  },
  {
    id: 'arabic-taa',
    language: 'arabic',
    char: 'ط',
    romanization: 't',
    speechOverride: 'طاء',
    difficulty: 4,
    strokes: [
      SAD_BODY,
      [
        { x: 55, y: 35 },
        { x: 55, y: 8 },
      ],
    ],
  },
  {
    id: 'arabic-zaa',
    language: 'arabic',
    char: 'ظ',
    romanization: 'z',
    speechOverride: 'ظاء',
    difficulty: 5,
    strokes: [
      SAD_BODY,
      [
        { x: 55, y: 35 },
        { x: 55, y: 8 },
      ],
      dot(65, 15),
    ],
  },
  {
    id: 'arabic-ain',
    language: 'arabic',
    char: 'ع',
    romanization: "'",
    speechOverride: 'عين',
    difficulty: 4,
    strokes: [AIN_HOOK],
  },
  {
    id: 'arabic-ghain',
    language: 'arabic',
    char: 'غ',
    romanization: 'gh',
    speechOverride: 'غين',
    difficulty: 4,
    strokes: [AIN_HOOK, dot(45, 10)],
  },
  {
    id: 'arabic-fa',
    language: 'arabic',
    char: 'ف',
    romanization: 'f',
    speechOverride: 'فاء',
    difficulty: 2,
    strokes: [
      loop(50, 32, 10),
      [
        { x: 55, y: 42 },
        { x: 48, y: 62 },
        { x: 38, y: 75 },
      ],
      dot(50, 12),
    ],
  },
  {
    id: 'arabic-qaf',
    language: 'arabic',
    char: 'ق',
    romanization: 'q',
    speechOverride: 'قاف',
    difficulty: 3,
    strokes: [
      loop(50, 32, 10),
      [
        { x: 55, y: 42 },
        { x: 52, y: 68 },
        { x: 42, y: 85 },
        { x: 32, y: 88 },
      ],
      dot(44, 12),
      dot(56, 12),
    ],
  },
  {
    id: 'arabic-kaf',
    language: 'arabic',
    char: 'ك',
    romanization: 'k',
    speechOverride: 'كاف',
    difficulty: 3,
    strokes: [
      [
        { x: 35, y: 15 },
        { x: 35, y: 70 },
        { x: 55, y: 70 },
      ],
      [
        { x: 35, y: 20 },
        { x: 50, y: 30 },
      ],
      [
        { x: 42, y: 45 },
        { x: 48, y: 50 },
        { x: 42, y: 55 },
      ],
    ],
  },
  {
    id: 'arabic-lam',
    language: 'arabic',
    char: 'ل',
    romanization: 'l',
    speechOverride: 'لام',
    difficulty: 2,
    strokes: [
      [
        { x: 55, y: 10 },
        { x: 50, y: 40 },
        { x: 45, y: 65 },
        { x: 35, y: 72 },
        { x: 25, y: 65 },
      ],
    ],
  },
  {
    id: 'arabic-meem',
    language: 'arabic',
    char: 'م',
    romanization: 'm',
    speechOverride: 'ميم',
    difficulty: 2,
    strokes: [
      loop(48, 40, 8),
      [
        { x: 48, y: 48 },
        { x: 48, y: 82 },
      ],
    ],
  },
  {
    id: 'arabic-noon',
    language: 'arabic',
    char: 'ن',
    romanization: 'n',
    speechOverride: 'نون',
    difficulty: 2,
    strokes: [
      [
        { x: 30, y: 40 },
        { x: 35, y: 55 },
        { x: 50, y: 60 },
        { x: 65, y: 55 },
        { x: 72, y: 40 },
        { x: 72, y: 30 },
      ],
      dot(50, 18),
    ],
  },
  {
    id: 'arabic-ha',
    language: 'arabic',
    char: 'ه',
    romanization: 'h',
    speechOverride: 'هاء',
    difficulty: 4,
    strokes: [
      [
        { x: 45, y: 20 },
        { x: 30, y: 25 },
        { x: 25, y: 40 },
        { x: 35, y: 52 },
        { x: 50, y: 50 },
        { x: 58, y: 38 },
        { x: 50, y: 28 },
        { x: 40, y: 32 },
        { x: 42, y: 42 },
        { x: 55, y: 45 },
      ],
    ],
  },
  {
    id: 'arabic-waw',
    language: 'arabic',
    char: 'و',
    romanization: 'w',
    speechOverride: 'واو',
    difficulty: 2,
    strokes: [
      loop(46, 35, 9),
      [
        { x: 50, y: 44 },
        { x: 45, y: 65 },
        { x: 35, y: 75 },
      ],
    ],
  },
  {
    id: 'arabic-ya',
    language: 'arabic',
    char: 'ي',
    romanization: 'y',
    speechOverride: 'ياء',
    difficulty: 3,
    strokes: [
      BOAT_BOWL,
      [
        { x: 22, y: 40 },
        { x: 20, y: 55 },
        { x: 25, y: 70 },
        { x: 35, y: 72 },
      ],
      dot(42, 80),
      dot(58, 80),
    ],
  },
];
