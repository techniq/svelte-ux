<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { Placement } from '@floating-ui/dom';

  import { popover } from '../actions/popover';
  import { cls } from '../utils/styles';
  import { getComponentTheme } from './theme';

  export let open = false;
  export let placement: Placement | undefined = undefined;

  /**
   * Place popover based on which side of the viewport has more space
   */
  export let autoPlacement = false;

  /**
   * Provide element to anchor.  If not provided, uses direct parent of Popover
   */
  export let anchorEl: HTMLElement | undefined = undefined;

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
  export let matchWidth = false;

  /**
   * Set max-height of popover element to the remaining height from anchor element to bottom of viewport
   */
  export let resize = false;

  const dispatch = createEventDispatcher();
  const theme = getComponentTheme('Popover');

  function close(reason: string = 'unknown') {
    if (open) {
      dispatch('close', reason);
      open = false;
    }
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
    class={cls('Popover absolute z-50 outline-none', theme.root, $$props.class)}
    tabindex="-1"
    use:popover={{ anchorEl, placement, autoPlacement, offset, padding, matchWidth, resize }}
    on:clickOutside={(e) => {
      e.stopPropagation();
      close('clickOutside');
    }}
  >
    <slot {close} />
  </div>
{/if}
