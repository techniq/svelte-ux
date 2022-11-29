<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { Placement } from '@floating-ui/dom';
  import clsx from 'clsx';

  import { popover } from '../actions/popover';

  export let open = false;
  export let placement: Placement = undefined;

  /**
   * Provide element to anchor.  If not provided, uses direct parent of Popover
   */
  export let anchorEl: HTMLElement = undefined;

  /**
   * Offset between anchor and popover
   */
  export let offset = 0;

  /**
   * Shift popover if within threshold of window
   */
  export let padding = 4;

  /**
   * Set width of popover element the same as anchor element
   */
  export let matchWidth: boolean = false;

  // TODO: Consider bringing back: https://floating-ui.com/docs/size
  /**
   * Set max-height of popover element to the remaining height from anchor element to bottom of viewport
   */
  // export let maxViewportHeight: boolean | { padding: number } = false;

  const dispatch = createEventDispatcher();

  function close(reason: string) {
    dispatch('close', reason);
    open = false;
  }

  function onKeydown(e: KeyboardEvent) {
    if (open && e.key === 'Escape') {
      e.stopPropagation();
      close('escape');
    }
  }
</script>

<svelte:window on:keydown={onKeydown} />

{#if open}
  <div
    class={clsx('popover absolute z-50 outline-none', $$props.class)}
    tabindex="-1"
    use:popover={{ anchorEl, placement, offset, padding, matchWidth }}
    on:clickOutside={(e) => {
      e.stopPropagation();
      close('clickOutside');
    }}
  >
    <slot {close} />
  </div>
{/if}
