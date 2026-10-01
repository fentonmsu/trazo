import { test, expect } from '@playwright/test';
import { registerAndLogin, uniqueUsername, collectConsoleErrors } from './utils';

test('register, logout, and log back in keeps the same account/progress', async ({ page }) => {
  const errors = collectConsoleErrors(page);
  const username = await registerAndLogin(page, 'auth');

  await expect(page.locator('.status-username')).toHaveText(username);

  await page.click('button:has-text("Salir")');
  await expect(page.locator('.auth-screen')).toBeVisible();

  await page.click('.auth-tabs button:has-text("Iniciar sesión")');
  await page.fill('input[autocomplete="username"]', username);
  await page.fill('input[type="password"]', 'clave1234');
  await page.click('button.primary:has-text("Entrar")');

  await expect(page.locator('.status-username')).toHaveText(username);
  expect(errors, errors.join('\n')).toEqual([]);
});

test('registering with a taken username shows an error, not a crash', async ({ page }) => {
  const username = await registerAndLogin(page, 'dupe');
  await page.click('button:has-text("Salir")');

  await page.click('.auth-tabs button:has-text("Crear cuenta")');
  await page.fill('input[autocomplete="username"]', username);
  await page.fill('input[type="password"]', 'clave1234');
  await page.click('button.primary:has-text("Crear cuenta")');

  await expect(page.locator('.auth-error')).toBeVisible();
  await expect(page.locator('.auth-screen')).toBeVisible();
});

test('wrong password is rejected', async ({ page }) => {
  await page.goto('/');
  await page.click('.auth-tabs button:has-text("Iniciar sesión")');
  await page.fill('input[autocomplete="username"]', uniqueUsername('nouser'));
  await page.fill('input[type="password"]', 'wrongpass');
  await page.click('button.primary:has-text("Entrar")');
  await expect(page.locator('.auth-error')).toBeVisible();
});
