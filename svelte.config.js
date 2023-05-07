import vercelAdapter from '@sveltejs/adapter-vercel';
import sveltePreprocess from 'svelte-preprocess';
import { mdsvex } from 'mdsvex';

import mdsvexConfig from './mdsvex.config.js';
import { codePreview } from './src/lib/plugins/svelte.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', ...mdsvexConfig.extensions],
  preprocess: [mdsvex(mdsvexConfig), sveltePreprocess(), codePreview()],

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
    alias: {
      $docs: 'src/docs',
    },
  },
};

export default config;
