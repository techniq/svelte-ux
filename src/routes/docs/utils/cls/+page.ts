import source from '$lib/utils/styles.ts?raw';
import pageSource from './+page.md?raw';

export async function load() {
  return {
    meta: {
      source,
      pageSource,
      description:
        'Wrapper around `tailwind-merge` and `clsx` for easy style overriding.  Used internally by all components',
      related: ['https://github.com/dcastil/tailwind-merge', 'https://github.com/lukeed/clsx'],
    },
  };
}
