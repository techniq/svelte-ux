import api from '$lib/components/Notification.svelte?raw&sveld';
import source from '$lib/components/Notification.svelte?raw';
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
