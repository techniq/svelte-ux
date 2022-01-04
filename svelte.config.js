import staticAdapter from '@sveltejs/adapter-static';
import sveltePreprocess from 'svelte-preprocess';
import { mdsvex } from 'mdsvex';
import sveld from 'vite-plugin-sveld';

import mdsvexConfig from './mdsvex.config.js';
import { markdownToc } from './src/lib/plugins/svelte.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', ...mdsvexConfig.extensions],
  preprocess: [mdsvex(mdsvexConfig), sveltePreprocess(), markdownToc()],

  kit: {
    adapter: staticAdapter(),
    target: '#svelte',
    ssr: false, // TODO: Re-enable after identifing/fixing layout shift
    vite: {
      plugins: [sveld()],
      optimizeDeps: {
        include: ['d3-scale', 'd3-format', 'd3-time', 'd3-array'],
      },
    },
  },
};

export default config;
