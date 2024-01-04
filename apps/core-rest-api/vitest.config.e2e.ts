import swc from 'unplugin-swc';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    swc.vite({
      module: { type: 'es6' },
    }),
    tsconfigPaths(),
  ],
  test: {
    globals: true,
    include: ['**/*.e2e-spec.ts'],
    root: './apps/core-rest-api/',
    setupFiles: ['./tests/setup-e2e.ts'],
    environment: 'node',
    reporters: ['default'],
  },
});
