<script lang="ts">
  import { fade } from 'svelte/transition';
  import type { TransitionConfig } from 'svelte/transition';

  import { cls } from '../utils/styles';

  export let center = false;
  export let transition = [fade, { duration: 100 }] as [
    (node: Element, options: any) => TransitionConfig,
    object
  ];

  $: [transitionFn, transitionConfig] = transition;
</script>

<div
  class={cls(
    'Overlay',
    'absolute top-0 bottom-0 left-0 right-0 z-30 bg-white/75',
    center && 'flex items-center justify-center',
    $$props.class
  )}
  transition:transitionFn|local={transitionConfig}
>
  <slot />
</div>
