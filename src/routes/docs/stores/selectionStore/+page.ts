import source from '$lib/stores/selectionStore.ts?raw';
import pageSource from './+page.md?raw';

export async function load() {
  return {
    meta: {
      source,
      pageSource,
      related: ['components/MultiSelect', 'components/Selection'],
    },
  };
}
