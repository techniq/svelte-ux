import source from '$lib/components/Paginate.svelte?raw';
import pageSource from './+page.md?raw';

export async function load() {
  return {
    meta: {
      source,
      pageSource,
      hideUsage: true,
    },
  };
}
