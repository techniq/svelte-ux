import type { ComponentProps, SvelteComponent } from 'svelte';
import type * as Components from './';
import { getSettings, type DefaultProps, type Settings } from './settings';

export type ComponentName = keyof typeof Components;

type ClassesProp<T> = T extends { prototype: infer PR extends SvelteComponent }
  ? ComponentProps<PR> extends { classes?: any }
    ? ComponentProps<PR>['classes']
    : never
  : never;

export type ResolvedComponentClasses = {
  [key in ComponentName]: ClassesProp<(typeof Components)[key]> extends never
    ? {}
    : NonNullable<ClassesProp<(typeof Components)[key]>>;
};

export type ComponentClasses = {
  [key in ComponentName]?: ClassesProp<(typeof Components)[key]> | string;
};

export function getClasses(): ComponentClasses {
  return getSettings().classes ?? {};
}

export function resolveComponentClasses<NAME extends ComponentName>(
  settings: Settings,
  name: NAME
) {
  const theme = settings?.classes?.[name] ?? {};
  const classes: ResolvedComponentClasses[NAME] =
    typeof theme === 'string' ? { root: theme } : theme;
  return classes;
}

export function getComponentClasses<NAME extends ComponentName>(
  name: NAME
): ResolvedComponentClasses[NAME] {
  const settings = getSettings();
  return resolveComponentClasses(settings, name);
}
