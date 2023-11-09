import api from '$lib/components/Shine.svelte?raw&sveld';
import source from '$lib/components/Shine.svelte?raw';
import pageSource from './+page.svelte?raw';

export async function load() {
  return {
    meta: {
      api,
      source,
      pageSource,
      related: ['actions/spotlight', 'components/Tilt'],
    },
  };
}
