import { describe, expect, it } from 'vitest';
import { existsSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CHARACTERS_BY_LANGUAGE } from '../src/data';
import { LANGUAGE_ORDER, LANGUAGES } from '../src/data/languages';
import type { CharacterTemplate, LanguageId } from '../src/types/character';

/**
 * Data-driven checks over every character in every language, so this
 * automatically covers new characters/languages as they're added - nobody
 * needs to remember to write a new test for them. Run with `npm test`.
 */

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const AUDIO_DIR = path.join(__dirname, '..', 'public', 'audio');
const COORD_MIN = -30;
const COORD_MAX = 150;

function audioPathFor(template: CharacterTemplate): string {
  return path.join(AUDIO_DIR, template.language, `${template.id}.mp3`);
}

// Flat list of every character across every registered language.
const allCharacters: CharacterTemplate[] = Object.values(CHARACTERS_BY_LANGUAGE).flat();

describe('language registry', () => {
  it('LANGUAGE_ORDER and LANGUAGES agree on the set of languages', () => {
    expect(new Set(LANGUAGE_ORDER)).toEqual(new Set(Object.keys(LANGUAGES)));
  });

  it('every language in LANGUAGE_ORDER has character data registered', () => {
    for (const lang of LANGUAGE_ORDER) {
      expect(CHARACTERS_BY_LANGUAGE, `missing CHARACTERS_BY_LANGUAGE entry for "${lang}"`).toHaveProperty(lang);
    }
  });

  it('every language has at least one character', () => {
    for (const lang of LANGUAGE_ORDER) {
      const characters = CHARACTERS_BY_LANGUAGE[lang];
      expect(characters.length, `"${lang}" has no characters`).toBeGreaterThan(0);
    }
  });
});

describe('character ids', () => {
  it('every id is globally unique across all languages', () => {
    const seen = new Map<string, LanguageId>();
    const duplicates: string[] = [];
    for (const c of allCharacters) {
      const owner = seen.get(c.id);
      if (owner) {
        duplicates.push(`"${c.id}" used by both "${owner}" and "${c.language}"`);
      } else {
        seen.set(c.id, c.language);
      }
    }
    expect(duplicates, duplicates.join('\n')).toEqual([]);
  });

  it('every id is a non-empty string with no whitespace', () => {
    for (const c of allCharacters) {
      expect(c.id, `empty id in "${c.language}"`).toMatch(/^\S+$/);
    }
  });
});

describe.each(LANGUAGE_ORDER)('%s characters', (language) => {
  const characters = CHARACTERS_BY_LANGUAGE[language];

  it.each(characters.map((c) => [c.id, c] as const))('%s has valid core fields', (_id, c) => {
    expect(c.language, `${c.id}.language should be "${language}"`).toBe(language);
    expect(c.char.length, `${c.id}.char is empty`).toBeGreaterThan(0);
    expect(c.romanization.length, `${c.id}.romanization is empty`).toBeGreaterThan(0);
    if (c.difficulty !== undefined) {
      expect(c.difficulty, `${c.id}.difficulty out of 1-5 range`).toBeGreaterThanOrEqual(1);
      expect(c.difficulty, `${c.id}.difficulty out of 1-5 range`).toBeLessThanOrEqual(5);
    }
  });

  it.each(characters.map((c) => [c.id, c] as const))('%s has well-formed strokes', (_id, c) => {
    expect(c.strokes.length, `${c.id} has no strokes`).toBeGreaterThan(0);
    for (const [strokeIdx, stroke] of c.strokes.entries()) {
      expect(stroke.length, `${c.id} stroke #${strokeIdx} has fewer than 2 points`).toBeGreaterThanOrEqual(2);
      for (const [pointIdx, point] of stroke.entries()) {
        expect(Number.isFinite(point.x), `${c.id} stroke #${strokeIdx} point #${pointIdx} x is not finite`).toBe(
          true,
        );
        expect(Number.isFinite(point.y), `${c.id} stroke #${strokeIdx} point #${pointIdx} y is not finite`).toBe(
          true,
        );
        expect(
          point.x,
          `${c.id} stroke #${strokeIdx} point #${pointIdx} x=${point.x} looks like a data-entry typo`,
        ).toBeGreaterThanOrEqual(COORD_MIN);
        expect(
          point.x,
          `${c.id} stroke #${strokeIdx} point #${pointIdx} x=${point.x} looks like a data-entry typo`,
        ).toBeLessThanOrEqual(COORD_MAX);
        expect(
          point.y,
          `${c.id} stroke #${strokeIdx} point #${pointIdx} y=${point.y} looks like a data-entry typo`,
        ).toBeGreaterThanOrEqual(COORD_MIN);
        expect(
          point.y,
          `${c.id} stroke #${strokeIdx} point #${pointIdx} y=${point.y} looks like a data-entry typo`,
        ).toBeLessThanOrEqual(COORD_MAX);
      }
    }
  });

  it.each(characters.map((c) => [c.id, c] as const))('%s has a generated audio file', (_id, c) => {
    const audioPath = audioPathFor(c);
    expect(existsSync(audioPath), `missing audio file: ${audioPath} (run scripts/generate-audio.py)`).toBe(true);
    if (existsSync(audioPath)) {
      expect(statSync(audioPath).size, `${audioPath} exists but is empty`).toBeGreaterThan(0);
    }
  });
});

describe('audio directory has no orphaned files', () => {
  it('every .mp3 under public/audio corresponds to a real character', () => {
    const idsByLanguage = new Map<LanguageId, Set<string>>();
    for (const c of allCharacters) {
      if (!idsByLanguage.has(c.language)) idsByLanguage.set(c.language, new Set());
      idsByLanguage.get(c.language)!.add(c.id);
    }

    if (!existsSync(AUDIO_DIR)) return;
    const orphans: string[] = [];
    for (const langDir of readdirSync(AUDIO_DIR)) {
      const full = path.join(AUDIO_DIR, langDir);
      if (!statSync(full).isDirectory()) continue;
      const knownIds = idsByLanguage.get(langDir as LanguageId);
      for (const file of readdirSync(full)) {
        const id = file.replace(/\.mp3$/, '');
        if (!knownIds || !knownIds.has(id)) {
          orphans.push(`${langDir}/${file}`);
        }
      }
    }
    expect(orphans, `orphaned audio files (character was removed/renamed):\n${orphans.join('\n')}`).toEqual([]);
  });
});
