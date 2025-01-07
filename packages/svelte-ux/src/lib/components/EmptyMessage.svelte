<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { SvelteHTMLElements } from 'svelte/elements';
  import { cls } from '../utils/styles.js';
  import { getComponentClasses } from './theme.js';
  interface Props {
    children?: Snippet;
  }

  let {
    class: className,
    children,
    ...restProps
  }: Props & Omit<SvelteHTMLElements['div'], keyof Props> = $props();

  const settingsClasses = getComponentClasses('EmptyMessage');
</script>

<div
  {...restProps}
  class={cls(
    'EmptyMessage',
    'grid place-items-center',
    'p-1 bg-surface-300 _shadow-inner _ring-1 ring-surface-200/30',
    'text-surface-content/50 text-xs tracking-wider',
    'border border-surface-100/80 rounded',
    settingsClasses.root,
    className
  )}
>
  {@render children?.()}
</div>
