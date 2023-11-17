import type { FormatNumberOptions } from '$lib/utils/number';
import { getContext, setContext } from 'svelte';
import type { Theme } from './theme';

export type Setup = {
  formats?: {
    numbers?: FormatNumberOptions;
  };
  theme?: Theme;
};

const setupKey = Symbol();

export function setup(setup: Setup) {
  setContext(setupKey, setup);
}

export function getSetup() {
  // in a try/catch to be able to test wo svelte components
  try {
    return getContext<Setup>(setupKey) ?? {};
  } catch (error) {
    return {};
  }
}

export function getFormatNumberOptions() {
  return {
    locales: 'en',
    currency: 'USD',
    fractionDigits: 2,
    currencyDisplay: 'symbol',
    ...(getSetup().formats?.numbers ?? {}),
  };
}
