import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';
import { sveld } from './src/lib/plugins/vite.js';

export default defineConfig({
  plugins: [sveltekit(), sveld()],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}'],
    deps: {
      optimizer: {
        ssr: {
          exclude: ['sveld'],
        },
      },
    },
    coverage: {
      reporter: ['html'],
    },
  },
});
