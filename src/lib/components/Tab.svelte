<script lang="ts">
  import { slide } from 'svelte/transition';
  import { cls } from '../utils/styles';
  import { getComponentTheme } from './theme';

  export let selected: boolean = false;
  export let placement: 'top' | 'bottom' | 'left' | 'right' = 'top';

  $: vertical = placement === 'left' || placement === 'right';

  export let classes: {
    root?: string;
  } = {};
  const theme = getComponentTheme('Tab');
</script>

<button
  type="button"
  class={cls(
    'Tab',
    'inline-flex items-center gap-1 whitespace-nowrap border px-3 py-2 text-xs',
    `placement-${placement}`,
    {
      top: selected && 'border-b-white',
      bottom: selected && 'border-t-white',
      left: selected && 'border-r-white',
      right: selected && 'border-l-white',
    }[placement],
    selected
      ? 'bg-white text-gray-900'
      : 'bg-gray-100 text-gray-600 hover:text-gray-900 hover:bg-gray-50',
    theme.root,
    classes.root,
    $$props.class
  )}
  on:click
  transition:slide|local={{ axis: vertical ? 'y' : 'x' }}
>
  <slot />
</button>
