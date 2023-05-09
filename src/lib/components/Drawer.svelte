<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { fly } from 'svelte/transition';

  import Backdrop from './Backdrop.svelte';
  import CircularProgress from './CircularProgress.svelte';
  import Overlay from './Overlay.svelte';

  import { focusMove } from '../actions/focus';
  import portalAction from '../actions/portal';
  import { cls } from '../utils/styles';

  const dispatch = createEventDispatcher();

  export let open = true;
  export let portal = true;
  export let persistent = false;
  export let loading: boolean | null = null;
  export let placement: 'top' | 'bottom' | 'left' | 'right' = 'right';

  $: dispatch('change', { open });

  $: if (open === false) {
    dispatch('close', { open });
  }
</script>

{#if open}
  <Backdrop
    on:mouseup={(e) => {
      // Do not allow event to reach Popover's on:mouseup (clickOutside)
      e.stopPropagation();
      if (!persistent) {
        open = false;
      }
      dispatch('close-attempt');
    }}
    class="z-50"
    {portal}
  />

  <div
    class={cls(
      'bg-white fixed overflow-auto transform z-50 outline-none',
      {
        'h-full': ['left', 'right'].includes(placement),
        'w-full': ['top', 'bottom'].includes(placement),
        'top-0': ['top', 'left', 'right'].includes(placement),
        'bottom-0': placement === 'bottom',
        'left-0': ['top', 'top', 'bottom'].includes(placement),
        'right-0': placement === 'right',
      },
      $$props.class
    )}
    style={$$props.style}
    in:fly={{
      x: placement === 'left' ? '-100%' : placement === 'right' ? '100%' : 0,
      y: placement === 'top' ? '-100%' : placement === 'bottom' ? '100%' : 0,
    }}
    out:fly|local={{
      x: placement === 'left' ? '-100%' : placement === 'right' ? '100%' : 0,
      y: placement === 'top' ? '-100%' : placement === 'bottom' ? '100%' : 0,
    }}
    on:introstart
    on:outrostart
    on:introend
    on:outroend
    on:keydown={(e) => {
      // Do not allow event to reach Popover's on:keydown
      e.stopPropagation();
      if (e.key === 'Escape' && !persistent) {
        open = false;
      }
      dispatch('close-attempt');
    }}
    on:mouseup={(e) => {
      // Do not allow event to reach Popover's on:mouseup (clickOutside)
      e.stopPropagation();
    }}
    use:portalAction={{ enabled: portal }}
    use:focusMove={{ restoreFocus: true }}
  >
    {#if loading}
      <Overlay center class="rounded">
        <CircularProgress />
      </Overlay>
    {/if}

    <slot {open} />
  </div>
{/if}
