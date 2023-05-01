import slug from 'rehype-slug';

import { codePreview } from './src/lib/plugins/remark.js';

export default {
  extensions: ['.md', '.svx'],
  layout: './src/docs/Layout.svelte',
  // remarkPlugins: [codePreview],
  rehypePlugins: [slug],
  // highlight: false
};
