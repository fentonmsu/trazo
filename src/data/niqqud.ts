import type { CharacterTemplate } from '../types/character';
import { NIQQUD_MARKS } from './niqqudMarks';

/**
 * The Hebrew niqqud (vowel point) signs, practiced as standalone marks
 * rather than attached to a specific letter. `char` is just the bare mark -
 * HebrewGlyph.tsx is what adds the conventional Unicode "dotted circle"
 * placeholder (U+25CC) used whenever a combining mark is displayed in
 * isolation, since a font asked to render a mark with no base character in
 * its own text run may draw nothing at all rather than draw it "floating".
 * The circle itself is never part of the stroke data, only the mark is.
 *
 * For speech, a bare vowel point isn't real text a TTS voice can read, and
 * reading the Latin romanization (e.g. "a") through a Hebrew voice
 * mispronounces it. Instead each mark is paired with aleph (silent/glottal)
 * as `speechOverride` - real Hebrew text that a he-IL voice pronounces as a
 * clean, correctly-accented vowel.
 */

const ALEF = 'א';

export const niqqudCharacters: CharacterTemplate[] = NIQQUD_MARKS.map((mark) => ({
  id: `niqqud-${mark.id}`,
  language: 'niqqud',
  char: mark.codepoint,
  romanization: mark.vowelSound,
  meaning: mark.meaning,
  speechOverride: ALEF + mark.codepoint,
  strokes: mark.standaloneStrokes,
  difficulty: mark.difficulty,
}));
