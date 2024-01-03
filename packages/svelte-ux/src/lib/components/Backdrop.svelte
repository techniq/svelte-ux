<script lang="ts">
  import { fade, type FadeParams } from 'svelte/transition';

  import { portal as portalAction, type PortalOptions } from '../actions/portal';
  import { cls } from '../utils/styles';
  import { getComponentTheme } from './theme';

  export let blur: boolean = false;
  export let portal: PortalOptions = false;

  export let fadeParams: FadeParams = { duration: 300 };

  const theme = getComponentTheme('Backdrop');
</script>

<div
  class={cls(
    'Backdrop',
    'fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-surface-content/50 dark:bg-surface-300/70',
    blur && 'backdrop-blur-sm',
    theme.root,
    $$props.class
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
>
  <slot />
</div>
