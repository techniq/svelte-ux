import type { ComponentProps, SvelteComponent } from 'svelte';
import type * as Components from './index.js';
import { getSettings } from './settings.js';
import type {
  ButtonColor,
  ButtonRounded,
  ButtonSize,
  ButtonVariant,
  LabelPlacement,
} from '$lib/types/index.js';

export type ComponentName = keyof typeof Components;

type ClassesProp<T> = T extends { prototype: infer PR extends SvelteComponent }
  ? ComponentProps<PR> extends { classes?: any }
    ? ComponentProps<PR>['classes']
    : ComponentProps<PR> extends { class?: string }
      ? { root?: string }
      : never
  : never;

interface ComponentDefaultProps {
  Button?: {
    variant?: ButtonVariant;
    color?: ButtonColor;
    size?: ButtonSize;
    rounded?: ButtonRounded;
  };
  ButtonGroup?: {
    variant?: ButtonVariant;
    color?: ButtonColor;
    size?: ButtonSize;
    rounded?: ButtonRounded;
  };
  CopyButton?: {
    variant?: ButtonVariant;
    color?: ButtonColor;
    size?: ButtonSize;
    rounded?: ButtonRounded;
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
    color?: ButtonColor;
    size?: ButtonSize;
    rounded?: ButtonRounded;
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
    color?: ButtonColor;
    size?: ButtonSize;
    rounded?: ButtonRounded;
  };
}

export type ResolvedComponentClasses = {
  [key in ComponentName]: ResolvedComponentClassesProp<key>;
};

export type ResolvedComponentClassesProp<NAME extends ComponentName> =
  ClassesProp<(typeof Components)[NAME]> extends never
    ? {}
    : NonNullable<ClassesProp<(typeof Components)[NAME]>>;

export type ResolvedDefaultProps<NAME extends ComponentName> =
  NAME extends keyof ComponentDefaultProps ? NonNullable<ComponentDefaultProps[NAME]> : {};

export interface ResolvedComponentSettings<NAME extends ComponentName> {
  defaults: ResolvedDefaultProps<NAME>;
  classes: ResolvedComponentClassesProp<NAME>;
}

export type ComponentSettings = {
  [key in ComponentName]?: {
    classes?: ClassesProp<(typeof Components)[key]> | string;
  } & (key extends keyof ComponentDefaultProps ? ComponentDefaultProps[key] : {});
};

export function getComponents(): ComponentSettings {
  return getSettings().components ?? {};
}

export function resolveComponentClasses<NAME extends ComponentName>(
  theme: ClassesProp<(typeof Components)[NAME]>
): ResolvedComponentClassesProp<NAME> {
  return typeof theme === 'string' ? { root: theme } : theme ?? {};
}

export function getComponentClasses<NAME extends ComponentName>(
  name: NAME
): ResolvedComponentClasses[NAME] {
  const settings = getSettings();
  return resolveComponentClasses(settings?.components?.[name]?.classes);
}
