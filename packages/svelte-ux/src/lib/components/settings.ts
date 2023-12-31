import type { FormatNumberOptions, FormatNumberStyle } from '$lib/utils/number';
import { getContext, setContext } from 'svelte';
import type { Theme } from './theme';
import type { Prettify } from '$lib/types/typeHelpers';
import { type FormatDateOptions, DayOfWeek } from '$lib/utils/date';

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
    dates?: FormatDateOptions;
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

export function getFormatDateOptions(options?: FormatDateOptions) {
  let toRet = {
    locales: options?.locales ?? 'en',
    weekStartsOn: options?.weekStartsOn ?? DayOfWeek.SUN,
    variant: options?.variant ?? 'long',
    dico: {
      Day: options?.dico?.Day ?? 'Day',
      Week: options?.dico?.Week ?? 'Week',
      BiWeek: options?.dico?.BiWeek ?? 'Bi-Week',
      Month: options?.dico?.Month ?? 'Month',
      Quarter: options?.dico?.Quarter ?? 'Quarter',
      CalendarYear: options?.dico?.CalendarYear ?? 'Calendar Year',
      FiscalYearOct: options?.dico?.FiscalYearOct ?? 'Fiscal Year (Oct)',
    },
  } as const;

  return toRet;
}
