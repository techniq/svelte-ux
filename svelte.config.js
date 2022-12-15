import vercelAdapter from '@sveltejs/adapter-vercel';
import sveltePreprocess from 'svelte-preprocess';
import { mdsvex } from 'mdsvex';

import mdsvexConfig from './mdsvex.config.js';
import { markdownToc } from './src/lib/plugins/svelte.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', ...mdsvexConfig.extensions],
  preprocess: [mdsvex(mdsvexConfig), sveltePreprocess(), markdownToc()],

  vitePlugin: {
    experimental: {
      inspector: {
        toggleKeyCombo: 'alt-shift',
        toggleButtonPos: 'bottom-right',
      },
    },
  },

  kit: {
    adapter: vercelAdapter(),
  },
};

export default config;
