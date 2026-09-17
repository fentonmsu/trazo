import type { CharacterTemplate, Stroke } from '../types/character';

/**
 * The Hebrew niqqud (vowel point) signs, practiced as standalone marks
 * rather than attached to a specific letter. Each glyph is shown on the
 * conventional Unicode "dotted circle" placeholder (U+25CC) used whenever a
 * combining mark is displayed in isolation - the circle itself is not part
 * of the stroke data, only the mark is.
 *
 * Since these marks have no inherent "letter" shape of their own, they are
 * authored to use a good portion of the 0-100 box directly (as if each mark
 * were its own glyph), rather than as a tiny attachment - the recognizer
 * normalizes by bounding box regardless, so this keeps proportions between
 * dots/lines meaningful after normalization.
 */

const dotSize = 3;
function dot(cx: number, cy: number): Stroke {
  return [
    { x: cx - dotSize, y: cy - dotSize },
    { x: cx + dotSize, y: cy + dotSize },
  ];
}

export const niqqudCharacters: CharacterTemplate[] = [
  // Qamats - long "a", a small "T" shape below the letter.
  {
    id: 'niqqud-qamats',
    language: 'niqqud',
    char: '◌ָ',
    romanization: 'a',
    meaning: 'vocal larga "a" (kamatz)',
    strokes: [
      [
        { x: 25, y: 40 },
        { x: 75, y: 40 },
        { x: 50, y: 40 },
        { x: 50, y: 75 },
      ],
    ],
    difficulty: 1,
  },

  // Patach - short "a", a single horizontal line.
  {
    id: 'niqqud-patach',
    language: 'niqqud',
    char: '◌ַ',
    romanization: 'a',
    meaning: 'vocal corta "a" (patach)',
    strokes: [
      [
        { x: 25, y: 50 },
        { x: 75, y: 50 },
      ],
    ],
    difficulty: 1,
  },

  // Tzere - long "e", two dots side by side.
  {
    id: 'niqqud-tzere',
    language: 'niqqud',
    char: '◌ֵ',
    romanization: 'e',
    meaning: 'vocal larga "e" (tzere)',
    strokes: [dot(35, 50), dot(65, 50)],
    difficulty: 1,
  },

  // Segol - short "e", three dots forming a downward triangle.
  {
    id: 'niqqud-segol',
    language: 'niqqud',
    char: '◌ֶ',
    romanization: 'e',
    meaning: 'vocal corta "e" (segol)',
    strokes: [dot(35, 40), dot(65, 40), dot(50, 62)],
    difficulty: 2,
  },

  // Hiriq - "i", a single dot.
  {
    id: 'niqqud-hiriq',
    language: 'niqqud',
    char: '◌ִ',
    romanization: 'i',
    meaning: 'vocal "i" (hiriq)',
    strokes: [dot(50, 50)],
    difficulty: 1,
  },

  // Holam - "o", a single dot placed up and to the right.
  {
    id: 'niqqud-holam',
    language: 'niqqud',
    char: '◌ֹ',
    romanization: 'o',
    meaning: 'vocal "o" (holam)',
    strokes: [dot(65, 30)],
    difficulty: 1,
  },

  // Kubutz - "u", three dots on a diagonal.
  {
    id: 'niqqud-kubutz',
    language: 'niqqud',
    char: '◌ֻ',
    romanization: 'u',
    meaning: 'vocal "u" (kubutz)',
    strokes: [dot(65, 40), dot(52, 52), dot(39, 64)],
    difficulty: 2,
  },

  // Shva - very short/silent "e", two dots stacked vertically.
  {
    id: 'niqqud-shva',
    language: 'niqqud',
    char: '◌ְ',
    romanization: 'e',
    meaning: 'vocal muy breve o muda (shva)',
    strokes: [dot(50, 40), dot(50, 60)],
    difficulty: 1,
  },
];
