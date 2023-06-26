import source from '$lib/stores/paginationStore.ts?raw';
import pageSource from './+page.md?raw';

export async function load() {
  return {
    meta: {
      source,
      pageSource,
      related: ['components/Paginate', 'components/Pagination'],
    },
  };
}
