import { defineConfig, devices } from '@playwright/test';

// Dedicated port for E2E runs, distinct from the normal dev servers
// (5173/4001), so `npm run test:e2e` never collides with an app instance
// you already have running. The backend now talks to the real Supabase
// project (via .env), so E2E specs use randomized usernames per run to
// avoid colliding with each other or with real account data.
const CLIENT_PORT = 5190;
const SERVER_PORT = 4091;

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
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
      command: 'node --env-file=.env server/index.js',
      url: `http://localhost:${SERVER_PORT}/api/health`,
      reuseExistingServer: false,
      timeout: 30_000,
      env: { PORT: String(SERVER_PORT) },
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
