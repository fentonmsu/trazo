import { test, expect } from '@playwright/test';
import { registerAndLogin, collectConsoleErrors } from './utils';

async function answerCurrentExercise(page: import('@playwright/test').Page) {
  const checkBtn = page.locator('button:has-text("Comprobar")');
  if (await checkBtn.isVisible().catch(() => false)) {
    const canvas = page.locator('canvas.drawing-canvas');
    const box = await canvas.boundingBox();
    if (box) {
      await page.mouse.move(box.x + 10, box.y + 10);
      await page.mouse.down();
      await page.mouse.move(box.x + 60, box.y + 60, { steps: 3 });
      await page.mouse.up();
    }
    await checkBtn.click();
    return;
  }
  const option = page.locator('.exercise-option:not([disabled])').first();
  if (await option.isVisible().catch(() => false)) {
    await option.click();
  }
  // Matching exercises resolve themselves via pair clicks, which this
  // generic helper doesn't attempt - tests that reach one skip ahead.
}

test.beforeEach(async ({ page }) => {
  await registerAndLogin(page, 'lesson');
  await page.click('button:has-text("Lección")');
});

test('lesson map shows locked/unlocked nodes and starts lesson 1', async ({ page }) => {
  const nodes = page.locator('.lesson-node');
  await expect(nodes.first()).not.toHaveClass(/locked/);
  if ((await nodes.count()) > 1) {
    await expect(nodes.nth(1)).toHaveClass(/locked/);
  }

  await nodes.first().click();
  await expect(page.locator('.lesson-runner')).toBeVisible();
  await expect(page.locator('.lesson-hearts')).toHaveText('❤️❤️❤️❤️❤️');
});

test('Siguiente is disabled until answered, Atrás opens a read-only review', async ({ page }) => {
  const errors = collectConsoleErrors(page);
  await page.locator('.lesson-node').first().click();

  const nextBtn = page.locator('.lesson-nav-button.primary');
  const backBtn = page.locator('.lesson-nav-button:not(.primary)');

  await expect(nextBtn).toBeDisabled();
  await expect(backBtn).toBeDisabled();

  await answerCurrentExercise(page);
  await expect(nextBtn).toBeEnabled();

  await nextBtn.click();
  await expect(backBtn).toBeEnabled();

  await backBtn.click();
  await expect(page.locator('.review-card')).toBeVisible();
  await expect(page.locator('.review-status')).toHaveText(/Correcto|Incorrecto/);

  // Returning from review goes back to the live (second) exercise, not back to the first.
  await nextBtn.click();
  await expect(page.locator('.review-card')).toHaveCount(0);
  await expect(page.locator('.exercise')).toBeVisible();

  expect(errors, errors.join('\n')).toEqual([]);
});

test('exiting a lesson returns to the lesson map without crashing', async ({ page }) => {
  await page.locator('.lesson-node').first().click();
  await expect(page.locator('.lesson-runner')).toBeVisible();
  await page.click('.lesson-exit');
  await expect(page.locator('.lesson-nodes')).toBeVisible();
});
