import { test, expect } from '@playwright/test';
import { LANGUAGE_ORDER, LANGUAGES } from '../src/data/languages';
import { getCharactersForLanguage } from '../src/data';
import { registerAndLogin, collectConsoleErrors } from './utils';

/**
 * Data-driven over LANGUAGE_ORDER, not a hardcoded list - this file needs
 * no edits when a new language or character is added; it picks them up
 * automatically from src/data the next time it runs.
 */
test.describe('every language renders all of its characters', () => {
  test.beforeEach(async ({ page }) => {
    await registerAndLogin(page, 'langs');
    await page.click('button:has-text("Practicar")');
  });

  for (const language of LANGUAGE_ORDER) {
    const expected = getCharactersForLanguage(language);
    const info = LANGUAGES[language];

    test(`${info.name}: all ${expected.length} characters render a non-empty glyph`, async ({ page }) => {
      const errors = collectConsoleErrors(page);

      await page.click(`button:has-text("${info.name}")`);
      await expect(page.locator('.character-tile')).toHaveCount(expected.length);

      const glyphTexts = await page.locator('.character-tile .glyph').allTextContents();
      expect(glyphTexts, `${language}: expected one .glyph per tile`).toHaveLength(expected.length);

      const blanks: number[] = [];
      glyphTexts.forEach((text, i) => {
        if (text.trim().length === 0) blanks.push(i);
      });
      expect(blanks, `${language}: tiles with no visible glyph at indices ${blanks.join(', ')}`).toEqual([]);

      // Every character's glyph is actually *somewhere* on screen, order-independent -
      // catches a wrong/duplicated/missing glyph that a count check alone would miss.
      //
      // Matched as prefix+suffix, not exact equality: HebrewGlyph (see
      // src/components/HebrewGlyph.tsx) splits a trailing niqqud mark into its
      // own span and inserts a dotted-circle carrier (U+25CC) in front of it so
      // the mark reliably renders even on narrow sofit letters - real,
      // intentional DOM text, not a bug - so the rendered text is
      // `base + ◌ + mark`, not the literal `char` string. For every other
      // script `char.slice(0, -1)` + `char.slice(-1)` trivially recombine to
      // `char` itself, so this check still means exact equality there.
      const renderedChars = glyphTexts.map((t) => t.trim());
      const missing = expected.filter((c) => {
        const base = c.char.slice(0, -1);
        const lastChar = c.char.slice(-1);
        return !renderedChars.some((rendered) => rendered.startsWith(base) && rendered.endsWith(lastChar));
      });
      expect(missing.map((c) => c.id), 'characters whose glyph never appeared in the grid').toEqual([]);

      expect(errors, errors.join('\n')).toEqual([]);
    });
  }

  for (const language of LANGUAGE_ORDER) {
    const expected = getCharactersForLanguage(language);
    const info = LANGUAGES[language];
    const sampleIndexes = [...new Set([0, Math.floor(expected.length / 2), expected.length - 1])];

    test(`${info.name}: sampled tiles open a working practice view`, async ({ page }) => {
      const errors = collectConsoleErrors(page);
      await page.click(`button:has-text("${info.name}")`);

      for (const i of sampleIndexes) {
        const expectedChar = expected[i];
        await page.locator('.character-tile-main').nth(i).click();
        await expect(page.locator('.target-glyph')).not.toHaveText('');
        await expect(page.locator('.romanization-row')).toContainText(expectedChar.romanization);
        // The stroke guide canvas rendered (not just an empty 320x320 blank element missing entirely).
        await expect(page.locator('canvas.drawing-canvas')).toBeVisible();
      }

      expect(errors, errors.join('\n')).toEqual([]);
    });
  }
});
