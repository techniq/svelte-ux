import source from '$lib/actions/cssVars.ts?raw';
import pageSource from './+page.svelte?raw';

export async function load() {
  return {
    meta: {
      source,
      pageSource,
      description:
        'Reactively set CSS variables using a single object.  Not as commonly needed after `<div style:--prop={value}>` support was added, but cssVars is more terse',
    },
  };
}
