import type { PageLoad } from './$types';

export const load = (async () => {
  return {
    meta: {
      description: 'Reactively set CSS variables using a single object',
    },
  };
}) satisfies PageLoad;
