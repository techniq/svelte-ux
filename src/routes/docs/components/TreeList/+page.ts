import source from '$lib/components/TreeList.svelte?raw';
import pageSource from './+page.svelte?raw';

export async function load() {
  return {
    meta: {
      source,
      pageSource,
      description: 'Recursively render <ul> and <li> children at each level',
      related: ['components/TableOfContents'],
    },
  };
}
