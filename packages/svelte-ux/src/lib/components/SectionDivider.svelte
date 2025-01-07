<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { SvelteHTMLElements } from 'svelte/elements';
  import { cls } from '../utils/styles.js';
  import { getComponentClasses } from './theme.js';

  interface Props {
    children?: Snippet;
  }

  let { ...props }: Props & Omit<SvelteHTMLElements['div'], keyof Props> = $props();

  const settingsClasses = getComponentClasses('SectionDivider');
</script>

<div
  {...props}
  class={cls('SectionDivider', 'flex items-center my-2', settingsClasses.root, props.class)}
>
  <div class="flex-1 border h-px rounded-full mr-2"></div>
  <div class="font-medium text-surface-content border px-4 rounded-full bg-surface-100 shadow">
    {@render props.children?.()}
  </div>
  <div class="flex-1 border h-px rounded-full ml-2"></div>
</div>
