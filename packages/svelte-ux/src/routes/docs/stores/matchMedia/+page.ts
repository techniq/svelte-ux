import source from '$lib/stores/matchMedia.ts?raw';
import pageSource from './+page.md?raw';

export async function load() {
  return {
    meta: {
      source,
      pageSource,
      description:
        'Store to monitor media query matching, including screen width/height, orientation, print media, prefers dark/light scheme, and prefers reduced motion',
    },
  };
}
