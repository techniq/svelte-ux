import source from '$lib/stores/selectionStore.ts?raw';
import pageSource from './+page.md?raw';

export async function load() {
  return {
    meta: {
      source,
      pageSource,
      description:
        'Manage item selection state including toggling values, selecting all, and clear or reset selection',
      related: ['components/MultiSelect', 'components/Selection'],
    },
  };
}
