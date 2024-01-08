import { type Writable, derived, type Readable, writable } from 'svelte/store';
import type { Prettify } from '$lib/types/typeHelpers';
import {
  DateToken,
  DayOfWeek,
  type FormatDateLocaleOptions,
  type FormatDateLocalePresets,
  type FormatDateOptions,
} from './date';
import type { DictionaryMessages, DictionaryMessagesOptions } from './dictionary';
import type { FormatNumberOptions, FormatNumberStyle } from './number';
import { defaultsDeep } from 'lodash-es';

function resolvedLocaleStore(
  supportedLocales: string[],
  forceLocales: Writable<string | string[] | null>,
  fallbackLocale?: string
) {
  return derived(forceLocales, ($forceLocales) => {
    let result: string | undefined;
    if ($forceLocales?.length) {
      if (Array.isArray($forceLocales)) {
        result = $forceLocales.find((l) => supportedLocales.includes(l));
      } else if (supportedLocales.includes($forceLocales)) {
        result = $forceLocales;
      }
    }

    return result ?? fallbackLocale ?? 'en-US';
  });
}

export interface LocaleStore extends Readable<string> {
  set(value: string | null): void;
}

export function localeStore(
  supportedLocales: string[],
  forceLocale: string | undefined,
  fallbackLocale?: string
): LocaleStore {
  let currentLocale = writable(forceLocale ?? null);
  let resolvedLocale = resolvedLocaleStore(supportedLocales, currentLocale, fallbackLocale);
  return {
    ...resolvedLocale,
    set(value: string | null) {
      currentLocale.set(value);
    },
  };
}

type ExcludeNone<T> = T extends 'none' ? never : T;

export type NumberPresetsOptions = Prettify<
  {
    defaults?: FormatNumberOptions;
  } & {
    [key in ExcludeNone<FormatNumberStyle>]?: FormatNumberOptions;
  }
>;
export type NumberPresets = Prettify<
  {
    defaults: FormatNumberOptions;
  } & {
    [key in ExcludeNone<FormatNumberStyle>]?: FormatNumberOptions;
  }
>;

export interface LocaleSettingsInput {
  locale: string;
  formats?: {
    numbers?: NumberPresetsOptions;
    dates?: FormatDateLocaleOptions;
  };
  dictionary?: DictionaryMessagesOptions;
}

export interface LocaleSettings {
  locale: string;
  formats: {
    numbers: NumberPresets;
    dates: FormatDateLocalePresets;
  };
  dictionary: DictionaryMessages;
}

const defaultLocaleSettings: LocaleSettings = {
  locale: 'en',
  dictionary: {
    Ok: 'Ok',
    Cancel: 'Cancel',
    Date: {
      Day: 'Day',
      Week: 'Week',
      BiWeek: 'Bi-Week',
      Month: 'Month',
      Quarter: 'Quarter',
      CalendarYear: 'Calendar Year',
      FiscalYearOct: 'Fiscal Year (Oct)',
    },
  },
  formats: {
    numbers: {
      defaults: {
        currency: 'USD',
        fractionDigits: 2,
        currencyDisplay: 'symbol',
      },
    },
    dates: {
      baseParsing: 'MM/dd/yyyy',
      weekStartsOn: DayOfWeek.Sunday,
      ordinalSuffixes: {
        one: 'st',
        two: 'nd',
        few: 'rd',
        other: 'th',
      },
      presets: {
        day: {
          short: [DateToken.DayOfMonth_numeric, DateToken.Month_numeric],
          default: [DateToken.DayOfMonth_numeric, DateToken.Month_numeric, DateToken.Year_numeric],
          long: [DateToken.DayOfMonth_numeric, DateToken.Month_short, DateToken.Year_numeric],
        },
        dayTime: {
          short: [
            DateToken.DayOfMonth_numeric,
            DateToken.Month_numeric,
            DateToken.Year_numeric,
            DateToken.Hour_numeric,
            DateToken.Minute_numeric,
          ],
          default: [
            DateToken.DayOfMonth_numeric,
            DateToken.Month_numeric,
            DateToken.Year_numeric,
            DateToken.Hour_2Digit,
            DateToken.Minute_2Digit,
          ],
          long: [
            DateToken.DayOfMonth_numeric,
            DateToken.Month_numeric,
            DateToken.Year_numeric,
            DateToken.Hour_2Digit,
            DateToken.Minute_2Digit,
            DateToken.Second_2Digit,
          ],
        },

        timeOnly: {
          short: [DateToken.Hour_numeric, DateToken.Minute_numeric],
          default: [DateToken.Hour_2Digit, DateToken.Minute_2Digit, DateToken.Second_2Digit],
          long: [
            DateToken.Hour_2Digit,
            DateToken.Minute_2Digit,
            DateToken.Second_2Digit,
            DateToken.MiliSecond_3,
          ],
        },

        week: {
          short: [DateToken.DayOfMonth_numeric, DateToken.Month_numeric],
          default: [DateToken.DayOfMonth_numeric, DateToken.Month_numeric, DateToken.Year_numeric],
          long: [DateToken.DayOfMonth_numeric, DateToken.Month_numeric, DateToken.Year_numeric],
        },
        month: {
          short: DateToken.Month_short,
          default: DateToken.Month_short,
          long: DateToken.Month_long,
        },
        monthsYear: {
          short: [DateToken.Month_short, DateToken.Year_2Digit],
          default: [DateToken.Month_long, DateToken.Year_numeric],
          long: [DateToken.Month_long, DateToken.Year_numeric],
        },
        year: {
          short: DateToken.Year_2Digit,
          default: DateToken.Year_numeric,
          long: DateToken.Year_numeric,
        },
      },
    },
  },
};

/** Creates a locale settings object, using the `base` locale settings as defaults.
 * If omitted, the `en` locale is used as the base. */
export function createLocaleSettings(
  localeSettings: LocaleSettingsInput,
  base = defaultLocaleSettings
): LocaleSettings {
  return defaultsDeep(localeSettings, base);
}

export const knownLocales: Record<string, LocaleSettings> = {
  en: createLocaleSettings({ locale: 'en' }),
  // TODO fill in the real values for 'fr'
  fr: createLocaleSettings({ locale: 'fr' }),
};

export function getAllKnownLocales(additionalLocales?: Record<string, LocaleSettingsInput>) {
  return { ...knownLocales, ...additionalLocales };
}
