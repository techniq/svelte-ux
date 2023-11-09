import pageSource from './+page.svelte?raw';

export async function load() {
  return {
    meta: {
      pageSource,
      title: 'Stack',
      description: 'Uses tailwind classes',
      hideUsage: true,
    },
  };
}
