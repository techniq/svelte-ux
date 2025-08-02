import { getContext, setContext } from 'svelte';
import { writable, derived, type Readable, type Writable } from 'svelte/store';
import { BROWSER } from 'esm-env';

import { buildFormatters, type FormatFunctions } from '@layerstack/utils/format';
import {
  getAllKnownLocales,
  localeStore,
  type LocaleSettings,
  type LocaleStore,
  type LocaleSettingsInput,
} from '@layerstack/utils/locale';
import { breakpoints } from '@layerstack/svelte-stores';
import { createThemeStore, type ThemeStore } from '@layerstack/svelte-stores';

import {
  type ComponentName,
  type ComponentSettings,
  type ResolvedComponentSettings,
  resolveComponentClasses,
  type ResolvedDefaultProps,
} from './theme.js';
import type { LabelPlacement } from '../types/index.js';

import LucideArrowUp from '@lucide/svelte/icons/arrow-up';
import LucideArrowDown from '@lucide/svelte/icons/arrow-down';
import LucideArrowLeft from '@lucide/svelte/icons/arrow-left';
import LucideArrowRight from '@lucide/svelte/icons/arrow-right';
import LucideBraces from '@lucide/svelte/icons/braces';
import LucideCalendar from '@lucide/svelte/icons/calendar';
import LucideCheck from '@lucide/svelte/icons/check';
import LucideChevronLeft from '@lucide/svelte/icons/chevron-left';
import LucideChevronRight from '@lucide/svelte/icons/chevron-right';
import LucideChevronDown from '@lucide/svelte/icons/chevron-down';
import LucideChevronFirst from '@lucide/svelte/icons/chevron-first';
import LucideChevronLast from '@lucide/svelte/icons/chevron-last';
import LucideClipboardPaste from '@lucide/svelte/icons/clipboard-paste';
import LucideCode from '@lucide/svelte/icons/code';
import LucideCopy from '@lucide/svelte/icons/copy';
import LucideDollarSign from '@lucide/svelte/icons/dollar-sign';
import LucideEllipsis from '@lucide/svelte/icons/ellipsis';
import LucideEllipsisVertical from '@lucide/svelte/icons/ellipsis-vertical';
import LucideEye from '@lucide/svelte/icons/eye';
import LucideGripHorizontal from '@lucide/svelte/icons/grip-horizontal';
import LucideHouse from '@lucide/svelte/icons/house';
import LucideInfo from '@lucide/svelte/icons/info';
import LucideCircleAlert from '@lucide/svelte/icons/circle-alert';
import LucideMenu from '@lucide/svelte/icons/menu';
import LucideMinus from '@lucide/svelte/icons/minus';
import LucidePercent from '@lucide/svelte/icons/percent';
import LucidePencil from '@lucide/svelte/icons/pencil';
import LucidePlus from '@lucide/svelte/icons/plus';
import LucideRefreshCw from '@lucide/svelte/icons/refresh-cw';
import LucideScissors from '@lucide/svelte/icons/scissors';
import LucideSearch from '@lucide/svelte/icons/search';
import LucideTrash2 from '@lucide/svelte/icons/trash-2';
import LucideUndo2 from '@lucide/svelte/icons/undo-2';
import LucideX from '@lucide/svelte/icons/x';

import LucideSun from '@lucide/svelte/icons/sun';
import LucideMoon from '@lucide/svelte/icons/moon';
import LucideMonitor from '@lucide/svelte/icons/monitor';

export const DEFAULT_ICONS = {
  alert: LucideCircleAlert,
  arrowUp: LucideArrowUp,
  arrowDown: LucideArrowDown,
  arrowLeft: LucideArrowLeft,
  arrowRight: LucideArrowRight,
  calendar: LucideCalendar,
  check: LucideCheck,
  chevronLeft: LucideChevronLeft,
  chevronRight: LucideChevronRight,
  chevronDown: LucideChevronDown,
  chevronFirst: LucideChevronFirst,
  chevronLast: LucideChevronLast,
  close: LucideX,
  cut: LucideScissors,
  code: LucideCode,
  codeBraces: LucideBraces,
  copy: LucideCopy,
  currency: LucideDollarSign,
  edit: LucidePencil,
  ellipsis: LucideEllipsis,
  ellipsisVertical: LucideEllipsisVertical,
  gripHorizontal: LucideGripHorizontal,
  home: LucideHouse,
  info: LucideInfo,
  menu: LucideMenu,
  minus: LucideMinus,
  paste: LucideClipboardPaste,
  percent: LucidePercent,
  plus: LucidePlus,
  refresh: LucideRefreshCw,
  reveal: LucideEye,
  search: LucideSearch,
  trash: LucideTrash2,
  undo: LucideUndo2,

  lightMode: LucideSun,
  darkMode: LucideMoon,
  monitor: LucideMonitor,
};

export interface DefaultProps {
  labelPlacement: LabelPlacement;
}

export type SettingsOptions = {
  /** Force a specific locale setting. */
  forceLocale?: string;
  /** Use this locale in case we don't have locale info for the user's current locale as returned from Intl.
   * Defaults to `en` if not specified. */
  fallbackLocale?: string;
  /** Format information for additional locales that are not built-in to svelte-ux. */
  localeFormats?: Record<string, LocaleSettingsInput>;

  /** Component settings including defaults props and classes */
  components?: ComponentSettings;

  /** A list of the available themes */
  themes?: {
    light?: string[];
    dark?: string[];
  };
  currentTheme?: ThemeStore;

  icons?: typeof DEFAULT_ICONS;

  /** The existing locale store, if calling settings when there is already an existing `Settings` object */
  locale?: LocaleStore;
  /** The existing locale store, if calling settings when there is already an existing `Settings` object */
  localeSettings?: Readable<LocaleSettings>;
  /** The existing locale store, if calling settings when there is already an existing `Settings` object */
  format?: Readable<FormatFunctions>;
};

export interface Settings extends Omit<SettingsOptions, 'formats' | 'dictionary'> {
  /** The currently selected locale */
  locale: LocaleStore;
  /** The settings for the currently selected locale */
  localeSettings: Readable<LocaleSettings>;
  /** Formatting functions and information */
  format: Readable<FormatFunctions>;
  currentTheme: ThemeStore;
  showDrawer: Writable<boolean>;
  icons: typeof DEFAULT_ICONS;

  componentSettingsCache: Partial<Record<ComponentName, ResolvedComponentSettings<ComponentName>>>;
}

const settingsKey = Symbol();

function createLocaleStores(settings: SettingsOptions) {
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
  return writable(BROWSER ? window.innerWidth >= breakpoints.md : true);
}

export function settings(settings: SettingsOptions = {}): Settings {
  const lightThemes = settings.themes ? (settings.themes.light ?? []) : ['light'];
  const darkThemes = settings.themes ? (settings.themes.dark ?? []) : ['dark'];

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
    icons: settings.icons ?? DEFAULT_ICONS,
    ...localeStores,
  });
}

let FALLBACK_SETTINGS: Settings | null = null;

function getFallbackSettings() {
  FALLBACK_SETTINGS = FALLBACK_SETTINGS ?? {
    currentTheme: createThemeStore({ light: [], dark: [] }),
    componentSettingsCache: {},
    showDrawer: createShowDrawer(),
    icons: DEFAULT_ICONS,
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

/**
 * Returns default component props and classes for a given component.
 * @param name component name
 */
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
