<script lang="ts">
  import { slide } from 'svelte/transition';
  import { cls } from '../utils/styles';
  import { getComponentTheme } from './theme';

  export let selected: boolean = false;
  export let vertical = false;

  export let classes: {
    root?: string;
  } = {};
  const theme = getComponentTheme('Tab');
</script>

<button
  type="button"
  class={cls(
    'Tab',
    'inline-flex items-center gap-1 whitespace-nowrap border border-gray-100 px-3 py-2 text-xs',
    vertical
      ? ['rounded-l', selected && 'border-r-white']
      : ['rounded-t', selected && 'border-b-white'],
    selected
      ? 'bg-white text-gray-900 hover:text-accent-600'
      : 'bg-gray-50 text-gray-600 hover:text-accent-600',
    theme.root,
    classes.root,
    $$props.class
  )}
  on:click
  transition:slide|local={{ axis: 'x' }}
>
  <slot />
</button>
