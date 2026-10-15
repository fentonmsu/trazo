import type { CharacterTemplate, Stroke } from '../types/character';

/**
 * The 27-letter Spanish alphabet (A-Z plus Ñ, the RAE's modern official
 * count - ch/ll were dropped as separate letters in 2010), plus the five
 * acute-accented vowels (Á É Í Ó Ú), Ü (used in "pingüino", "vergüenza"),
 * and the two opening punctuation marks unique to Spanish, ¡ and ¿ (used
 * at the start of exclamations/questions).
 *
 * `romanization`/`speechOverride` are each base letter's real Spanish name
 * (e.g. H = "hache", Y = "ye", W = "uve doble"), since several letters
 * don't sound like a naive reading of the glyph. Accented vowels speak
 * themselves; ¡/¿ speak their full descriptive names.
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

const N_STROKES: Stroke[] = [[{ x: 20, y: 85 }, { x: 20, y: 15 }, { x: 80, y: 85 }, { x: 80, y: 15 }]];

// Tilde (~) - the wavy mark over ñ.
const TILDE_N: Stroke = [
  { x: 30, y: 2 },
  { x: 40, y: -5 },
  { x: 50, y: 2 },
  { x: 60, y: -5 },
  { x: 70, y: 2 },
];

// Acute accent (´) - top-right diagonal tick, used by á/é/í/ó/ú.
const ACUTE: Stroke = [{ x: 58, y: 6 }, { x: 70, y: -4 }];

// Small dot stroke, reused for the top marks of ¡/¿.
function dot(cx: number, cy: number): Stroke {
  return [{ x: cx - 3, y: cy - 3 }, { x: cx + 3, y: cy + 3 }];
}

// Diéresis (¨) - two dots side by side, used by ü (e.g. "pingüino", "vergüenza").
const DIERESIS: Stroke[] = [
  [{ x: 38, y: -2 }, { x: 42, y: 2 }],
  [{ x: 58, y: -2 }, { x: 62, y: 2 }],
];

const RAW_SPANISH_LETTERS: CharacterTemplate[] = [
  { id: 'spanish-a', char: 'A', romanization: 'a', language: 'spanish', difficulty: 1, strokes: A_STROKES },
  {
    id: 'spanish-b',
    char: 'B',
    romanization: 'be',
    language: 'spanish',
    difficulty: 2,
    strokes: [
      [{ x: 25, y: 15 }, { x: 25, y: 85 }],
      [{ x: 25, y: 15 }, { x: 60, y: 15 }, { x: 70, y: 30 }, { x: 60, y: 50 }, { x: 25, y: 50 }],
      [{ x: 25, y: 50 }, { x: 65, y: 50 }, { x: 75, y: 68 }, { x: 65, y: 85 }, { x: 25, y: 85 }],
    ],
  },
  { id: 'spanish-c', char: 'C', romanization: 'ce', language: 'spanish', difficulty: 2, strokes: [C_CURVE] },
  {
    id: 'spanish-d',
    char: 'D',
    romanization: 'de',
    language: 'spanish',
    difficulty: 2,
    strokes: [
      [{ x: 25, y: 15 }, { x: 25, y: 85 }],
      [{ x: 25, y: 15 }, { x: 55, y: 15 }, { x: 75, y: 35 }, { x: 75, y: 65 }, { x: 55, y: 85 }, { x: 25, y: 85 }],
    ],
  },
  { id: 'spanish-e', char: 'E', romanization: 'e', language: 'spanish', difficulty: 1, strokes: E_STROKES },
  {
    id: 'spanish-f',
    char: 'F',
    romanization: 'efe',
    language: 'spanish',
    difficulty: 1,
    strokes: [
      [{ x: 25, y: 15 }, { x: 25, y: 85 }],
      [{ x: 25, y: 15 }, { x: 75, y: 15 }],
      [{ x: 25, y: 50 }, { x: 65, y: 50 }],
    ],
  },
  { id: 'spanish-g', char: 'G', romanization: 'ge', language: 'spanish', difficulty: 3, strokes: [C_CURVE, G_HOOK] },
  {
    id: 'spanish-h',
    char: 'H',
    romanization: 'hache',
    language: 'spanish',
    difficulty: 1,
    strokes: [
      [{ x: 25, y: 15 }, { x: 25, y: 85 }],
      [{ x: 75, y: 15 }, { x: 75, y: 85 }],
      [{ x: 25, y: 50 }, { x: 75, y: 50 }],
    ],
  },
  { id: 'spanish-i', char: 'I', romanization: 'i', language: 'spanish', difficulty: 1, strokes: I_STROKES },
  {
    id: 'spanish-j',
    char: 'J',
    romanization: 'jota',
    language: 'spanish',
    difficulty: 2,
    strokes: [[{ x: 65, y: 15 }, { x: 65, y: 70 }, { x: 50, y: 85 }, { x: 30, y: 80 }]],
  },
  {
    id: 'spanish-k',
    char: 'K',
    romanization: 'ka',
    language: 'spanish',
    difficulty: 2,
    strokes: [
      [{ x: 25, y: 15 }, { x: 25, y: 85 }],
      [{ x: 75, y: 15 }, { x: 25, y: 50 }],
      [{ x: 35, y: 55 }, { x: 75, y: 85 }],
    ],
  },
  {
    id: 'spanish-l',
    char: 'L',
    romanization: 'ele',
    language: 'spanish',
    difficulty: 1,
    strokes: [
      [{ x: 25, y: 15 }, { x: 25, y: 85 }],
      [{ x: 25, y: 85 }, { x: 75, y: 85 }],
    ],
  },
  {
    id: 'spanish-m',
    char: 'M',
    romanization: 'eme',
    language: 'spanish',
    difficulty: 2,
    strokes: [[{ x: 20, y: 85 }, { x: 20, y: 15 }, { x: 50, y: 55 }, { x: 80, y: 15 }, { x: 80, y: 85 }]],
  },
  { id: 'spanish-n', char: 'N', romanization: 'ene', language: 'spanish', difficulty: 2, strokes: N_STROKES },
  { id: 'spanish-enie', char: 'Ñ', romanization: 'eñe', language: 'spanish', difficulty: 2, strokes: [...N_STROKES, TILDE_N] },
  { id: 'spanish-o', char: 'O', romanization: 'o', language: 'spanish', difficulty: 2, strokes: [O_LOOP] },
  {
    id: 'spanish-p',
    char: 'P',
    romanization: 'pe',
    language: 'spanish',
    difficulty: 2,
    strokes: [
      [{ x: 25, y: 15 }, { x: 25, y: 85 }],
      [{ x: 25, y: 15 }, { x: 60, y: 15 }, { x: 72, y: 30 }, { x: 60, y: 48 }, { x: 25, y: 48 }],
    ],
  },
  {
    id: 'spanish-q',
    char: 'Q',
    romanization: 'cu',
    language: 'spanish',
    difficulty: 3,
    strokes: [O_LOOP, [{ x: 55, y: 70 }, { x: 80, y: 95 }]],
  },
  {
    id: 'spanish-r',
    char: 'R',
    romanization: 'erre',
    language: 'spanish',
    difficulty: 3,
    strokes: [
      [{ x: 25, y: 15 }, { x: 25, y: 85 }],
      [{ x: 25, y: 15 }, { x: 60, y: 15 }, { x: 72, y: 30 }, { x: 60, y: 48 }, { x: 25, y: 48 }],
      [{ x: 45, y: 48 }, { x: 75, y: 85 }],
    ],
  },
  { id: 'spanish-s', char: 'S', romanization: 'ese', language: 'spanish', difficulty: 3, strokes: [S_CURVE] },
  {
    id: 'spanish-t',
    char: 'T',
    romanization: 'te',
    language: 'spanish',
    difficulty: 1,
    strokes: [
      [{ x: 20, y: 15 }, { x: 80, y: 15 }],
      [{ x: 50, y: 15 }, { x: 50, y: 85 }],
    ],
  },
  { id: 'spanish-u', char: 'U', romanization: 'u', language: 'spanish', difficulty: 2, strokes: [U_CURVE] },
  {
    id: 'spanish-v',
    char: 'V',
    romanization: 'uve',
    language: 'spanish',
    difficulty: 1,
    strokes: [
      [{ x: 20, y: 15 }, { x: 50, y: 85 }],
      [{ x: 50, y: 85 }, { x: 80, y: 15 }],
    ],
  },
  {
    id: 'spanish-w',
    char: 'W',
    romanization: 'uve doble',
    language: 'spanish',
    difficulty: 2,
    strokes: [[{ x: 15, y: 15 }, { x: 30, y: 85 }, { x: 50, y: 45 }, { x: 70, y: 85 }, { x: 85, y: 15 }]],
  },
  {
    id: 'spanish-x',
    char: 'X',
    romanization: 'equis',
    language: 'spanish',
    difficulty: 1,
    strokes: [
      [{ x: 20, y: 15 }, { x: 80, y: 85 }],
      [{ x: 80, y: 15 }, { x: 20, y: 85 }],
    ],
  },
  {
    id: 'spanish-y',
    char: 'Y',
    romanization: 'ye',
    language: 'spanish',
    difficulty: 2,
    strokes: [
      [{ x: 20, y: 15 }, { x: 50, y: 50 }],
      [{ x: 80, y: 15 }, { x: 50, y: 50 }],
      [{ x: 50, y: 50 }, { x: 50, y: 85 }],
    ],
  },
  {
    id: 'spanish-z',
    char: 'Z',
    romanization: 'zeta',
    language: 'spanish',
    difficulty: 1,
    strokes: [[{ x: 20, y: 15 }, { x: 80, y: 15 }, { x: 20, y: 85 }, { x: 80, y: 85 }]],
  },
  // --- Acute-accented vowels ---
  { id: 'spanish-a-tilde', char: 'Á', romanization: 'á', language: 'spanish', difficulty: 2, strokes: [...A_STROKES, ACUTE] },
  { id: 'spanish-e-tilde', char: 'É', romanization: 'é', language: 'spanish', difficulty: 2, strokes: [...E_STROKES, ACUTE] },
  { id: 'spanish-i-tilde', char: 'Í', romanization: 'í', language: 'spanish', difficulty: 2, strokes: [...I_STROKES, ACUTE] },
  { id: 'spanish-o-tilde', char: 'Ó', romanization: 'ó', language: 'spanish', difficulty: 2, strokes: [O_LOOP, ACUTE] },
  { id: 'spanish-u-tilde', char: 'Ú', romanization: 'ú', language: 'spanish', difficulty: 2, strokes: [U_CURVE, ACUTE] },
  { id: 'spanish-u-dieresis', char: 'Ü', romanization: 'ü', language: 'spanish', difficulty: 2, strokes: [U_CURVE, ...DIERESIS] },
  // --- Opening punctuation (unique to Spanish) ---
  {
    id: 'spanish-open-exclamation',
    char: '¡',
    romanization: 'abre exclamación',
    speechOverride: 'signo de apertura de exclamación',
    language: 'spanish',
    difficulty: 1,
    strokes: [dot(50, 18), [{ x: 50, y: 38 }, { x: 50, y: 85 }]],
  },
  {
    id: 'spanish-open-question',
    char: '¿',
    romanization: 'abre interrogación',
    speechOverride: 'signo de apertura de interrogación',
    language: 'spanish',
    difficulty: 2,
    strokes: [dot(50, 18), [{ x: 52, y: 35 }, { x: 40, y: 38 }, { x: 32, y: 50 }, { x: 38, y: 62 }, { x: 50, y: 65 }, { x: 50, y: 82 }]],
  },
];

// Base letters use their real Spanish alphabet name for speech; accented
// vowels and the punctuation marks already set their own speechOverride
// above, so this only fills in the ones that don't have one yet.
export const spanishCharacters: CharacterTemplate[] = RAW_SPANISH_LETTERS.map((letter) => ({
  ...letter,
  speechOverride: letter.speechOverride ?? letter.romanization,
}));
