<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import { slide } from 'svelte/transition';
  import { cls } from '../utils/styles.js';
  import { getComponentClasses } from './theme.js';

  interface Props {
    selected?: boolean;
    placement?: 'top' | 'bottom' | 'left' | 'right';
    classes?: {
      root?: string;
    };
    class?: string;
    onclick?: HTMLButtonAttributes['onclick'];
    children?: Snippet;
  }

  let {
    selected = false,
    placement = 'top',
    classes = {},
    class: className,
    onclick,
    children,
  }: Props = $props();
  const settingsClasses = getComponentClasses('Tab');
  let vertical = $derived(placement === 'left' || placement === 'right');
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
    className
  )}
  {onclick}
  transition:slide={{ axis: vertical ? 'y' : 'x' }}
>
  {@render children?.()}
</button>
