import api from '$lib/components/Switch.svelte?raw&sveld';
import source from '$lib/components/Switch.svelte?raw';
import pageSource from './+page.svelte?raw';

export async function load() {
  return {
    meta: {
      api,
      source,
      pageSource,
      related: ['components/ToggleGroup'],
    },
  };
}
