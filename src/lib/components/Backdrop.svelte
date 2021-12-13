<script lang="ts">
  import { fade, FadeParams } from 'svelte/transition';

  import portalAction from '../actions/portal';

  export let blur: boolean = true;
  export let portal = false;

  export let fadeParams: FadeParams = { duration: 300 };
</script>

<div
  class="backdrop fixed top-0 bottom-0 left-0 right-0 flex items-center
    justify-center bg-black/50 {$$restProps.class || ''}"
  on:click
  transition:fade={fadeParams}
  class:blur
  use:portalAction={{ enabled: portal }}
>
  <slot />
</div>

<style lang="postcss">
  .blur {
    backdrop-filter: blur(2px);
  }
</style>
