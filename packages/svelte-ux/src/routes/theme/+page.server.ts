import { themes as daisyThemes } from '@layerstack/tailwind/daisy';
import { themes as skeletonThemes } from '@layerstack/tailwind/skeleton';

export async function load() {
  return {
    themes: {
      daisy: daisyThemes,
      skeleton: skeletonThemes,
    },
  };
}
