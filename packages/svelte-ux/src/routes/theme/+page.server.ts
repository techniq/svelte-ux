import * as daisy from '$lib/styles/daisy';
import * as skeleton from '$lib/styles/skeleton';

export async function load({ url }) {
  return {
    daisy: {
      themes: daisy.themes,
      lightThemes: daisy.lightThemes,
      darkThemes: daisy.darkThemes,
    },
    skeleton: {
      themes: skeleton.themes,
      lightThemes: skeleton.lightThemes,
      darkThemes: skeleton.darkThemes,
    },
  };
}
