import posthog from 'posthog-js';

import { browser, dev } from '$app/environment';

// Disable server-side rendering until AppLayout shift is fixed (issue #22)
export const ssr = false;

export const load = async () => {
  // Setup Posthog
  if (browser && !dev) {
    posthog.init('phc_F78mUWQpKPpsXS1mamJFzDWM8bivZrwIx4Nm1cI8BSb', {
      api_host: 'https://app.posthog.com',
      capture_pageview: false,
      capture_pageleave: false,
    });
  }
};
