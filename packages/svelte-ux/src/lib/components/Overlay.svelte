<script lang="ts">
  import type { Snippet } from 'svelte';
  import { fade } from 'svelte/transition';
  import type { TransitionConfig } from 'svelte/transition';

  import { cls } from '../utils/styles.js';
  import { getComponentClasses } from './theme.js';

  interface Props {
    center?: boolean;
    transition?: [(node: Element, options: any) => TransitionConfig, object];
    class?: string;
    children?: Snippet;
  }

  let {
    center = false,
    transition = [fade, { duration: 100 }],
    class: className,
    children,
  }: Props = $props();

  const settingsClasses = getComponentClasses('Overlay');

  let [transitionFn, transitionConfig] = $derived(transition);
</script>

<div
  class={cls(
    'Overlay',
    'absolute top-0 bottom-0 left-0 right-0 z-30 bg-surface-100/75',
    center && 'flex items-center justify-center',
    settingsClasses.root,
    className
  )}
  transition:transitionFn={transitionConfig}
>
  {@render children?.()}
</div>
