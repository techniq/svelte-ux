<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import clsx from 'clsx';

  import Backdrop from './Backdrop.svelte';
  import CircularProgress from './CircularProgress.svelte';
  import Overlay from './Overlay.svelte';

  import { focusMove } from '../actions/focus';
  import portalAction from '../actions/portal';
  import { fly } from '../utils/transition';

  const dispatch = createEventDispatcher();

  export let open = true;
  export let portal = true;
  export let persistent = false;
  export let loading: boolean | null = null;

  export let right = false;
  export let top = false;
  export let bottom = false;
  $: left = !right && !top && !bottom;

  $: dispatch('change', { open });

  $: if (open === false) {
    dispatch('close', { open });
  }
</script>

{#if open}
  <Backdrop
    on:click={() => {
      if (!persistent) {
        open = false;
      }
    }}
    class="z-50"
    {portal}
  />

  <div
    class={clsx(
      'bg-white fixed overflow-auto transform z-50',
      {
        'h-full': left || right,
        'w-full': top || bottom,
        'top-0': left || right || top,
        'bottom-0': bottom,
        'left-0': left || top || bottom,
        'right-0': right,
      },
      $$props.class
    )}
    style={$$props.style}
    transition:fly={{
      x: left ? '-100%' : right ? '100%' : 0,
      y: top ? '-100%' : bottom ? '100%' : 0,
    }}
    on:keydown={(e) => {
      if (e.key === 'Escape' && !persistent) {
        e.stopPropagation();
        open = false;
      }
    }}
    use:portalAction={{ enabled: portal }}
    use:focusMove
  >
    {#if loading}
      <Overlay center class="rounded">
        <CircularProgress />
      </Overlay>
    {/if}

    <slot {open} />
  </div>
{/if}
