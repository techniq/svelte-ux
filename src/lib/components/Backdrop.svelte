<script lang="ts">
  import { fade } from 'svelte/transition';

  import portalAction from '../actions/portal';

  export let blur: boolean = false;
  export let portal = false;
</script>

<div
  class="backdrop fixed top-0 bottom-0 left-0 right-0 z-20 flex items-center
    justify-center bg-black/50"
  on:click
  transition:fade={{ duration: 300 }}
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
