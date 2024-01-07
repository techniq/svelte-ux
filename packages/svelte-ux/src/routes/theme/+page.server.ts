import * as daisy from '$lib/styles/daisy';
import * as skeleton from '$lib/styles/skeleton';

export async function load() {
  return {
    themes: {
      daisy: daisy.themes,
      skeleton: skeleton.themes,
    },
  };
}
