import { test, expect } from '@playwright/test';
import { registerAndLogin, collectConsoleErrors } from './utils';

async function drawScribble(page: import('@playwright/test').Page) {
  const canvas = page.locator('canvas.drawing-canvas');
  const box = await canvas.boundingBox();
  if (!box) throw new Error('canvas not found');
  await page.mouse.move(box.x + box.width * 0.2, box.y + box.height * 0.2);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width * 0.5, box.y + box.height * 0.15, { steps: 5 });
  await page.mouse.move(box.x + box.width * 0.8, box.y + box.height * 0.25, { steps: 5 });
  await page.mouse.up();
}

test.beforeEach(async ({ page }) => {
  await registerAndLogin(page, 'pr');
});

test('practice mode scores a drawing and updates the tile', async ({ page }) => {
  const errors = collectConsoleErrors(page);
  await page.click('button:has-text("Practicar")');
  await page.locator('.character-tile-main').first().click();

  await drawScribble(page);
  await page.click('button:has-text("Comprobar")');

  await expect(page.locator('.result .score')).toBeVisible();
  const scoreText = await page.locator('.result .score').textContent();
  expect(scoreText).toMatch(/^\d+%$/);

  // The grid tile should now show a best-score badge for this character.
  await expect(page.locator('.character-tile.selected .best-score')).toBeVisible();
  expect(errors, errors.join('\n')).toEqual([]);
});

test('recognize mode returns ranked candidates', async ({ page }) => {
  const errors = collectConsoleErrors(page);
  await page.click('button:has-text("Reconocer")');
  await drawScribble(page);
  await page.click('button:has-text("¿Qué dibujé?")');

  const matchRows = page.locator('.match-row');
  await expect(matchRows.first()).toBeVisible();
  const count = await matchRows.count();
  expect(count).toBeGreaterThan(0);
  expect(count).toBeLessThanOrEqual(5);

  // Confidences should be sorted descending.
  const pctTexts = await page.locator('.match-pct').allTextContents();
  const pcts = pctTexts.map((t) => parseInt(t, 10));
  const sorted = [...pcts].sort((a, b) => b - a);
  expect(pcts).toEqual(sorted);

  expect(errors, errors.join('\n')).toEqual([]);
});

test('undo and clear controls work on the drawing canvas', async ({ page }) => {
  await page.click('button:has-text("Practicar")');
  await drawScribble(page);
  await drawScribble(page);
  await page.click('button:has-text("Deshacer trazo")');
  await page.click('button:has-text("Borrar")');
  await page.click('button:has-text("Comprobar")');
  // An empty drawing should score 0 with a "didn't draw anything" message, not crash.
  await expect(page.locator('.result .score')).toHaveText('0%');
});
