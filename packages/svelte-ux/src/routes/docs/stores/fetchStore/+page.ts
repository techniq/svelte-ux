import source from '$lib/stores/fetchStore.ts?raw';
import pageSource from './+page.md?raw';

export async function load() {
  return {
    meta: {
      source,
      pageSource,
      description:
        'Fetch request as a store, with support for body parsing (json, text, arrayBuffer, etc), out of order responses, context configuration, and global errors',
      related: ['stores/graphStore'],
    },
  };
}
