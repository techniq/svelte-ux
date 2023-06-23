import source from '$lib/actions/observer.ts?raw';
import pageSource from './+page.svelte?raw';

export async function load() {
  return {
    meta: {
      source,
      pageSource,
      related: ['components/InfiniteScroll', 'components/Lazy'],
    },
  };
}
