import type { ComponentProps, SvelteComponent } from 'svelte';
import type * as Components from './';
import { getSettings, type DefaultProps, type Settings } from './settings';
import type { ButtonVariant, LabelPlacement } from '$lib/types/options';
import type { Prettify } from '$lib/types';

export type ComponentName = keyof typeof Components;

type ClassesProp<T> = T extends { prototype: infer PR extends SvelteComponent }
  ? ComponentProps<PR> extends { classes?: any }
    ? ComponentProps<PR>['classes']
    : never
  : never;

interface ComponentDefaultProps {
  Button?: {
    variant?: ButtonVariant;
  };
  ButtonGroup?: {
    variant?: ButtonVariant;
  };
  CopyButton?: {
    variant?: ButtonVariant;
  };
  DateButton?: {
    variant?: ButtonVariant;
  };
  DateField?: {
    labelPlacement?: LabelPlacement;
  };
  DatePickerField?: {
    labelPlacement?: LabelPlacement;
  };
  DateRangeField?: {
    labelPlacement?: LabelPlacement;
  };
  Field?: {
    labelPlacement?: LabelPlacement;
  };
  MenuButton?: {
    variant?: ButtonVariant;
  };
  MenuField?: {
    labelPlacement?: LabelPlacement;
  };
  MultiSelectField?: {
    labelPlacement?: LabelPlacement;
  };
  RangeField?: {
    labelPlacement?: LabelPlacement;
  };
  SelectField?: {
    labelPlacement?: LabelPlacement;
  };
  TextField?: {
    labelPlacement?: LabelPlacement;
  };
  ToggleButton?: {
    variant?: ButtonVariant;
  };
}

export type ResolvedComponentClasses = {
  [key in ComponentName]: ResolvedComponentClassesProp<key>;
};

export type ResolvedComponentClassesProp<NAME extends ComponentName> =
  ClassesProp<(typeof Components)[NAME]> extends never
    ? {}
    : NonNullable<ClassesProp<(typeof Components)[NAME]>>;

export type AllDefaultProps<NAME extends ComponentName> = NAME extends keyof ComponentDefaultProps
  ? ComponentDefaultProps[NAME]
  : {};

export type ResolvedComponentSettings<NAME extends ComponentName> = AllDefaultProps<NAME> & {
  classes: ResolvedComponentClassesProp<NAME>;
};

export type ComponentSettings = {
  [key in ComponentName]?: {
    classes?: ClassesProp<(typeof Components)[key]> | string;
  } & (key extends keyof ComponentDefaultProps ? ComponentDefaultProps[key] : {});
};

export function getComponents(): ComponentSettings {
  return getSettings().components ?? {};
}

export function resolveComponentClasses<NAME extends ComponentName>(
  theme: ComponentSettings[NAME]
): ResolvedComponentClassesProp<NAME> {
  return typeof theme?.classes === 'string' ? { root: theme } : theme?.classes ?? {};
}

export function getComponentClasses<NAME extends ComponentName>(
  name: NAME
): ResolvedComponentClasses[NAME] {
  const settings = getSettings();
  return resolveComponentClasses(settings?.components?.[name]);
}
