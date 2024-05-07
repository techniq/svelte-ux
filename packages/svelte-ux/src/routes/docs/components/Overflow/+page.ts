import api from '$lib/components/Overflow.svelte?raw&sveld';
import source from '$lib/components/Overflow.svelte?raw';
import pageSource from './+page.svelte?raw';

export async function load() {
  return {
    meta: {
      api,
      source,
      pageSource,
      related: ['actions/layout', 'components/Tooltip'],
    },
  };
}
