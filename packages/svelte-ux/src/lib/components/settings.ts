import type { FormatNumberOptions, FormatNumberStyle } from '$lib/utils/number';
import { getContext, setContext } from 'svelte';
import type { ComponentClasses } from './theme';
import type { Prettify } from '$lib/types/typeHelpers';
import {
  type FormatDateOptions,
  DayOfWeek,
  type DateFormatVariant,
  type CustomIntlDateTimeFormatOptions,
  type OrdinalSuffixes,
  DateToken,
  getWeekStartsOnFromIntl,
} from '$lib/utils/date';
import type { DictionaryMessages, DictionaryMessagesOptions } from '$lib/utils/dictionary';
import { createThemeStore, type ThemeStore } from '$lib/stores/themeStore';

type ExcludeNone<T> = T extends 'none' ? never : T;
export type SettingsInput = {
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
  classes?: ComponentClasses;
  /** A list of the available themes */
  themes?: {
    light?: string[];
    dark?: string[];
  };
  currentTheme?: ThemeStore;
};

export interface Settings extends Omit<SettingsInput, 'formats'> {
  getDictionary: ReturnType<typeof buildDictionary>;
  getFormatNumber: ReturnType<typeof buildNumberFormat>;
  getFormatDate: ReturnType<typeof buildDateFormat>;
  currentTheme: ThemeStore;
}

const settingsKey = Symbol();

export function settings(settings: SettingsInput) {
  let lightThemes = settings.themes?.light ?? ['light'];
  let darkThemes = settings.themes?.dark ?? ['dark'];

  let currentTheme =
    // In some cases, `settings` is called again from inside a component. Don't create a new theme store in this case.
    settings.currentTheme ??
    createThemeStore({
      light: lightThemes,
      dark: darkThemes,
    });

  let dictionary = buildDictionary(settings);

  setContext(settingsKey, {
    ...settings,
    themes: {
      light: lightThemes,
      dark: darkThemes,
    },
    currentTheme,
    getFormatNumber: buildNumberFormat(settings),
    getFormatDate: buildDateFormat(settings, dictionary()),
    getDictionary: dictionary,
  });
}

export function getSettings(): Settings {
  // in a try/catch to be able to test wo svelte components
  try {
    return getContext<Settings>(settingsKey) ?? {};
  } catch (error) {
    let dict = buildDictionary({});
    return {
      currentTheme: createThemeStore({ light: ['light'], dark: ['dark'] }),
      getDictionary: dict,
      getFormatNumber: buildNumberFormat({}),
      getFormatDate: buildDateFormat({}, dict()),
    };
  }
}

function buildNumberFormat(settings: SettingsInput) {
  return function getFormatNumber(style?: FormatNumberStyle) {
    let toRet = {
      locales: 'en',
      currency: 'USD',
      fractionDigits: 2,
      currencyDisplay: 'symbol',
    };

    toRet = { ...toRet, ...(settings.formats?.numbers?.defaults ?? {}) };

    if (style && style !== 'none') {
      toRet = { ...toRet, ...(settings.formats?.numbers?.[style] ?? {}) };
    }

    return toRet;
  };
}

export function buildDateFormat(settings: SettingsInput, dictionary: DictionaryMessages) {
  return function getFormatDate(options?: FormatDateOptions) {
    const baseParsing =
      options?.baseParsing ?? settings.formats?.dates?.baseParsing ?? 'yyyy-MM-dd';

    const locales = options?.locales ?? settings.formats?.dates?.locales ?? 'en';

    const weekStartsOn =
      options?.weekStartsOn ??
      settings.formats?.dates?.weekStartsOn ??
      getWeekStartsOnFromIntl(locales);

    // if custom is set && variant is not set, let's put custom as variant
    const variant: FormatDateOptions['variant'] =
      options?.custom && options?.variant === undefined ? 'custom' : options?.variant ?? 'default';

    const custom = options?.custom ?? '';

    let toRet: {
      baseParsing: string;
      locales: string;
      weekStartsOn: DayOfWeek;
      variant: DateFormatVariant;
      custom: CustomIntlDateTimeFormatOptions;
      presets: {
        day: Record<DateFormatVariant, CustomIntlDateTimeFormatOptions>;
        dayTime: Record<DateFormatVariant, CustomIntlDateTimeFormatOptions>;
        timeOnly: Record<DateFormatVariant, CustomIntlDateTimeFormatOptions>;
        week: Record<DateFormatVariant, CustomIntlDateTimeFormatOptions>;
        month: Record<DateFormatVariant, CustomIntlDateTimeFormatOptions>;
        monthYear: Record<DateFormatVariant, CustomIntlDateTimeFormatOptions>;
        year: Record<DateFormatVariant, CustomIntlDateTimeFormatOptions>;
      };
      ordinalSuffixes: Record<string, OrdinalSuffixes>;
      dictionaryDate: DictionaryMessages['Date'];
    } = {
      baseParsing,
      locales,
      weekStartsOn,
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
        day: {
          short: options?.presets?.day?.short ??
            settings.formats?.dates?.presets?.day?.short ?? [
              DateToken.DayOfMonth_numeric,
              DateToken.Month_numeric,
            ],
          default: options?.presets?.day?.default ??
            settings.formats?.dates?.presets?.day?.default ?? [
              DateToken.DayOfMonth_numeric,
              DateToken.Month_numeric,
              DateToken.Year_numeric,
            ],
          long: options?.presets?.day?.long ??
            settings.formats?.dates?.presets?.day?.long ?? [
              DateToken.DayOfMonth_numeric,
              DateToken.Month_short,
              DateToken.Year_numeric,
            ],
          custom,
        },
        dayTime: {
          short: options?.presets?.dayTime?.short ??
            settings.formats?.dates?.presets?.dayTime?.short ?? [
              DateToken.DayOfMonth_numeric,
              DateToken.Month_numeric,
              DateToken.Year_numeric,
              DateToken.Hour_numeric,
              DateToken.Minute_numeric,
            ],
          default: options?.presets?.dayTime?.default ??
            settings.formats?.dates?.presets?.dayTime?.default ?? [
              DateToken.DayOfMonth_numeric,
              DateToken.Month_numeric,
              DateToken.Year_numeric,
              DateToken.Hour_2Digit,
              DateToken.Minute_2Digit,
            ],
          long: options?.presets?.dayTime?.long ??
            settings.formats?.dates?.presets?.dayTime?.long ?? [
              DateToken.DayOfMonth_numeric,
              DateToken.Month_numeric,
              DateToken.Year_numeric,
              DateToken.Hour_2Digit,
              DateToken.Minute_2Digit,
              DateToken.Second_2Digit,
            ],
          custom,
        },

        timeOnly: {
          short: options?.presets?.timeOnly?.short ??
            settings.formats?.dates?.presets?.timeOnly?.short ?? [
              DateToken.Hour_numeric,
              DateToken.Minute_numeric,
            ],
          default: options?.presets?.timeOnly?.default ??
            settings.formats?.dates?.presets?.timeOnly?.default ?? [
              DateToken.Hour_2Digit,
              DateToken.Minute_2Digit,
              DateToken.Second_2Digit,
            ],
          long: options?.presets?.timeOnly?.long ??
            settings.formats?.dates?.presets?.timeOnly?.long ?? [
              DateToken.Hour_2Digit,
              DateToken.Minute_2Digit,
              DateToken.Second_2Digit,
              DateToken.MiliSecond_3,
            ],
          custom,
        },

        week: {
          short: options?.presets?.week?.short ??
            settings.formats?.dates?.presets?.week?.short ?? [
              DateToken.DayOfMonth_numeric,
              DateToken.Month_numeric,
            ],
          default: options?.presets?.week?.default ??
            settings.formats?.dates?.presets?.week?.default ?? [
              DateToken.DayOfMonth_numeric,
              DateToken.Month_numeric,
              DateToken.Year_numeric,
            ],
          long: options?.presets?.week?.long ??
            settings.formats?.dates?.presets?.week?.long ?? [
              DateToken.DayOfMonth_numeric,
              DateToken.Month_numeric,
              DateToken.Year_numeric,
            ],
          custom,
        },
        month: {
          short:
            options?.presets?.month?.short ??
            settings.formats?.dates?.presets?.month?.short ??
            DateToken.Month_short,
          default:
            options?.presets?.month?.default ??
            settings.formats?.dates?.presets?.month?.default ??
            DateToken.Month_short,
          long:
            options?.presets?.month?.long ??
            settings.formats?.dates?.presets?.month?.long ??
            DateToken.Month_long,
          custom,
        },
        monthYear: {
          short: options?.presets?.monthsYear?.short ??
            settings.formats?.dates?.presets?.monthsYear?.short ?? [
              DateToken.Month_short,
              DateToken.Year_2Digit,
            ],
          default: options?.presets?.monthsYear?.default ??
            settings.formats?.dates?.presets?.monthsYear?.default ?? [
              DateToken.Month_long,
              DateToken.Year_numeric,
            ],
          long: options?.presets?.monthsYear?.long ??
            settings.formats?.dates?.presets?.monthsYear?.long ?? [
              DateToken.Month_long,
              DateToken.Year_numeric,
            ],
          custom,
        },
        year: {
          short:
            options?.presets?.year?.short ??
            settings.formats?.dates?.presets?.year?.short ??
            DateToken.Year_2Digit,
          default:
            options?.presets?.year?.default ??
            settings.formats?.dates?.presets?.year?.default ??
            DateToken.Year_numeric,
          long:
            options?.presets?.year?.long ??
            settings.formats?.dates?.presets?.year?.long ??
            DateToken.Year_numeric,
          custom,
        },
      },

      // dico
      dictionaryDate: dictionary.Date,
    };

    return toRet;
  };
}

function buildDictionary(settings: SettingsInput) {
  return function getDictionary(options?: DictionaryMessagesOptions) {
    // if custom is set && variant is not set, let's put custom as variant
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
  };
}
