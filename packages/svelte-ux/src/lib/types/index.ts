export * from './table';
export * from './typeHelpers';
export * from './typeGuards';

export type MenuOption = {
  label: string;
  value: any;
  icon?: string;
  group?: string;
};

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

export type ButtonRounded = boolean | 'full';
