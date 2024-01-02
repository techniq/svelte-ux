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
  DateToken,
} from '$lib/utils/date';
import type { DictionaryMessages, DictionaryMessagesOptions } from '$lib/utils/dictionary';

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
  dictionary?: DictionaryMessagesOptions;
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

export function getFormatNumber(style?: FormatNumberStyle) {
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

export function getFormatDate(options?: FormatDateOptions) {
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
    dictionaryDate: DictionaryMessages['Date'];
  } = {
    locales: options?.locales ?? settings.formats?.dates?.locales ?? 'en',
    baseParsing,
    weekStartsOn:
      options?.weekStartsOn ?? settings.formats?.dates?.weekStartsOn ?? DayOfWeek.Sunday,
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
        default: options?.presets?.days?.default ??
          settings.formats?.dates?.presets?.days?.default ?? [
            DateToken.DayOfMonth_numeric,
            DateToken.Month_numeric,
            DateToken.Year_numeric,
          ],
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
    dictionaryDate: getDictionary().Date,
  };

  return toRet;
}

export function getDictionary(options?: DictionaryMessagesOptions) {
  // if custom is set && variant is not set, let's put custom as variant
  const settings = getSettings();

  let toRet: DictionaryMessages = {
    Ok: options?.Ok ?? settings.dictionary?.Ok ?? 'Ok',
    Cancel: options?.Cancel ?? settings.dictionary?.Cancel ?? 'Cancel',

    Date: {
      Day: options?.Date?.Day ?? settings.dictionary?.Date?.Day ?? 'Day',
      Week: options?.Date?.Week ?? settings.dictionary?.Date?.Week ?? 'Week',
      BiWeek: options?.Date?.BiWeek ?? settings.dictionary?.Date?.BiWeek ?? 'Bi-Week',
      Month: options?.Date?.Month ?? settings.dictionary?.Date?.Month ?? 'Month',
      Quarter: options?.Date?.Quarter ?? settings.dictionary?.Date?.Quarter ?? 'Quarter',
      CalendarYear:
        options?.Date?.CalendarYear ?? settings.dictionary?.Date?.CalendarYear ?? 'Calendar Year',
      FiscalYearOct:
        options?.Date?.FiscalYearOct ??
        settings.dictionary?.Date?.FiscalYearOct ??
        'Fiscal Year (Oct)',
    },
  };

  return toRet;
}
