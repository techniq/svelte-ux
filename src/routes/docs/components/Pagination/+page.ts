import source from '$lib/components/Pagination.svelte?raw';
import pageSource from './+page.md?raw';

export async function load() {
  return {
    meta: {
      description:
        'Controls to navigate through paginated results.  Works with `paginationStore()` or `Paginate` component',
      source,
      pageSource,
      hideUsage: true,
      features: ['Easily customize display of results and controls'],
      related: ['components/Paginate', 'stores/paginationStore'],
    },
  };
}
