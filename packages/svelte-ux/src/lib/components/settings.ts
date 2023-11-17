import type { FormatNumberOptions } from '$lib/utils/number';
import { getContext, setContext } from 'svelte';
import type { Theme } from './theme';

export type Settings = {
  formats?: {
    numbers?: FormatNumberOptions;
  };
  theme?: Theme;
};

const settingsKey = Symbol();

export function settings(settings: Settings) {
  setContext(settingsKey, settings);
}

export function getSettings() {
  // in a try/catch to be able to test wo svelte components
  try {
    return getContext<Settings>(settingsKey) ?? {};
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
    ...(getSettings().formats?.numbers ?? {}),
  };
}
