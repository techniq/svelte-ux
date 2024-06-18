import api from '$lib/components/Timeline.svelte?raw&sveld';
import source from '$lib/components/Timeline.svelte?raw';
import pageSource from './+page.svelte?raw';

export async function load() {
  return {
    meta: {
      description: 'List of events with variable width (horizontal) or height (vertical)',
      api,
      source,
      pageSource,
      related: ['components/Steps'],
    },
  };
}
