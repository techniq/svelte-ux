import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';
import { sveld } from './src/lib/plugins/vite';

export default defineConfig({
  plugins: [sveltekit(), sveld()],
  optimizeDeps: { exclude: ["fsevents"] },
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}'],
    coverage: {
      reporter: ['html'],
    },
  },
});
