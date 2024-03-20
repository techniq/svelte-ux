import { getContext, setContext } from 'svelte';
import { writable, derived, type Readable, type Writable } from 'svelte/store';

import {
  type ComponentName,
  type ComponentSettings,
  type ResolvedComponentSettings,
  resolveComponentClasses,
  type ResolvedDefaultProps,
} from './theme.js';
import { createThemeStore, type ThemeStore } from '$lib/stores/themeStore.js';
import type { LabelPlacement } from '$lib/types/index.js';
import {
  getAllKnownLocales,
  localeStore,
  type LocaleSettings,
  type LocaleStore,
  type LocaleSettingsInput,
} from '$lib/utils/locale.js';
import { buildFormatters, type FormatFunctions } from '$lib/utils/format.js';
import { breakpoints } from '../stores/matchMedia.js';
import { browser } from '$lib/utils/env.js';

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

  /** The existing locale store, if calling settings when there is already an existing `Settings` object */
  locale?: LocaleStore;
  /** The existing locale store, if calling settings when there is already an existing `Settings` object */
  localeSettings?: Readable<LocaleSettings>;
  /** The existing locale store, if calling settings when there is already an existing `Settings` object */
  format?: Readable<FormatFunctions>;
};

export interface Settings extends Omit<SettingsInput, 'formats' | 'dictionary'> {
  /** The currently selected locale */
  locale: LocaleStore;
  /** The settings for the currently selected locale */
  localeSettings: Readable<LocaleSettings>;
  /** Formatting functions and information */
  format: Readable<FormatFunctions>;
  currentTheme: ThemeStore;
  showDrawer: Writable<boolean>;

  componentSettingsCache: Partial<Record<ComponentName, ResolvedComponentSettings<ComponentName>>>;
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

function createShowDrawer() {
  return writable(browser ? window.innerWidth >= breakpoints.md : true);
}

export function settings(settings: SettingsInput = {}): Settings {
  const lightThemes = settings.themes ? settings.themes.light ?? [] : ['light'];
  const darkThemes = settings.themes ? settings.themes.dark ?? [] : ['dark'];

  const currentTheme =
    // In some cases, `settings` is called again from inside a component. Don't create a new theme store in this case.
    settings.currentTheme ??
    createThemeStore({
      light: lightThemes,
      dark: darkThemes,
    });

  const localeStores = createLocaleStores(settings);

  const showDrawer = createShowDrawer();

  return setContext<Settings>(settingsKey, {
    ...settings,
    themes: {
      light: lightThemes,
      dark: darkThemes,
    },
    currentTheme,
    componentSettingsCache: {},
    showDrawer,
    ...localeStores,
  });
}

let FALLBACK_SETTINGS: Settings | null = null;

function getFallbackSettings() {
  FALLBACK_SETTINGS = FALLBACK_SETTINGS ?? {
    currentTheme: createThemeStore({ light: ['light'], dark: ['dark'] }),
    componentSettingsCache: {},
    showDrawer: createShowDrawer(),
    ...createLocaleStores({}),
  };
  return FALLBACK_SETTINGS;
}

export function getSettings(): Settings {
  // in a try/catch to be able to test w/o svelte components
  try {
    return getContext<Settings>(settingsKey) ?? getFallbackSettings();
  } catch (error) {
    return getFallbackSettings();
  }
}

export function resolveComponentSettings<NAME extends ComponentName>(
  settings: Settings,
  name: NAME
): ResolvedComponentSettings<NAME> {
  const { classes: themeClasses, ...defaultProps } = settings?.components?.[name] ?? {};
  const classes = resolveComponentClasses(themeClasses);

  const output: ResolvedComponentSettings<NAME> = {
    defaults: (defaultProps ?? {}) as ResolvedDefaultProps<NAME>,
    classes,
  };

  return output;
}

export function getComponentSettings<NAME extends ComponentName>(
  name: NAME
): ResolvedComponentSettings<NAME> {
  const settings = getSettings();

  const existing = settings.componentSettingsCache[name];
  if (existing) {
    return existing as ResolvedComponentSettings<NAME>;
  }

  const output = resolveComponentSettings(settings, name)!;
  settings.componentSettingsCache[name] = output;
  return output;
}
