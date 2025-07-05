import type { Component, ComponentProps } from 'svelte';
import type { SvelteHTMLElements } from 'svelte/elements';
import type {
  FlyParams,
  SlideParams,
  BlurParams,
  FadeParams,
  ScaleParams,
} from 'svelte/transition';
import type { ThemeColors } from '@layerstack/tailwind';

import Icon from '$lib/components/Icon.svelte';
import MenuItem from '$lib/components/MenuItem.svelte';

export type MenuOption<T = any> = {
  label: string;
  value: T;
  icon?: ComponentProps<MenuItem>['icon'];
  group?: string;
  disabled?: boolean;
} & Record<string, any>;

export type LabelPlacement = 'inset' | 'float' | 'top' | 'left';
export const DEFAULT_LABEL_PLACEMENT: LabelPlacement = 'inset';

export type ButtonVariant =
  | 'default'
  | 'outline'
  | 'fill'
  | 'fill-outline'
  | 'fill-light'
  | 'text'
  | 'none';

export type ButtonColor = ThemeColors | 'default';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonRounded = boolean | 'full';

export type TransitionParams = BlurParams | FadeParams | FlyParams | SlideParams | ScaleParams;

export type IconData = ComponentProps<Icon>['data'];
export type IconInput = IconData | ComponentProps<Icon>;
export type IconComponent = Component<SvelteHTMLElements['svg']>;
export type IconProp = IconComponent | IconInput;
