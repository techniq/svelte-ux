<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { fly } from 'svelte/transition';

  import Backdrop from './Backdrop.svelte';
  import ProgressCircle from './ProgressCircle.svelte';
  import Overlay from './Overlay.svelte';

  import { focusMove } from '../actions/focus.js';
  import { portal as portalAction, type PortalOptions } from '../actions/portal.js';
  import { cls } from '@layerstack/tailwind';
  import { getComponentClasses } from './theme.js';

  const dispatch = createEventDispatcher<{
    change: { open: boolean };
    close: null;
    closeAttempt: null;
    open: null;
  }>();

  export let open = true;
  export let portal: PortalOptions = true;
  export let persistent = false;
  export let loading: boolean | null = null;
  export let placement: 'top' | 'bottom' | 'left' | 'right' = 'right';

  export let classes: {
    root?: string;
    backdrop?: string;
    actions?: string;
  } = {};
  const settingsClasses = getComponentClasses('Drawer');

  $: dispatch('change', { open });

  function close(options?: { force?: boolean }) {
    const force = options?.force ?? false;
    if (open) {
      if (!persistent || force) {
        open = false;
      } else {
        // attempted close of persistent dialog
        dispatch('closeAttempt');
      }
    }
  }

  $: if (open) {
    dispatch('open');
  } else {
    dispatch('close');
  }
</script>

<!-- Separate `{#if}` block works around Svelte 5 regression: https://github.com/sveltejs/svelte/issues/12440  -->
{#if open}
  <Backdrop
    on:click={(e) => {
      close();
    }}
    on:mouseup={(e) => {
      // Do not allow event to reach Popover's on:mouseup (clickOutside)
      e.stopPropagation();
    }}
    class={cls('z-50', settingsClasses.backdrop, classes.backdrop)}
    {portal}
  />
{/if}

{#if open}
  <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
  <div
    class={cls(
      'Drawer',
      'bg-surface-100 fixed overflow-auto transform z-50 outline-none',
      {
        'h-full': ['left', 'right'].includes(placement),
        'w-full': ['top', 'bottom'].includes(placement),
        'top-0': ['top', 'left', 'right'].includes(placement),
        'bottom-0': placement === 'bottom',
        'left-0': ['top', 'top', 'bottom'].includes(placement),
        'right-0': placement === 'right',
      },
      settingsClasses.root,
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
      if (e.key === 'Escape') {
        // Do not allow event to reach Popover's on:keydown
        e.stopPropagation();

        close();
      }
    }}
    use:portalAction={portal}
    use:focusMove={{ restoreFocus: true }}
    role="dialog"
  >
    {#if loading}
      <Overlay center class="rounded">
        <ProgressCircle />
      </Overlay>
    {/if}

    <slot {open} {close} />

    {#if $$slots.actions}
      <div
        class={cls(
          'actions fixed bottom-0 w-full flex justify-center bg-surface-content/5 p-1 border-t',
          settingsClasses.actions,
          classes.actions
        )}
      >
        <slot name="actions" {open} {close} />
      </div>
    {/if}
  </div>
{/if}
