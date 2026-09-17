import type { CharacterTemplate, Stroke } from '../types/character';
import { NIQQUD_MARKS, attachedMarkStrokes } from './niqqudMarks';

/**
 * Full Hebrew letter x niqqud combination grid: every one of the 22
 * consonants paired with every one of the 8 vowel points (176 characters
 * total), the way a Hebrew reading primer drills the alphabet (א אָ אַ אֵ
 * אֶ אִ אֹ אֻ אְ, ב בָ בַ ...). This is generated from the same base
 * consonant shapes used by src/data/hebrew.ts (which only pairs each
 * letter with qamats) and the same mark shapes used by src/data/niqqud.ts
 * (which practices the marks on their own) - see niqqudMarks.ts.
 */

interface BaseLetter {
  id: string;
  char: string;
  /** Consonant sound with no vowel, e.g. 'v' for bet, '' for the silent letters. */
  consonantSound: string;
  strokes: Stroke[];
  difficulty: number;
}

const BASE_HEBREW_LETTERS: BaseLetter[] = [
  {
    id: 'alef',
    char: 'א',
    consonantSound: '',
    difficulty: 5,
    strokes: [
      [
        { x: 72, y: 24 },
        { x: 50, y: 50 },
        { x: 30, y: 76 },
      ],
      [
        { x: 88, y: 18 },
        { x: 72, y: 28 },
        { x: 58, y: 38 },
      ],
      [
        { x: 44, y: 62 },
        { x: 30, y: 74 },
        { x: 14, y: 86 },
      ],
    ],
  },
  {
    id: 'bet',
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
];

export const hebrewFullCharacters: CharacterTemplate[] = BASE_HEBREW_LETTERS.flatMap((letter) =>
  NIQQUD_MARKS.map((mark) => ({
    id: `hebrew-full-${letter.id}-${mark.id}`,
    language: 'hebrewFull' as const,
    char: letter.char + mark.codepoint,
    romanization: letter.consonantSound + mark.vowelSound,
    meaning: mark.name,
    strokes: [...letter.strokes, ...attachedMarkStrokes(mark)],
    difficulty: letter.difficulty,
  })),
);
