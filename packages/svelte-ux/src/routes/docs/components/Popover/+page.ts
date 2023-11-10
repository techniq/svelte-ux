import api from '$lib/components/Popover.svelte?raw&sveld';
import source from '$lib/components/Popover.svelte?raw';
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
