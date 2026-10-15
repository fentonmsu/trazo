import type { CharacterTemplate, Stroke } from '../types/character';

/**
 * The 26 letters of the French alphabet (uppercase), plus the accented
 * letters formed with French's five diacritics - accent aigu (é), accent
 * grave (è/à/ù), accent circonflexe (â/ê/î/ô/û), tréma (ë/ï) and cédille
 * (ç). These aren't separate alphabet members (unlike Turkish/Polish's
 * accented letters) but they're common enough in real French spelling to
 * be worth their own practice entries.
 *
 * `romanization`/`speechOverride` are each letter's real French name (used
 * reciting the alphabet, e.g. H = "ache", G = "gé", W = "double vé") for
 * the base letters, and "<letter> accent <nom de l'accent>" for the
 * accented ones (e.g. é = "e accent aigu"), since several don't sound like
 * a naive reading of the glyph.
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

const E_STROKES: Stroke[] = [
  [{ x: 25, y: 15 }, { x: 25, y: 85 }],
  [{ x: 25, y: 15 }, { x: 75, y: 15 }],
  [{ x: 25, y: 50 }, { x: 65, y: 50 }],
  [{ x: 25, y: 85 }, { x: 75, y: 85 }],
];

const I_STROKES: Stroke[] = [[{ x: 50, y: 15 }, { x: 50, y: 85 }]];

// Accent aigu (´) - top-right diagonal tick.
const AIGU: Stroke = [{ x: 58, y: 6 }, { x: 70, y: -4 }];
// Accent grave (`) - mirrored tick, top-left leaning.
const GRAVE: Stroke = [{ x: 42, y: 6 }, { x: 30, y: -4 }];
// Accent circonflexe (ˆ) - small upward chevron.
const CIRCONFLEXE: Stroke = [{ x: 38, y: 2 }, { x: 50, y: -8 }, { x: 62, y: 2 }];
// Tréma (¨) - two dots side by side.
const TREMA: Stroke[] = [
  [{ x: 38, y: -2 }, { x: 42, y: 2 }],
  [{ x: 58, y: -2 }, { x: 62, y: 2 }],
];
// Cédille (¸) - small hook hanging off the bottom.
const CEDILLE: Stroke = [{ x: 48, y: 87 }, { x: 53, y: 94 }, { x: 46, y: 97 }];

const RAW_FRENCH_LETTERS: CharacterTemplate[] = [
  { id: 'french-a', char: 'A', romanization: 'a', language: 'french', difficulty: 1, strokes: A_STROKES },
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
  { id: 'french-e', char: 'E', romanization: 'e', language: 'french', difficulty: 1, strokes: E_STROKES },
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
  { id: 'french-i', char: 'I', romanization: 'i', language: 'french', difficulty: 1, strokes: I_STROKES },
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
  // --- Accented letters ---
  { id: 'french-e-aigu', char: 'É', romanization: 'e accent aigu', language: 'french', difficulty: 2, strokes: [...E_STROKES, AIGU] },
  { id: 'french-e-grave', char: 'È', romanization: 'e accent grave', language: 'french', difficulty: 2, strokes: [...E_STROKES, GRAVE] },
  { id: 'french-a-grave', char: 'À', romanization: 'a accent grave', language: 'french', difficulty: 2, strokes: [...A_STROKES, GRAVE] },
  { id: 'french-u-grave', char: 'Ù', romanization: 'u accent grave', language: 'french', difficulty: 2, strokes: [U_CURVE, GRAVE] },
  { id: 'french-a-circonflexe', char: 'Â', romanization: 'a accent circonflexe', language: 'french', difficulty: 3, strokes: [...A_STROKES, CIRCONFLEXE] },
  { id: 'french-e-circonflexe', char: 'Ê', romanization: 'e accent circonflexe', language: 'french', difficulty: 3, strokes: [...E_STROKES, CIRCONFLEXE] },
  { id: 'french-i-circonflexe', char: 'Î', romanization: 'i accent circonflexe', language: 'french', difficulty: 2, strokes: [...I_STROKES, CIRCONFLEXE] },
  { id: 'french-o-circonflexe', char: 'Ô', romanization: 'o accent circonflexe', language: 'french', difficulty: 3, strokes: [O_LOOP, CIRCONFLEXE] },
  { id: 'french-u-circonflexe', char: 'Û', romanization: 'u accent circonflexe', language: 'french', difficulty: 3, strokes: [U_CURVE, CIRCONFLEXE] },
  { id: 'french-e-trema', char: 'Ë', romanization: 'e tréma', language: 'french', difficulty: 2, strokes: [...E_STROKES, ...TREMA] },
  { id: 'french-i-trema', char: 'Ï', romanization: 'i tréma', language: 'french', difficulty: 2, strokes: [...I_STROKES, ...TREMA] },
  { id: 'french-c-cedille', char: 'Ç', romanization: 'c cédille', language: 'french', difficulty: 2, strokes: [C_CURVE, CEDILLE] },
];

// Explicit speechOverride (= the letter's real French name) so TTS reads
// the correct word instead of guessing from the bare glyph.
export const frenchCharacters: CharacterTemplate[] = RAW_FRENCH_LETTERS.map((letter) => ({
  ...letter,
  speechOverride: letter.romanization,
}));
