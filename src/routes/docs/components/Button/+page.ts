import source from '$lib/components/Button.svelte?raw';
import pageSource from './+page.svelte?raw';

export async function load() {
  return {
    meta: {
      source,
      pageSource,
      related: ['components/ButtonGroup', 'components/Icon'],
    },
  };
}
