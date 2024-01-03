<script lang="ts">
  import { fade } from 'svelte/transition';
  import type { TransitionConfig } from 'svelte/transition';

  import { cls } from '../utils/styles';
  import { getComponentTheme } from './theme';

  export let center = false;
  export let transition = [fade, { duration: 100 }] as [
    (node: Element, options: any) => TransitionConfig,
    object,
  ];

  const theme = getComponentTheme('Overlay');

  $: [transitionFn, transitionConfig] = transition;
</script>

<div
  class={cls(
    'Overlay',
    'absolute top-0 bottom-0 left-0 right-0 z-30 bg-surface-100/75',
    center && 'flex items-center justify-center',
    theme.root,
    $$props.class
  )}
  transition:transitionFn={transitionConfig}
>
  <slot />
</div>
