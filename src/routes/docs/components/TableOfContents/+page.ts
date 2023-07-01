import api from '$lib/components/TableOfContents.svelte?raw&sveld';
import source from '$lib/components/TableOfContents.svelte?raw';
import pageSource from './+page.svelte?raw';

export async function load() {
  return {
    meta: {
      api,
      source,
      pageSource,
      related: ['components/TreeList'],
    },
  };
}
