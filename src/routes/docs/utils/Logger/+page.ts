import source from '$lib/utils/logger.ts?raw';
import pageSource from './+page.md?raw';

export async function load() {
  return {
    meta: {
      source,
      pageSource,
      description:
        'Logging which can be granularly enabled/disabled via local storage and provides styled output',
    },
  };
}
