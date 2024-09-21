import api from '$lib/components/Toast.svelte?raw&sveld';
import source from '$lib/components/Toast.svelte?raw';
import pageSource from './+page.svelte?raw';

export async function load() {
  return {
    meta: {
      api,
      source,
      pageSource,
      description:
        'Adds the ability to include Toast popup notifications that go away after a couple of seconds.',
      related: ['components/Notification', '/customization'],
    },
  };
}
