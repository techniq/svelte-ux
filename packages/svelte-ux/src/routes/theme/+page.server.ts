import { daisy, skeleton } from '@layerstack/tailwind';

export async function load() {
  return {
    themes: {
      daisy: daisy.themes,
      skeleton: skeleton.themes,
    },
  };
}
