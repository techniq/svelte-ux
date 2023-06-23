import source from '$lib/stores/queryParamsStore.ts?raw';
import pageSource from './+page.md?raw';

export async function load() {
  return {
    meta: {
      source,
      pageSource,
      title: 'Query params',
      hideUsage: true,
    },
  };
}
