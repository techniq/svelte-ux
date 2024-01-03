import source from '$lib/utils/format.ts?raw';
import pageSource from './+page.svelte?raw';

export async function load() {
  return {
    meta: {
      source,
      pageSource,
      description: 'Easily format numbers and dates to a variety of formats and locales',
      features: [
        'Number: Pass `style` for quick formatting',
        'Date: Pass `periodType` along with `variant` for quick formatting',
        'Date: Pass `custom` for greater control',
      ],
    },
  };
}
