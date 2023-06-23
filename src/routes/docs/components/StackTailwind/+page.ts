import pageSource from './+page.svelte?raw';

export async function load() {
  return {
    meta: {
      pageSource,
      title: 'Stack (via tailwind classes)',
      hideUsage: true,
    },
  };
}
