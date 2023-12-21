import { redirect } from '@sveltejs/kit';

import { env } from '$env/dynamic/private';

export async function load({ url }) {
  // Redirect `svelte-ux.vercel.app` to `svelte-ux.techniq.dev`
  if (url.host === 'svelte-ux.vercel.app') {
    const newUrl = new URL(url);
    newUrl.host = 'svelte-ux.techniq.dev';
    throw redirect(302, newUrl.toString());
  }

  return { pr_id: env.NEXT_VERCEL_GIT_PULL_REQUEST_ID };
}
