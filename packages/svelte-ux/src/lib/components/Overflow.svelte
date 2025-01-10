<script lang="ts">
  import type { Snippet } from 'svelte';
  import { overflow } from '../actions/layout.js';
  import { cls } from '../utils/styles.js';
  import { getComponentClasses } from './theme.js';
  import type { SvelteHTMLElements } from 'svelte/elements';

  interface Props {
    children?: Snippet<[{ overflowX: number; overflowY: number }]>;
  }

  let {
    class: className,
    children,
    ...restProps
  }: Props & Omit<SvelteHTMLElements['div'], keyof Props> = $props();

  const settingsClasses = getComponentClasses('Overflow');

  let overflowX = $state(0);
  let overflowY = $state(0);
</script>

<div
  use:overflow
  onoverflow={(e) => {
    overflowX = e.detail.overflowX;
    overflowY = e.detail.overflowY;
  }}
  {...restProps}
  class={cls('Overflow', settingsClasses.root, className)}
>
  {@render children?.({ overflowX, overflowY })}
</div>
