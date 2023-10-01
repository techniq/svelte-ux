<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { fly } from 'svelte/transition';

  import Backdrop from './Backdrop.svelte';
  import ProgressCircle from './ProgressCircle.svelte';
  import Overlay from './Overlay.svelte';

  import { focusMove } from '../actions/focus';
  import { portal as portalAction, type PortalOptions } from '../actions/portal';
  import { cls } from '../utils/styles';
  import { getComponentTheme } from './theme';

  const dispatch = createEventDispatcher();

  export let open = true;
  export let portal: PortalOptions = true;
  export let persistent = false;
  export let loading: boolean | null = null;
  export let placement: 'top' | 'bottom' | 'left' | 'right' = 'right';

  export let classes: {
    root?: string;
    backdrop?: string;
  } = {};
  const theme = getComponentTheme('Drawer');

  $: dispatch('change', { open });

  $: if (open === false) {
    dispatch('close', { open });
  }
</script>

{#if open}
  <Backdrop
    on:click={(e) => {
      if (!persistent) {
        open = false;
      }
      dispatch('close-attempt');
    }}
    on:mouseup={(e) => {
      // Do not allow event to reach Popover's on:mouseup (clickOutside)
      e.stopPropagation();
    }}
    class={cls('z-50', theme.backdrop, classes.backdrop)}
    {portal}
  />

  <div
    class={cls(
      'Drawer',
      'bg-white fixed overflow-auto transform z-50 outline-none',
      {
        'h-full': ['left', 'right'].includes(placement),
        'w-full': ['top', 'bottom'].includes(placement),
        'top-0': ['top', 'left', 'right'].includes(placement),
        'bottom-0': placement === 'bottom',
        'left-0': ['top', 'top', 'bottom'].includes(placement),
        'right-0': placement === 'right',
      },
      theme.root,
      classes.root,
      $$props.class
    )}
    style={$$props.style}
    in:fly|global={{
      x: placement === 'left' ? '-100%' : placement === 'right' ? '100%' : 0,
      y: placement === 'top' ? '-100%' : placement === 'bottom' ? '100%' : 0,
    }}
    out:fly={{
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
      if (e.key === 'Escape') {
        if (!persistent) {
          open = false;
        }

        dispatch('close-attempt');
      }
    }}
    on:mouseup={(e) => {
      // Do not allow event to reach Popover's on:mouseup (clickOutside)
      e.stopPropagation();
    }}
    use:portalAction={portal}
    use:focusMove={{ restoreFocus: true }}
  >
    {#if loading}
      <Overlay center class="rounded">
        <ProgressCircle />
      </Overlay>
    {/if}

    <slot {open} />
  </div>
{/if}
