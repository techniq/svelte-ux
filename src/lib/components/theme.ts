import { getContext, setContext } from 'svelte';

const themeKey = Symbol();

// TODO: Find convenient way to type keys as component names (AppBar, Button, etc), and lookup `classes` prop on referenced component name

/**
 * passed as `class`
 * {
 *   ComponentName: 'class'
 * }
 *
 * or passed as `classes`
 * {
 *   ComponentName:
 *   {
 *     element1: 'class',
 *     element2: 'class'
 *   }
 * }
 */
type Theme = Record<string, string | Record<string, string>>;

export function createTheme(theme: Theme) {
  setContext(themeKey, theme);
}

export function getTheme() {
  return getContext<Theme>(themeKey) ?? {};
}

export function getComponentTheme(name: string) {
  const theme = getTheme()[name] ?? {};

  return typeof theme === 'string' ? { root: theme } : theme;
}
