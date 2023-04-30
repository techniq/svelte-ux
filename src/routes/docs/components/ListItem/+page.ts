import type { PageLoad } from './$types';

export const load = (async () => {
  return {
    meta: {
      description:
        'A list item that provides a standard layout and works best with multiple instances in the same parent element.',
    },
  };
}) satisfies PageLoad;
