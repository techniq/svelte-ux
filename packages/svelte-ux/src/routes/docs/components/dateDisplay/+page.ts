import source from '$lib/utils/dateDisplay.ts?raw';
import pageSource from './+page.svelte?raw';

export async function load() {
  return {
    meta: {
      source,
      pageSource,
      features: [
        'Pass `periodType` along with `variant` for quick formatting',
        'Pass `format` for <a href="https://date-fns.org/v2.30.0/docs/format" class="underline underline-offset-2 decoration-surface-content/30">greater control</a>',
        'By default, will be formatted using `date.toLocaleString()`',
      ],
    },
  };
}
