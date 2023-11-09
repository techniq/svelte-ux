import api from '$lib/components/TreeList.svelte?raw&sveld';
import source from '$lib/components/TreeList.svelte?raw';
import pageSource from './+page.svelte?raw';

export async function load() {
  return {
    meta: {
      api,
      source,
      pageSource,
      description: 'Recursively render <ul> and <li> children at each level',
      related: ['components/TableOfContents'],
    },
  };
}
