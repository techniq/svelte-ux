import pageSource from './+page.svelte?raw';

export async function load() {
  return {
    meta: {
      pageSource,
      title: 'Grid',
      description: 'Uses tailwind classes',
      hideUsage: true,
    },
  };
}
