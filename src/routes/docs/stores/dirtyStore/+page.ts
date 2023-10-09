import source from '$lib/stores/dirtyStore.ts?raw';
import pageSource from './+page.md?raw';

export async function load() {
  return {
    meta: {
      source,
      pageSource,
      description:
        'Track when a store becomes dirty (changed), with ability to reset.  Useful to enable an apply button, etc',
      related: ['components/MultiSelect'],
    },
  };
}
