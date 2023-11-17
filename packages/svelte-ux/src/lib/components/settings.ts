import type { FormatNumberOptions, FormatNumberStyle } from '$lib/utils/number';
import { getContext, setContext } from 'svelte';
import type { Theme } from './theme';

// Matt Pocock tips //https://www.youtube.com/watch?v=2lCCKiWGlC0
export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};
type ExcludeNone<T> = T extends 'none' ? never : T;
export type Settings = {
  formats?: {
    numbers?: Prettify<
      {
        defaults?: FormatNumberOptions;
      } & {
        [key in ExcludeNone<FormatNumberStyle>]?: FormatNumberOptions;
      }
    >;
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

export function getFormatNumberOptions(style?: FormatNumberStyle) {
  let toRet = {
    locales: 'en',
    currency: 'USD',
    fractionDigits: 2,
    currencyDisplay: 'symbol',
  };

  const settings = getSettings();
  toRet = { ...toRet, ...(settings.formats?.numbers?.defaults ?? {}) };

  if (style && style !== 'none') {
    toRet = { ...toRet, ...(settings.formats?.numbers?.[style] ?? {}) };
  }

  return toRet;
}
