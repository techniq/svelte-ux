import { writable, type Readable } from 'svelte/store';
import { browser } from '$app/environment';

/** Information about the currently chosen theme. */
export class CurrentTheme {
  /** The currently selected theme. If using the "system" theme this will be null. */
  theme: string | null;
  /** Whether the current theme is a light or dark theme */
  dark: boolean;

  constructor(theme: string | null, dark: boolean) {
    this.theme = theme;
    this.dark = dark;
  }

  /** The theme in use, either the selected theme or the theme chosen based on the "system" setting. */
  get resolvedTheme() {
    if (this.theme) {
      return this.theme;
    } else {
      return this.dark ? 'dark' : 'light';
    }
  }
}

export interface ThemeStore extends Readable<CurrentTheme> {
  setTheme: (themeName: string) => void;
}

export interface ThemeStoreOptions {
  light: string[];
  dark: string[];
}

export function createThemeStore(options: ThemeStoreOptions): ThemeStore {
  let store = writable<CurrentTheme>(new CurrentTheme(null, false));

  function setTheme(themeName: string) {
    if (!browser) {
      // Stub this out for SSR
      store.set(
        new CurrentTheme(
          themeName === 'system' ? null : themeName,
          options.dark.includes(themeName)
        )
      );
      return;
    }

    if (themeName === 'system') {
      // Remove setting
      localStorage.removeItem('theme');
      delete document.documentElement.dataset.theme;

      let dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (dark) {
        document.documentElement.classList.add('dark');
      }

      store.set(new CurrentTheme(null, dark));
    } else {
      // Save theme to local storage, set `<html data-theme="">`, and set `<html class="dark">` if dark mode
      localStorage.theme = themeName;
      document.documentElement.dataset.theme = themeName;

      let dark = options.dark.includes(themeName);
      if (dark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }

      store.set(new CurrentTheme(themeName, dark));
    }
  }

  if (browser) {
    let savedTheme = localStorage.getItem('theme') || 'system';
    setTheme(savedTheme);
  }

  return {
    subscribe: store.subscribe,
    setTheme,
  };
}
