import { getContext, setContext, type ComponentProps, SvelteComponent } from 'svelte';
import type * as Components from './';

type ComponentName = keyof typeof Components;

type ClassesProp<T> = T extends { prototype: infer PR extends SvelteComponent }
  ? ComponentProps<PR> extends { classes?: any }
    ? ComponentProps<PR>['classes']
    : never
  : never;

type Theme = {
  [key in ComponentName]?: ClassesProp<(typeof Components)[key]> | string;
};

const themeKey = Symbol();

export function createTheme(theme: Theme) {
  setContext(themeKey, theme);
}

export function getTheme() {
  return getContext<Theme>(themeKey) ?? {};
}

export function getComponentTheme(name: ComponentName) {
  const theme = getTheme()[name] ?? {};

  return typeof theme === 'string' ? { root: theme } : theme;
}
