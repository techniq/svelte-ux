import cloudflareAdapter from '@sveltejs/adapter-cloudflare';
import sveltePreprocess from 'svelte-preprocess';
import { mdsvex } from 'mdsvex';

import mdsvexConfig from './mdsvex.config.js';
import { codePreview } from './src/lib/plugins/svelte.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', ...mdsvexConfig.extensions],
  preprocess: [mdsvex(mdsvexConfig), sveltePreprocess(), codePreview()],

  vitePlugin: {
    inspector: {
      toggleKeyCombo: 'alt-shift',
      toggleButtonPos: 'bottom-right',
    },
  },

  kit: {
    adapter: cloudflareAdapter(),
    alias: {
      $docs: 'src/docs',
    },
  },
};

export default config;
