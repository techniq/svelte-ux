import api from '$lib/components/Paginate.svelte?raw&sveld';
import source from '$lib/components/Paginate.svelte?raw';
import pageSource from './+page.md?raw';

export async function load() {
  return {
    meta: {
      description: 'Client-side paginate through items',
      api,
      source,
      pageSource,
      hideUsage: true,
      related: ['components/Pagination', 'stores/paginationStore'],
    },
  };
}
