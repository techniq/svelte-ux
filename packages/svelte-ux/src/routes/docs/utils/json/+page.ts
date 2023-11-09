import source from '$lib/utils/json.ts?raw';
import pageSource from './+page.md?raw';

export async function load() {
  return {
    meta: {
      source,
      pageSource,
      description:
        'JSON.parse() and JSON.stringify() replacement with support for `Date`, `Map`, and `Set` types',
    },
  };
}
