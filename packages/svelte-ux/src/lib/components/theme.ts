import type { ComponentProps, SvelteComponent } from 'svelte';
import type * as Components from './';
import { getSettings } from './settings';

type ComponentName = keyof typeof Components;

type ClassesProp<T> = T extends { prototype: infer PR extends SvelteComponent }
  ? ComponentProps<PR> extends { classes?: any }
    ? ComponentProps<PR>['classes']
    : never
  : never;

export type ComponentClasses = {
  [key in ComponentName]?: ClassesProp<(typeof Components)[key]> | string;
};

export function getClasses() {
  return getSettings().classes ?? {};
}

export function getComponentClasses(name: ComponentName) {
  const theme = getClasses()[name] ?? {};

  return typeof theme === 'string' ? { root: theme } : theme;
}
