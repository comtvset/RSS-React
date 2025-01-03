import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.ts',
    coverage: {
      exclude: [
        'src/components/ErrorBoundary/ErrorBoundary.tsx',
        'src/components/Routes/root.tsx',
        'src/main.tsx',
        'src/__tests__/**',
        '**/node_modules/**',
        '**/dist/**',
        '**/e2e/**',
        'tasks/src/__tests__/**',
        '.eslintrc.cjs',
        'vite.config.ts',
      ],
    },
  },
});
