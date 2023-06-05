<script lang="ts">
  import { fade, type FadeParams } from 'svelte/transition';

  import { portal as portalAction } from '../actions/portal';
  import { cls } from '../utils/styles';

  export let blur: boolean = false;
  export let portal = false;

  export let fadeParams: FadeParams = { duration: 300 };
</script>

<div
  class={cls(
    'backdrop fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black/50',
    blur && 'backdrop-blur-sm',
    $$restProps.class
  )}
  on:keydown
  on:keyup
  on:keypress
  on:click
  on:mousedown
  on:mouseup
  in:fade={fadeParams}
  out:fade|local={fadeParams}
  use:portalAction={{ enabled: portal }}
>
  <slot />
</div>
