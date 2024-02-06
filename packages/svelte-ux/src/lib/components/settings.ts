import { getContext, setContext } from 'svelte';
import {
  type ComponentName,
  type ComponentSettings,
  type ResolvedComponentSettings,
  resolveComponentClasses,
} from './theme';
import { createThemeStore, type ThemeStore } from '$lib/stores/themeStore';
import type { LabelPlacement } from '$lib/types/options';
import {
  getAllKnownLocales,
  localeStore,
  type LocaleSettings,
  type LocaleStore,
  type LocaleSettingsInput,
} from '$lib/utils/locale';
import { buildFormatters, type FormatFunctions } from '$lib/utils/format';
import { writable, type Readable, type Writable, derived } from 'svelte/store';

export interface DefaultProps {
  labelPlacement: LabelPlacement;
}

export type SettingsInput = {
  /** Force a specific locale setting. */
  forceLocale?: string;
  /** Use this locale in case we don't have locale info for the user's current locale as returned from Intl.
   * Defaults to `en` if not specified. */
  fallbackLocale?: string;
  /** Format information for additional locales that are not built-in to svelte-ux. */
  localeFormats?: Record<string, LocaleSettingsInput>;

  components?: ComponentSettings;
  /** A list of the available themes */
  themes?: {
    light?: string[];
    dark?: string[];
  };
  currentTheme?: ThemeStore;

  defaultProps?: Partial<DefaultProps>;

  /** The existing locale store, if calling settings when there is already an existing `Settings` object */
  locale?: LocaleStore;
  /** The existing locale store, if calling settings when there is already an existing `Settings` object */
  localeSettings?: Readable<LocaleSettings>;
  /** The existing locale store, if calling settings when there is already an existing `Settings` object */
  format?: Readable<FormatFunctions>;
};

export interface Settings extends Omit<SettingsInput, 'formats' | 'dictionary' | 'defaultProps'> {
  /** The currently selected locale */
  locale: LocaleStore;
  /** The settings for the currently selected locale */
  localeSettings: Readable<LocaleSettings>;
  /** Formatting functions and information */
  format: Readable<FormatFunctions>;
  currentTheme: ThemeStore;
  defaultProps: DefaultProps;

  componentSettingsCache: Partial<Record<ComponentName, GetComponentSettingsResult<ComponentName>>>;
}

const settingsKey = Symbol();

function createLocaleStores(settings: SettingsInput) {
  if (settings.locale && settings.localeSettings && settings.format) {
    return {
      locale: settings.locale,
      localeSettings: settings.localeSettings,
      format: settings.format,
    };
  }

  let allLocales = getAllKnownLocales(settings.localeFormats);

  let locale = localeStore(settings.forceLocale, settings.fallbackLocale);
  let localeSettings = derived(locale, ($locale) => {
    let settings = allLocales[$locale];
    if (settings) {
      return settings;
    }

    return {
      ...allLocales.en,
      locale: $locale,
    };
  });

  return {
    locale,
    localeSettings,
    format: derived(localeSettings, buildFormatters),
  };
}

const defaultProps: DefaultProps = {
  labelPlacement: 'inset',
};

export function settings(settings: SettingsInput): Settings {
  let lightThemes = settings.themes?.light ?? ['light'];
  let darkThemes = settings.themes?.dark ?? ['dark'];

  let currentTheme =
    // In some cases, `settings` is called again from inside a component. Don't create a new theme store in this case.
    settings.currentTheme ??
    createThemeStore({
      light: lightThemes,
      dark: darkThemes,
    });

  let localeStores = createLocaleStores(settings);

  const resolvedDefaultProps: DefaultProps = {
    ...defaultProps,
    ...settings.defaultProps,
  };

  return setContext<Settings>(settingsKey, {
    ...settings,
    themes: {
      light: lightThemes,
      dark: darkThemes,
    },
    defaultProps: resolvedDefaultProps,
    currentTheme,
    ...localeStores,
    componentSettingsCache: {},
  });
}

export function getSettings(): Settings {
  // in a try/catch to be able to test wo svelte components
  try {
    return getContext<Settings>(settingsKey) ?? { defaultProps };
  } catch (error) {
    return {
      currentTheme: createThemeStore({ light: ['light'], dark: ['dark'] }),
      defaultProps,
      componentSettingsCache: {},
    };
  }
}

export function resolveComponentSettings<NAME extends ComponentName>(
  settings: Settings,
  name: NAME
): ResolvedComponentSettings[NAME] {
  const theme = settings?.components?.[name];

  return {
    ...theme,
    classes: resolveComponentClasses(theme),
  };
}

export interface GetComponentSettingsResult<NAME extends ComponentName> {
  defaults: ResolvedComponentSettings[NAME];
  globalDefaults: DefaultProps;
}

export function getComponentSettings<NAME extends ComponentName>(
  name: NAME
): GetComponentSettingsResult<NAME> {
  const settings = getSettings();

  const existing = settings.componentSettingsCache[name];
  if (existing) {
    return existing as GetComponentSettingsResult<NAME>;
  }

  const componentSettings = resolveComponentSettings(settings, name)!;

  const output: GetComponentSettingsResult<NAME> = {
    defaults: componentSettings,
    globalDefaults: settings?.defaultProps ?? defaultProps,
  };

  settings.componentSettingsCache[name] = output;
  return output;
}
