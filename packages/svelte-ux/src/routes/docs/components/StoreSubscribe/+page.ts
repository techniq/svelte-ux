import api from '$lib/components/StoreSubscribe.svelte?raw&sveld';
import source from '$lib/components/StoreSubscribe.svelte?raw';
import pageSource from './+page.svelte?raw';

export async function load() {
  return {
    meta: {
      api,
      source,
      pageSource,
      description:
        'Wrapper component to convenient subscribe to a store value when impractical (for example, slot `let:value`)',
    },
  };
}
