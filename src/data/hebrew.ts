import type { CharacterTemplate } from '../types/character';
import { BASE_HEBREW_LETTERS } from './hebrewLetters';
import { NIQQUD_MARKS, attachedMarkStrokes } from './niqqudMarks';

/**
 * The Hebrew alphabet (26 entries: the 22 letters, plus bet/kaf/pe's dagesh
 * forms and sin, since those six change sound depending on a dot mark - see
 * hebrewLetters.ts), each shown with the qamats vowel point so the glyph
 * and its pronunciation ("consonant + a") are unambiguous - bare consonants
 * have no vowel sound on their own in Hebrew script.
 */

const QAMATS = NIQQUD_MARKS.find((m) => m.id === 'qamats')!;
const qamatsStrokes = attachedMarkStrokes(QAMATS);

export const hebrewCharacters: CharacterTemplate[] = BASE_HEBREW_LETTERS.map((letter) => ({
  id: `hebrew-${letter.id}`,
  language: 'hebrew',
  char: letter.char + (letter.extraMark?.codepoint ?? '') + QAMATS.codepoint,
  romanization: letter.consonantSound + QAMATS.vowelSound,
  strokes: [...letter.strokes, ...(letter.extraMark?.strokes ?? []), ...qamatsStrokes],
  difficulty: letter.difficulty,
}));
