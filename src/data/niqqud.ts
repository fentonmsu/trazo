import type { CharacterTemplate } from '../types/character';
import { NIQQUD_MARKS } from './niqqudMarks';

/**
 * The Hebrew niqqud (vowel point) signs, practiced as standalone marks
 * rather than attached to a specific letter. Each glyph is shown on the
 * conventional Unicode "dotted circle" placeholder (U+25CC) used whenever a
 * combining mark is displayed in isolation - the circle itself is not part
 * of the stroke data, only the mark is.
 *
 * For speech, a bare vowel point on a dotted circle isn't real text a TTS
 * voice can read, and reading the Latin romanization (e.g. "a") through a
 * Hebrew voice mispronounces it. Instead each mark is paired with aleph
 * (silent/glottal) as `speechOverride` - real Hebrew text that a he-IL voice
 * pronounces as a clean, correctly-accented vowel.
 */

const ALEF = 'א';
const DOTTED_CIRCLE = '◌';

export const niqqudCharacters: CharacterTemplate[] = NIQQUD_MARKS.map((mark) => ({
  id: `niqqud-${mark.id}`,
  language: 'niqqud',
  char: DOTTED_CIRCLE + mark.codepoint,
  romanization: mark.vowelSound,
  meaning: mark.meaning,
  speechOverride: ALEF + mark.codepoint,
  strokes: mark.standaloneStrokes,
  difficulty: mark.difficulty,
}));
