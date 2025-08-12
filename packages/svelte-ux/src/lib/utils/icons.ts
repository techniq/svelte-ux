import type { ComponentProps } from 'svelte';
import { isLiteralObject } from '@layerstack/utils/object';

import type { default as Icon } from '../components/Icon.svelte';
import type { IconData } from '$lib/types/index.js';

export function asIconData(v: IconData | ComponentProps<Icon>): IconData {
  return isIconComponentProps(v) ? v.data : v;
}

function isIconComponentProps(v: IconData | ComponentProps<Icon>): v is ComponentProps<Icon> {
  // `iconName` is a required property of `IconDefinition`, the only other object that `IconInput` supports.
  return isLiteralObject(v) && !('iconName' in v);
}
