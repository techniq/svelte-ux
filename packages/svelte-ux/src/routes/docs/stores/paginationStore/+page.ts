import source from '$lib/stores/paginationStore.ts?raw';
import pageSource from './+page.md?raw';

export async function load() {
  return {
    meta: {
      source,
      pageSource,
      description:
        'Manage pagination state including current page and page navigation (next/previous/first/last).  See related Paginate/Pagination components',
      related: ['components/Paginate', 'components/Pagination'],
    },
  };
}
