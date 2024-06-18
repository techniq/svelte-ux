import api from '$lib/components/Steps.svelte?raw&sveld';
import source from '$lib/components/Steps.svelte?raw';
import pageSource from './+page.svelte?raw';

export async function load() {
  return {
    meta: {
      description:
        'List of steps in a process with consistent width (horizontal) or height (vertical)',
      api,
      source,
      pageSource,
      related: ['components/Timeline'],
    },
  };
}
