import * as daisy from '$lib/styles/daisy.js';
import * as skeleton from '$lib/styles/skeleton.js';

export async function load() {
  return {
    themes: {
      daisy: daisy.themes,
      skeleton: skeleton.themes,
    },
  };
}
