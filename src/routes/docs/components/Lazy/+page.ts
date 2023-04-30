import type { PageLoad } from './$types';

export const load = (async () => {
  return {
    meta: {
      description:
        'Waits to render a component until visible. Requires placeholder size (min-height)',
    },
  };
}) satisfies PageLoad;
