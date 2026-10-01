import type { Page } from '@playwright/test';

export function uniqueUsername(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
}

/** Registers a brand-new account (unique per call) and leaves the app logged in. */
export async function registerAndLogin(page: Page, prefix = 'e2e'): Promise<string> {
  const username = uniqueUsername(prefix);
  await page.goto('/');
  await page.click('.auth-tabs button:has-text("Crear cuenta")');
  await page.fill('input[autocomplete="username"]', username);
  await page.fill('input[type="password"]', 'clave1234');
  await page.click('button.primary:has-text("Crear cuenta")');
  await page.waitForSelector('.user-status-bar');
  return username;
}

export function collectConsoleErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
  page.on('console', (msg) => {
    // A 401 on /api/auth/me before login is expected, not a bug.
    if (msg.type() === 'error' && !msg.text().includes('401')) {
      errors.push(`console.error: ${msg.text()}`);
    }
  });
  return errors;
}
