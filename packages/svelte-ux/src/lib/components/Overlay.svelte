<script lang="ts">
  import { fade } from 'svelte/transition';
  import type { TransitionConfig } from 'svelte/transition';

  import { cls } from '@layerstack/tailwind';
  import { getComponentClasses } from './theme.js';

  export let center = false;
  export let transition = [fade, { duration: 100 }] as [
    (node: Element, options: any) => TransitionConfig,
    object,
  ];
  let className: string | undefined = undefined;
  export { className as class };

  const settingsClasses = getComponentClasses('Overlay');

  $: [transitionFn, transitionConfig] = transition;
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
  <slot />
</div>
