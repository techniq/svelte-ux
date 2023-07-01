import api from '$lib/components/Avatar.svelte?raw&sveld';
import source from '$lib/components/Avatar.svelte?raw';
import pageSource from './+page.svelte?raw';

export async function load() {
  return {
    meta: {
      api,
      source,
      pageSource,
    },
  };
}
