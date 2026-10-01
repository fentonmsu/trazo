import type { Stroke } from '../types/character';
import { dotStroke } from '../engine/geometry';

/**
 * Base Hebrew consonant shapes, shared by src/data/hebrew.ts (letter +
 * qamats only) and src/data/hebrewFull.ts (letter x every niqqud vowel).
 *
 * Six of the 22 alphabet letters change sound depending on a dot mark:
 * - ב bet/vet, כ kaf/khaf, פ pe/fe: a dagesh (ּ) inside the letter
 *   turns the fricative (v/kh/f) into a stop (b/k/p).
 * - ש shin/sin: a dot on the top-right (shin dot, ׁ) vs top-left
 *   (sin dot, ׂ) changes the sound between "sh" and "s".
 * Both forms of each are listed here as separate entries (26 total) so
 * both sounds are practiceable and correctly pronounced/spelled.
 */

export interface ExtraMark {
  codepoint: string;
  strokes: Stroke[];
}

export interface BaseHebrewLetter {
  id: string;
  char: string;
  consonantSound: string;
  strokes: Stroke[];
  difficulty: number;
  /** Dagesh or shin/sin dot, drawn right after the base letter's strokes. */
  extraMark?: ExtraMark;
}

const DAGESH = 'ּ';
const SHIN_DOT = 'ׁ';
const SIN_DOT = 'ׂ';

export const BASE_HEBREW_LETTERS: BaseHebrewLetter[] = [
  {
    id: 'alef',
    char: 'א',
    consonantSound: '',
    difficulty: 5,
    // Coordinates verified against the actual rendered glyph (Noto Sans
    // Hebrew): sampled its pixel silhouette on 2.5-unit scanlines and
    // traced the centerline of each run. In this sans-serif face aleph is
    // a clean X - two full diagonals crossing around (50, 46) - not a
    // spine with two short arms as earlier hand-guessed coordinates had it.
    strokes: [
      // Main spine: top-right to bottom-left.
      [
        { x: 83, y: 13 },
        { x: 56, y: 47 },
        { x: 29, y: 87 },
      ],
      // Crossing diagonal: top-left to bottom-right.
      [
        { x: 32, y: 13 },
        { x: 56, y: 47 },
        { x: 84, y: 86 },
      ],
    ],
  },
  {
    id: 'bet',
    char: 'ב',
    consonantSound: 'b',
    difficulty: 2,
    extraMark: { codepoint: DAGESH, strokes: [dotStroke(50, 48)] },
    strokes: [
      [
        { x: 25, y: 20 },
        { x: 80, y: 20 },
        { x: 80, y: 80 },
        { x: 15, y: 80 },
      ],
    ],
  },
  {
    id: 'vet',
    char: 'ב',
    consonantSound: 'v',
    difficulty: 2,
    strokes: [
      [
        { x: 25, y: 20 },
        { x: 80, y: 20 },
        { x: 80, y: 80 },
        { x: 15, y: 80 },
      ],
    ],
  },
  {
    id: 'gimel',
    char: 'ג',
    consonantSound: 'g',
    difficulty: 2,
    strokes: [
      [
        { x: 62, y: 20 },
        { x: 62, y: 50 },
      ],
      [
        { x: 60, y: 45 },
        { x: 45, y: 62 },
        { x: 30, y: 80 },
      ],
    ],
  },
  {
    id: 'dalet',
    char: 'ד',
    consonantSound: 'd',
    difficulty: 2,
    strokes: [
      [
        { x: 25, y: 20 },
        { x: 75, y: 20 },
        { x: 82, y: 14 },
      ],
      [
        { x: 75, y: 20 },
        { x: 75, y: 80 },
      ],
    ],
  },
  {
    id: 'he',
    char: 'ה',
    consonantSound: 'h',
    difficulty: 2,
    strokes: [
      [
        { x: 20, y: 20 },
        { x: 80, y: 20 },
        { x: 80, y: 80 },
      ],
      [
        { x: 22, y: 30 },
        { x: 22, y: 80 },
      ],
    ],
  },
  {
    id: 'vav',
    char: 'ו',
    consonantSound: 'v',
    difficulty: 1,
    strokes: [
      [
        { x: 55, y: 15 },
        { x: 48, y: 22 },
        { x: 50, y: 50 },
        { x: 50, y: 80 },
      ],
    ],
  },
  {
    id: 'zayin',
    char: 'ז',
    consonantSound: 'z',
    difficulty: 1,
    strokes: [
      [
        { x: 35, y: 20 },
        { x: 65, y: 20 },
        { x: 58, y: 45 },
        { x: 50, y: 80 },
      ],
    ],
  },
  {
    id: 'het',
    char: 'ח',
    consonantSound: 'ch',
    difficulty: 2,
    strokes: [
      [
        { x: 25, y: 22 },
        { x: 25, y: 80 },
      ],
      [
        { x: 22, y: 20 },
        { x: 78, y: 20 },
        { x: 78, y: 80 },
      ],
    ],
  },
  {
    id: 'tet',
    char: 'ט',
    consonantSound: 't',
    difficulty: 3,
    strokes: [
      [
        { x: 28, y: 25 },
        { x: 25, y: 50 },
        { x: 28, y: 70 },
        { x: 45, y: 80 },
        { x: 62, y: 75 },
        { x: 70, y: 60 },
        { x: 70, y: 42 },
      ],
      [
        { x: 72, y: 35 },
        { x: 65, y: 22 },
        { x: 50, y: 20 },
        { x: 42, y: 26 },
      ],
    ],
  },
  {
    id: 'yod',
    char: 'י',
    consonantSound: 'y',
    difficulty: 1,
    strokes: [
      [
        { x: 58, y: 22 },
        { x: 50, y: 30 },
        { x: 45, y: 42 },
      ],
    ],
  },
  {
    id: 'kaf',
    char: 'כ',
    consonantSound: 'k',
    difficulty: 2,
    extraMark: { codepoint: DAGESH, strokes: [dotStroke(52, 46)] },
    strokes: [
      [
        { x: 30, y: 25 },
        { x: 55, y: 20 },
        { x: 75, y: 30 },
        { x: 80, y: 50 },
        { x: 72, y: 68 },
        { x: 50, y: 78 },
        { x: 28, y: 75 },
      ],
    ],
  },
  {
    id: 'khaf',
    char: 'כ',
    consonantSound: 'kh',
    difficulty: 2,
    strokes: [
      [
        { x: 30, y: 25 },
        { x: 55, y: 20 },
        { x: 75, y: 30 },
        { x: 80, y: 50 },
        { x: 72, y: 68 },
        { x: 50, y: 78 },
        { x: 28, y: 75 },
      ],
    ],
  },
  {
    id: 'lamed',
    char: 'ל',
    consonantSound: 'l',
    difficulty: 1,
    strokes: [
      [
        { x: 62, y: 5 },
        { x: 50, y: 35 },
        { x: 40, y: 60 },
        { x: 50, y: 75 },
        { x: 35, y: 80 },
        { x: 25, y: 70 },
      ],
    ],
  },
  {
    id: 'mem',
    char: 'מ',
    consonantSound: 'm',
    difficulty: 3,
    strokes: [
      [
        { x: 25, y: 22 },
        { x: 75, y: 20 },
        { x: 75, y: 80 },
        { x: 32, y: 80 },
      ],
      [
        { x: 25, y: 22 },
        { x: 25, y: 72 },
        { x: 30, y: 78 },
      ],
    ],
  },
  {
    id: 'nun',
    char: 'נ',
    consonantSound: 'n',
    difficulty: 1,
    strokes: [
      [
        { x: 55, y: 20 },
        { x: 52, y: 60 },
        { x: 45, y: 75 },
        { x: 30, y: 78 },
      ],
    ],
  },
  {
    id: 'samekh',
    char: 'ס',
    consonantSound: 's',
    difficulty: 2,
    strokes: [
      [
        { x: 50, y: 20 },
        { x: 30, y: 28 },
        { x: 22, y: 50 },
        { x: 30, y: 72 },
        { x: 50, y: 80 },
        { x: 70, y: 72 },
        { x: 78, y: 50 },
        { x: 70, y: 28 },
        { x: 50, y: 20 },
      ],
    ],
  },
  {
    id: 'ayin',
    char: 'ע',
    consonantSound: '',
    difficulty: 4,
    strokes: [
      [
        { x: 70, y: 22 },
        { x: 60, y: 40 },
        { x: 50, y: 58 },
        { x: 35, y: 78 },
      ],
      [
        { x: 35, y: 25 },
        { x: 42, y: 45 },
        { x: 48, y: 60 },
      ],
    ],
  },
  {
    id: 'pe',
    char: 'פ',
    consonantSound: 'p',
    difficulty: 3,
    extraMark: { codepoint: DAGESH, strokes: [dotStroke(50, 48)] },
    strokes: [
      [
        { x: 30, y: 25 },
        { x: 55, y: 20 },
        { x: 75, y: 30 },
        { x: 80, y: 50 },
        { x: 72, y: 68 },
        { x: 50, y: 78 },
        { x: 28, y: 75 },
      ],
      [
        { x: 62, y: 35 },
        { x: 65, y: 50 },
        { x: 60, y: 62 },
      ],
    ],
  },
  {
    id: 'fe',
    char: 'פ',
    consonantSound: 'f',
    difficulty: 3,
    strokes: [
      [
        { x: 30, y: 25 },
        { x: 55, y: 20 },
        { x: 75, y: 30 },
        { x: 80, y: 50 },
        { x: 72, y: 68 },
        { x: 50, y: 78 },
        { x: 28, y: 75 },
      ],
      [
        { x: 62, y: 35 },
        { x: 65, y: 50 },
        { x: 60, y: 62 },
      ],
    ],
  },
  {
    id: 'tsadi',
    char: 'צ',
    consonantSound: 'ts',
    difficulty: 4,
    strokes: [
      [
        { x: 45, y: 25 },
        { x: 42, y: 55 },
        { x: 38, y: 72 },
        { x: 25, y: 80 },
      ],
      [
        { x: 48, y: 45 },
        { x: 60, y: 30 },
        { x: 72, y: 20 },
      ],
    ],
  },
  {
    id: 'qof',
    char: 'ק',
    consonantSound: 'k',
    difficulty: 3,
    strokes: [
      [
        { x: 30, y: 30 },
        { x: 35, y: 20 },
        { x: 55, y: 18 },
        { x: 68, y: 25 },
        { x: 70, y: 38 },
      ],
      [
        { x: 70, y: 25 },
        { x: 68, y: 55 },
        { x: 65, y: 95 },
      ],
    ],
  },
  {
    id: 'resh',
    char: 'ר',
    consonantSound: 'r',
    difficulty: 1,
    strokes: [
      [
        { x: 30, y: 22 },
        { x: 55, y: 18 },
        { x: 72, y: 25 },
        { x: 70, y: 50 },
        { x: 65, y: 80 },
      ],
    ],
  },
  {
    id: 'shin',
    char: 'ש',
    consonantSound: 'sh',
    difficulty: 5,
    extraMark: { codepoint: SHIN_DOT, strokes: [dotStroke(74, 12)] },
    strokes: [
      [
        { x: 78, y: 20 },
        { x: 70, y: 45 },
        { x: 68, y: 70 },
      ],
      [
        { x: 52, y: 25 },
        { x: 50, y: 45 },
        { x: 50, y: 70 },
      ],
      [
        { x: 30, y: 20 },
        { x: 35, y: 45 },
        { x: 45, y: 68 },
      ],
    ],
  },
  {
    id: 'sin',
    char: 'ש',
    consonantSound: 's',
    difficulty: 5,
    extraMark: { codepoint: SIN_DOT, strokes: [dotStroke(26, 12)] },
    strokes: [
      [
        { x: 78, y: 20 },
        { x: 70, y: 45 },
        { x: 68, y: 70 },
      ],
      [
        { x: 52, y: 25 },
        { x: 50, y: 45 },
        { x: 50, y: 70 },
      ],
      [
        { x: 30, y: 20 },
        { x: 35, y: 45 },
        { x: 45, y: 68 },
      ],
    ],
  },
  {
    id: 'tav',
    char: 'ת',
    consonantSound: 't',
    difficulty: 3,
    strokes: [
      [
        { x: 25, y: 22 },
        { x: 25, y: 80 },
      ],
      [
        { x: 22, y: 20 },
        { x: 78, y: 20 },
        { x: 78, y: 72 },
        { x: 68, y: 80 },
      ],
    ],
  },

  // Sofit (final) forms - used when the letter ends a word. Their defining
  // trait is a straight descender that drops below the normal baseline,
  // instead of curling/closing back the way the regular form does.
  {
    id: 'kaf-sofit',
    char: 'ך',
    consonantSound: 'kh',
    difficulty: 2,
    strokes: [
      [
        { x: 58, y: 20 },
        { x: 50, y: 26 },
        { x: 48, y: 55 },
        { x: 48, y: 95 },
      ],
    ],
  },
  {
    id: 'mem-sofit',
    char: 'ם',
    consonantSound: 'm',
    difficulty: 2,
    strokes: [
      [
        { x: 25, y: 20 },
        { x: 75, y: 20 },
        { x: 75, y: 80 },
        { x: 25, y: 80 },
        { x: 25, y: 20 },
      ],
    ],
  },
  {
    id: 'nun-sofit',
    char: 'ן',
    consonantSound: 'n',
    difficulty: 1,
    strokes: [
      [
        { x: 50, y: 18 },
        { x: 50, y: 95 },
      ],
    ],
  },
  {
    id: 'pe-sofit',
    char: 'ף',
    consonantSound: 'f',
    difficulty: 3,
    strokes: [
      [
        { x: 30, y: 25 },
        { x: 55, y: 20 },
        { x: 75, y: 30 },
        { x: 80, y: 50 },
        { x: 72, y: 65 },
        { x: 55, y: 72 },
      ],
      [
        { x: 70, y: 45 },
        { x: 68, y: 70 },
        { x: 65, y: 95 },
      ],
    ],
  },
  {
    id: 'tsadi-sofit',
    char: 'ץ',
    consonantSound: 'ts',
    difficulty: 4,
    strokes: [
      [
        { x: 45, y: 25 },
        { x: 42, y: 55 },
        { x: 40, y: 95 },
      ],
      [
        { x: 48, y: 45 },
        { x: 60, y: 30 },
        { x: 72, y: 20 },
      ],
    ],
  },
];
