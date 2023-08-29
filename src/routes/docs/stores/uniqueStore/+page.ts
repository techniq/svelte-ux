import source from '$lib/stores/uniqueStore.ts?raw';
import pageSource from './+page.md?raw';

export async function load() {
  return {
    meta: {
      source,
      pageSource,
      description:
        'Store to manage unique values using `Set` with improves ergonomics and better control of updates',
      related: ['stores/selectionStore', 'stores/mapStore', 'components/MultiSelect'],
    },
  };
}
