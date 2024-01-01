import type { FormatNumberOptions, FormatNumberStyle } from '$lib/utils/number';
import { getContext, setContext } from 'svelte';
import type { Theme } from './theme';
import type { Prettify } from '$lib/types/typeHelpers';
import {
  type FormatDateOptions,
  DayOfWeek,
  type DateFormatVariant,
  type CustomIntlDateTimeFormatOptions,
  type OrdinalSuffixes,
} from '$lib/utils/date';

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

  const baseParsing = options?.baseParsing ?? settings.formats?.dates?.baseParsing ?? 'MM/dd/yyyy';

  const custom = options?.custom ?? '';

  let toRet: {
    locales: string;
    baseParsing: string;
    weekStartsOn: DayOfWeek;
    variant: DateFormatVariant;
    custom: CustomIntlDateTimeFormatOptions;
    presets: {
      days: Record<DateFormatVariant, CustomIntlDateTimeFormatOptions>;
      weeks: Record<DateFormatVariant, CustomIntlDateTimeFormatOptions>;
      months: Record<DateFormatVariant, CustomIntlDateTimeFormatOptions>;
      monthsYears: Record<DateFormatVariant, CustomIntlDateTimeFormatOptions>;
      years: Record<DateFormatVariant, CustomIntlDateTimeFormatOptions>;
    };
    ordinalSuffixes: Record<string, OrdinalSuffixes>;
    dico: {
      Day: string;
      Week: string;
      BiWeek: string;
      Month: string;
      Quarter: string;
      CalendarYear: string;
      FiscalYearOct: string;
    };
  } = {
    locales: options?.locales ?? settings.formats?.dates?.locales ?? 'en',
    baseParsing,
    weekStartsOn: options?.weekStartsOn ?? settings.formats?.dates?.weekStartsOn ?? DayOfWeek.SUN,
    variant,
    custom,

    // keep always the en fallback
    ordinalSuffixes: {
      en: {
        one: 'st',
        two: 'nd',
        few: 'rd',
        other: 'th',
      },
      ...settings.formats?.dates?.ordinalSuffixes,
      ...options?.ordinalSuffixes,
    },

    presets: {
      days: {
        short:
          options?.presets?.days?.short ?? settings.formats?.dates?.presets?.days?.short ?? 'd M',
        default:
          options?.presets?.days?.default ??
          settings.formats?.dates?.presets?.days?.default ??
          baseParsing,
        long:
          options?.presets?.days?.long ??
          settings.formats?.dates?.presets?.days?.long ??
          'd MMM yyyy',
        custom,
      },
      weeks: {
        short:
          options?.presets?.weeks?.short ?? settings.formats?.dates?.presets?.weeks?.short ?? 'd M',
        default:
          options?.presets?.weeks?.default ??
          settings.formats?.dates?.presets?.weeks?.default ??
          'd M yyyy',
        long:
          options?.presets?.weeks?.long ??
          settings.formats?.dates?.presets?.weeks?.long ??
          'd M yyyy',
        custom,
      },
      months: {
        short:
          options?.presets?.months?.short ??
          settings.formats?.dates?.presets?.months?.short ??
          'MMM',
        default:
          options?.presets?.months?.default ??
          settings.formats?.dates?.presets?.months?.default ??
          'MMM',
        long:
          options?.presets?.months?.long ??
          settings.formats?.dates?.presets?.months?.long ??
          'MMMM',
        custom,
      },
      monthsYears: {
        short:
          options?.presets?.monthsYears?.short ??
          settings.formats?.dates?.presets?.monthsYears?.short ??
          'MMM yy',
        default:
          options?.presets?.monthsYears?.default ??
          settings.formats?.dates?.presets?.monthsYears?.default ??
          'MMMM yyyy',
        long:
          options?.presets?.monthsYears?.long ??
          settings.formats?.dates?.presets?.monthsYears?.long ??
          'MMMM yyyy',
        custom,
      },
      years: {
        short:
          options?.presets?.years?.short ?? settings.formats?.dates?.presets?.years?.short ?? 'yy',
        default:
          options?.presets?.years?.default ??
          settings.formats?.dates?.presets?.years?.default ??
          'yyyy',
        long:
          options?.presets?.years?.long ?? settings.formats?.dates?.presets?.years?.long ?? 'yyyy',
        custom,
      },
    },

    // dico
    dico: {
      Day: options?.dico?.Day ?? settings.formats?.dates?.dico?.Day ?? 'Day',
      Week: options?.dico?.Week ?? settings.formats?.dates?.dico?.Week ?? 'Week',
      BiWeek: options?.dico?.BiWeek ?? settings.formats?.dates?.dico?.BiWeek ?? 'Bi-Week',
      Month: options?.dico?.Month ?? settings.formats?.dates?.dico?.Month ?? 'Month',
      Quarter: options?.dico?.Quarter ?? settings.formats?.dates?.dico?.Quarter ?? 'Quarter',
      CalendarYear:
        options?.dico?.CalendarYear ??
        settings.formats?.dates?.dico?.CalendarYear ??
        'Calendar Year',
      FiscalYearOct:
        options?.dico?.FiscalYearOct ??
        settings.formats?.dates?.dico?.FiscalYearOct ??
        'Fiscal Year (Oct)',
    },
  };

  return toRet;
}
