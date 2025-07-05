import type { ComponentProps } from 'svelte';
import { isLiteralObject } from '@layerstack/utils/object';

import type { default as Icon } from '../components/Icon.svelte';
import type { IconData, IconInput } from '$lib/types/index.js';

export function asIconData(v: IconInput): IconData {
  return isIconComponentProps(v) ? v.data : v;
}

function isIconComponentProps(v: IconInput): v is ComponentProps<Icon> {
  // `iconName` is a required property of `IconDefinition`, the only other object that `IconInput` supports.
  // If it is undefined, then only ComponentProps<Icon> is viable.
  return isLiteralObject(v) && typeof v['iconName'] === 'undefined';
}
