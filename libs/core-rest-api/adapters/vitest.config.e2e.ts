import swc from 'unplugin-swc';
import { defineConfig } from 'vite';

import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

export default defineConfig({
  plugins: [
    nxViteTsPaths(),
    swc.vite({
      module: { type: 'es6' },
    }),
  ],
  test: {
    globals: true,
    include: ['**/*.e2e-spec.ts'],
    root: './libs/core-rest-api/adapters/',
    setupFiles: ['./tests/setup-e2e.ts'],
    environment: 'node',
  },
});
