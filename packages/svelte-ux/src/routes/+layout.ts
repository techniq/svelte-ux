import posthog from 'posthog-js';

import { browser, dev } from '$app/environment';

// Disable server-side rendering until AppLayout shift is fixed (issue #22)
export const ssr = false;

export const load = async ({ data }) => {
  // Setup Posthog
  if (browser && !dev) {
    // @ts-expect-error: `posthog.init()` is valid - https://posthog.com/docs/product-analytics/installation
    posthog.init('phc_F78mUWQpKPpsXS1mamJFzDWM8bivZrwIx4Nm1cI8BSb', {
      api_host: 'https://app.posthog.com',
      capture_pageview: false,
      capture_pageleave: false,
    });
  }

  return data;
};
