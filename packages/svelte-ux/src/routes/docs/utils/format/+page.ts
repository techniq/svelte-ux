import source from '$lib/utils/format.ts?raw';
import pageSource from './+page.md?raw';

export async function load() {
  return {
    meta: {
      source,
      pageSource,
      description: 'Easily format numbers and dates to a variety of formats',
    },
  };
}
