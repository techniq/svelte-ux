import api from '$lib/components/NavItem.svelte?raw&sveld';
import source from '$lib/components/NavItem.svelte?raw';
import pageSource from './+page.svelte?raw';

export async function load() {
  return {
    meta: {
      source,
      pageSource,
    },
  };
}
