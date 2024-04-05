import api from '$lib/components/RangeSlider.svelte?raw&sveld';
import source from '$lib/components/RangeSlider.svelte?raw';
import pageSource from './+page.svelte?raw';

export async function load() {
  return {
    meta: {
      api,
      source,
      pageSource,
      related: ['components/RangeField'],
      status: 'beta',
      features: [
        'Drag start and end points individually, or drag the middle together',
        'Double click start, end or range to set min/max',
        'Use keyboard arrow keys to adjust last changed',
      ],
    },
  };
}
