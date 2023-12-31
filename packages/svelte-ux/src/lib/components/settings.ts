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
  // if custom is set && variant is not set, let's put custom as variant
  const variant: FormatDateOptions['variant'] =
    options?.custom && options?.variant === undefined ? 'custom' : options?.variant ?? 'default';

  const settings = getSettings();
  let toRet = {
    locales: settings.formats?.dates?.locales ?? options?.locales ?? 'en',
    baseParsing: settings.formats?.dates?.baseParsing ?? options?.baseParsing ?? 'MM/dd/yyyy',
    weekStartsOn: settings.formats?.dates?.weekStartsOn ?? options?.weekStartsOn ?? DayOfWeek.SUN,
    variant,
    custom: options?.custom ?? '',
    dico: {
      Day: settings.formats?.dates?.dico?.Day ?? options?.dico?.Day ?? 'Day',
      Week: settings.formats?.dates?.dico?.Week ?? options?.dico?.Week ?? 'Week',
      BiWeek: settings.formats?.dates?.dico?.BiWeek ?? options?.dico?.BiWeek ?? 'Bi-Week',
      Month: settings.formats?.dates?.dico?.Month ?? options?.dico?.Month ?? 'Month',
      Quarter: settings.formats?.dates?.dico?.Quarter ?? options?.dico?.Quarter ?? 'Quarter',
      CalendarYear:
        settings.formats?.dates?.dico?.CalendarYear ??
        options?.dico?.CalendarYear ??
        'Calendar Year',
      FiscalYearOct:
        settings.formats?.dates?.dico?.FiscalYearOct ??
        options?.dico?.FiscalYearOct ??
        'Fiscal Year (Oct)',
    },
  };

  return toRet;
}
