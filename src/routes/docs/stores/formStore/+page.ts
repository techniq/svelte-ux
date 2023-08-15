import source from '$lib/stores/formStore.ts?raw';
import pageSource from './+page.md?raw';

export async function load() {
  return {
    meta: {
      source,
      pageSource,
      related: ['components/Form'],
    },
  };
}
