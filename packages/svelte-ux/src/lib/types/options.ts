export type MenuOption = {
  label: string;
  value: any;
  icon?: string;
  group?: string;
};

export type LabelPlacement = 'inset' | 'float' | 'top' | 'left';

export type ButtonVariant =
  | 'default'
  | 'outline'
  | 'fill'
  | 'fill-outline'
  | 'fill-light'
  | 'text'
  | 'none';
