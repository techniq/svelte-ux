import api from '$lib/components/ButtonGroup.svelte?raw&sveld';
import source from '$lib/components/ButtonGroup.svelte?raw';
import pageSource from './+page.svelte?raw';

export async function load() {
  return {
    meta: {
      api,
      source,
      pageSource,
      related: ['components/Button'],
    },
  };
}
