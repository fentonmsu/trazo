import { defineConfig, devices } from '@playwright/test';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Dedicated port + database for E2E runs, distinct from the normal dev
// servers (5173/4001), so `npm run test:e2e` never collides with (or
// pollutes the data of) an app instance you already have running.
const CLIENT_PORT = 5190;
const SERVER_PORT = 4091;
const TEST_DB_PATH = path.resolve(__dirname, 'server/e2e-test.db');

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false, // tests share one SQLite file; avoid cross-test interference
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: 'list',
  use: {
    baseURL: `http://localhost:${CLIENT_PORT}`,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  webServer: [
    {
      command: 'node --experimental-sqlite server/index.js',
      url: `http://localhost:${SERVER_PORT}/api/health`,
      reuseExistingServer: false,
      timeout: 30_000,
      env: { PORT: String(SERVER_PORT), DB_PATH: TEST_DB_PATH },
    },
    {
      command: `npx vite --port ${CLIENT_PORT} --strictPort`,
      url: `http://localhost:${CLIENT_PORT}`,
      reuseExistingServer: false,
      timeout: 30_000,
      env: { VITE_API_PROXY_TARGET: `http://localhost:${SERVER_PORT}` },
    },
  ],
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
