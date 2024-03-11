import api from '$lib/components/ThemeInit.svelte?raw&sveld';
import source from '$lib/components/ThemeInit.svelte?raw';
import pageSource from './+page.svelte?raw';

export async function load() {
  return {
    meta: {
      api,
      source,
      pageSource,
      description:
        'Initialize theme from localStorage before anything renders, including when SSR is used.\nUsing <Settings> component instead of `settings()` will setup <ThemeInit> internally',
      related: [
        'components/Settings',
        'components/ThemeSelect',
        'components/ThemeSwitch',
        '/customization',
      ],
    },
  };
}
