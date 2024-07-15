import type { ThemeColors } from './typeHelpers.js';

export * from './table.js';
export * from './typeHelpers.js';
export * from './typeGuards.js';

export type MenuOption<T = any> = {
  label: string;
  value: T;
  icon?: string;
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
