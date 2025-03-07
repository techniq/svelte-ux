import { redirect } from '@sveltejs/kit';
import { getThemeNames } from '@layerstack/tailwind';
import themeCss from '@layerstack/tailwind/themes/all.css?raw';

import { env } from '$env/dynamic/private';

export async function load({ url }) {
  // Redirect `svelte-ux.vercel.app` to `svelte-ux.techniq.dev`
  if (url.host === 'svelte-ux.vercel.app') {
    const newUrl = new URL(url);
    newUrl.host = 'svelte-ux.techniq.dev';
    redirect(302, newUrl.toString());
  }

  return {
    themes: getThemeNames(themeCss),
    // themes: { light: ['light'], dark: ['dark'] },
    pr_id: env.VERCEL_GIT_PULL_REQUEST_ID,
  };
}
