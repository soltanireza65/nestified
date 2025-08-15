import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    restoreMocks: true,
    mockReset: true,
    clearMocks: true,
    include: ['src/**/*.e2e-spec.ts'],
    typecheck: {
      tsconfig: 'tsconfig.spec.json',
    },
  },
});
