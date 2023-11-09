import source from '$lib/stores/timerStore.ts?raw';
import pageSource from './+page.md?raw';

export async function load() {
  return {
    meta: {
      source,
      pageSource,
      description: 'Manage interval ticks, useful for timely updates and countdowns',
      related: ['components/Duration', 'components/ScrollingValue'],
    },
  };
}
