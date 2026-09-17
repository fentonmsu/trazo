import type { CharacterTemplate } from '../types/character';
import { BASE_HEBREW_LETTERS } from './hebrewLetters';
import { NIQQUD_MARKS, attachedMarkStrokes } from './niqqudMarks';

/**
 * Full Hebrew letter x niqqud combination grid: every consonant (26,
 * counting bet/kaf/pe's dagesh forms and sin - see hebrewLetters.ts) paired
 * with every one of the 8 vowel points (208 characters total), the way a
 * Hebrew reading primer drills the alphabet (א אָ אַ אֵ אֶ אִ אֹ אֻ אְ,
 * בּ בָּ בַּ ... ).
 */

export const hebrewFullCharacters: CharacterTemplate[] = BASE_HEBREW_LETTERS.flatMap((letter) =>
  NIQQUD_MARKS.map((mark) => ({
    id: `hebrew-full-${letter.id}-${mark.id}`,
    language: 'hebrewFull' as const,
    char: letter.char + (letter.extraMark?.codepoint ?? '') + mark.codepoint,
    romanization: letter.consonantSound + mark.vowelSound,
    meaning: mark.name,
    strokes: [...letter.strokes, ...(letter.extraMark?.strokes ?? []), ...attachedMarkStrokes(mark)],
    difficulty: letter.difficulty,
  })),
);
