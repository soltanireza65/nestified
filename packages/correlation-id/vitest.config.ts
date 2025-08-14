import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    passWithNoTests: true,
    clearMocks: true,
    setupFiles: ['./test/setup.ts'],
    include: ['test/**/*.{test,spec}.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
});
