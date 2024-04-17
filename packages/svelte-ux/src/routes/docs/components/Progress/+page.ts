import api from '$lib/components/Progress.svelte?raw&sveld';
import source from '$lib/components/Progress.svelte?raw';
import pageSource from './+page.svelte?raw';

export async function load() {
  return {
    meta: {
      api,
      source,
      pageSource,
      related: ['components/BarStack', 'components/ProgressCircle'],
    },
  };
}
