import { defineConfig } from 'vitest/config';

// Scoped to tests/ only - e2e/ holds Playwright Test specs (different test
// runner, different `test`/`expect` API) and must never be picked up here.
export default defineConfig({
  test: {
    include: ['tests/**/*.test.ts'],
  },
});
