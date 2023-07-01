import api from '$lib/components/Button.svelte?raw&sveld';
import source from '$lib/components/Button.svelte?raw';
import pageSource from './+page.svelte?raw';

export async function load() {
  return {
    meta: {
      api,
      source,
      pageSource,
      related: ['components/ButtonGroup', 'components/Icon'],
    },
  };
}
