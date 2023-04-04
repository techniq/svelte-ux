<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import Backdrop from './Backdrop.svelte';
  import CircularProgress from './CircularProgress.svelte';
  import Overlay from './Overlay.svelte';

  import { focusMove } from '../actions/focus';
  import portalAction from '../actions/portal';
  import { fly } from '../utils/transition';
  import { cls } from '../utils/styles';

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
    on:mouseup={(e) => {
      // Do not allow event to reach Popover's on:mouseup (clickOutside)
      e.stopPropagation();
      if (!persistent) {
        open = false;
      }
    }}
    class="z-50"
    {portal}
  />

  <div
    class={cls(
      'bg-white fixed overflow-auto transform z-50 outline-none',
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
    transition:fly|local={{
      x: left ? '-100%' : right ? '100%' : 0,
      y: top ? '-100%' : bottom ? '100%' : 0,
    }}
    on:keydown={(e) => {
      // Do not allow event to reach Popover's on:keydown
      e.stopPropagation();
      if (e.key === 'Escape' && !persistent) {
        open = false;
      }
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
