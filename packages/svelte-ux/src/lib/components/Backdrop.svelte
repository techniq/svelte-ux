<script lang="ts">
  import { fade, type FadeParams } from 'svelte/transition';

  import { portal as portalAction, type PortalOptions } from '@layerstack/svelte-actions';
  import { cls } from '@layerstack/tailwind';
  import { getComponentClasses } from './theme.js';

  export let blur: boolean = false;
  export let portal: PortalOptions = false;
  let className: string | undefined = undefined;
  export { className as class };

  export let fadeParams: FadeParams = { duration: 300 };

  const settingsClasses = getComponentClasses('Backdrop');
</script>

<div
  class={cls(
    'Backdrop',
    'fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-surface-content/50 dark:bg-surface-300/70',
    blur && 'backdrop-blur-sm',
    settingsClasses.root,
    className
  )}
  on:keydown
  on:keyup
  on:keypress
  on:click
  on:mousedown
  on:mouseup
  in:fade|global={fadeParams}
  out:fade={fadeParams}
  use:portalAction={portal}
  role="none"
>
  <slot />
</div>
