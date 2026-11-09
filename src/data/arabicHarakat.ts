import type { CharacterTemplate, Stroke } from '../types/character';

/**
 * The Arabic tashkeel (harakat) - short-vowel and consonant-doubling marks -
 * practiced as standalone marks, the Arabic equivalent of niqqud.ts for
 * Hebrew. `char` attaches each mark to a tatweel (ـ, U+0640), the
 * conventional Arabic placeholder for showing a diacritic with no real
 * letter underneath (the Hebrew "dotted circle" trick doesn't work here -
 * tested against Noto Naskh Arabic and a bare combining mark after U+25CC
 * renders as the wrong fallback glyph for damma/shadda/sukun; tatweel
 * attaches every mark correctly).
 *
 * `speechOverride` pairs each mark with baa (ب) - a real Arabic consonant -
 * since a bare vowel sign isn't speakable text on its own, same reasoning
 * as niqqud.ts's aleph pairing for Hebrew.
 */

const BAA = 'ب';
const TATWEEL = 'ـ';

function mark(id: string, codepoint: string, romanization: string, meaning: string, strokes: Stroke[], difficulty: number): CharacterTemplate {
  return {
    id: `arabicHarakat-${id}`,
    language: 'arabicHarakat',
    char: TATWEEL + codepoint,
    romanization,
    meaning,
    speechOverride: BAA + codepoint,
    strokes,
    difficulty,
  };
}

export const arabicHarakatCharacters: CharacterTemplate[] = [
  mark(
    'fatha',
    'َ',
    'a',
    'fatha (vocal "a" corta)',
    [[{ x: 43, y: 48 }, { x: 56, y: 38 }]],
    1,
  ),
  mark(
    'damma',
    'ُ',
    'u',
    'damma (vocal "u" corta)',
    [[{ x: 50, y: 28 }, { x: 56, y: 35 }, { x: 50, y: 42 }, { x: 44, y: 38 }, { x: 50, y: 33 }, { x: 48, y: 42 }, { x: 40, y: 50 }]],
    2,
  ),
  mark(
    'kasra',
    'ِ',
    'i',
    'kasra (vocal "i" corta)',
    [[{ x: 44, y: 75 }, { x: 58, y: 65 }]],
    1,
  ),
  mark(
    'shadda',
    'ّ',
    'ʰ',
    'shadda (duplica la consonante)',
    [[{ x: 40, y: 32 }, { x: 46, y: 46 }, { x: 50, y: 32 }, { x: 55, y: 46 }, { x: 60, y: 34 }]],
    3,
  ),
  mark(
    'sukun',
    'ْ',
    '-',
    'sukun (ausencia de vocal)',
    [[{ x: 58, y: 38 }, { x: 50, y: 30 }, { x: 42, y: 38 }, { x: 50, y: 46 }, { x: 58, y: 38 }]],
    1,
  ),
  mark(
    'fathatan',
    'ً',
    'an',
    'fathatan (tanwin "an" final)',
    [
      [{ x: 42, y: 42 }, { x: 56, y: 34 }],
      [{ x: 42, y: 50 }, { x: 56, y: 42 }],
    ],
    3,
  ),
  mark(
    'dammatan',
    'ٌ',
    'un',
    'dammatan (tanwin "un" final)',
    [[{ x: 52, y: 28 }, { x: 58, y: 35 }, { x: 52, y: 42 }, { x: 46, y: 38 }, { x: 52, y: 33 }, { x: 50, y: 42 }, { x: 42, y: 48 }, { x: 36, y: 44 }]],
    4,
  ),
  mark(
    'kasratan',
    'ٍ',
    'in',
    'kasratan (tanwin "in" final)',
    [
      [{ x: 44, y: 70 }, { x: 58, y: 62 }],
      [{ x: 44, y: 78 }, { x: 58, y: 70 }],
    ],
    3,
  ),
];
