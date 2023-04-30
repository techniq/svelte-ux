import type { PageLoad } from './$types';

export const load = (async () => {
  return {
    meta: {
      // description: 'Recursively render <ul> and <li> children at each level',
    },
  };
}) satisfies PageLoad;
