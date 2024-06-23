import type { ComponentProps } from 'svelte';
import type { default as Icon } from '../components/Icon.svelte';
import { isLiteralObject } from './object.js';

export type IconInput = ComponentProps<Icon>['data'] | ComponentProps<Icon>;
export type IconData = ComponentProps<Icon>['data'];

export function asIconData(v: IconInput): IconData {
  return isIconComponentProps(v) ? v.data : v;
}

function isIconComponentProps(v: IconInput): v is ComponentProps<Icon> {
  // `iconName` is a required property of `IconDefinition`, the only other object that `IconInput` supports.
  // If it is undefined, then only ComponentProps<Icon> is viable.
  return isLiteralObject(v) && typeof v['iconName'] === 'undefined';
}
