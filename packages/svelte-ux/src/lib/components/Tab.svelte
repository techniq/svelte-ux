<script lang="ts">
  import { slide } from 'svelte/transition';
  import { cls } from '@layerstack/tailwind';
  import { getComponentClasses } from './theme.js';

  export let selected: boolean = false;
  export let placement: 'top' | 'bottom' | 'left' | 'right' = 'top';

  $: vertical = placement === 'left' || placement === 'right';

  export let classes: {
    root?: string;
  } = {};
  const settingsClasses = getComponentClasses('Tab');
</script>

<button
  type="button"
  class={cls(
    'Tab',
    'inline-flex items-center gap-1 whitespace-nowrap border px-3 py-2 text-xs',
    `placement-${placement}`,
    {
      top: selected && 'border-b-surface-100',
      bottom: selected && 'border-t-surface-100',
      left: selected && 'border-r-surface-100',
      right: selected && 'border-l-surface-100',
    }[placement],
    selected
      ? 'bg-surface-100 text-surface-content'
      : 'bg-surface-200 text-surface-content/50 hover:text-surface-content hover:bg-surface-100',
    settingsClasses.root,
    classes.root,
    $$props.class
  )}
  on:click
  transition:slide={{ axis: vertical ? 'y' : 'x' }}
>
  <slot />
</button>
