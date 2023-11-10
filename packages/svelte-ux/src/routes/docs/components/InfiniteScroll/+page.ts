import api from '$lib/components/InfiniteScroll.svelte?raw&sveld';
import source from '$lib/components/InfiniteScroll.svelte?raw';
import pageSource from './+page.svelte?raw';

export async function load() {
  return {
    meta: {
      api,
      source,
      pageSource,
      description:
        'Continues to render additional items as bottom is reached. Does not perform virtualized scrolling.',
      related: ['actions/observer'],
    },
  };
}
