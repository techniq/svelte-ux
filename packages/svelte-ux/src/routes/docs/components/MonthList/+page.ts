import api from '$lib/components/MonthList.svelte?raw&sveld';
import source from '$lib/components/MonthList.svelte?raw';
import pageSource from './+page.svelte?raw';

export async function load() {
  return {
    meta: {
      api,
      source,
      pageSource,
    },
  };
}
