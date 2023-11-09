import api from '$lib/components/TweenedValue.svelte?raw&sveld';
import source from '$lib/components/TweenedValue.svelte?raw';
import pageSource from './+page.svelte?raw';

export async function load() {
  return {
    meta: {
      api,
      source,
      pageSource,
      related: ['components/SpringValue', 'components/ScrollingValue'],
    },
  };
}
