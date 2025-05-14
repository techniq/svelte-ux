import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { sveld } from './src/lib/plugins/vite.js';

export default defineConfig({
  plugins: [tailwindcss(), sveltekit() /*, sveld()*/],
  resolve: {
    noExternal: true, // https://github.com/AdrianGonz97/refined-cf-pages-action/issues/26#issuecomment-2878397440
  },
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
