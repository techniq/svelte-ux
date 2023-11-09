import slug from 'rehype-slug';

export default {
  extensions: ['.md', '.svx'],
  layout: './src/docs/Layout.svelte',
  rehypePlugins: [slug],
  // highlight: false
};
