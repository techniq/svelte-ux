<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { OffsetOptions, Placement } from '@floating-ui/dom';

  import { popover, type PopoverOptions } from '../actions/popover.js';
  import { cls } from '@layerstack/tailwind';
  import { getComponentClasses } from './theme.js';

  export let open = false;
  export let placement: Placement | undefined = undefined;
  let className: string | undefined = undefined;
  export { className as class };

  export let style: string | undefined = undefined;

  /**
   * Place popover based on which side of the viewport has more space
   */
  export let autoPlacement = false;

  /**
   * Provide element to anchor.  If not provided, uses direct parent of Popover
   */
  export let anchorEl: Element | HTMLElement | undefined = undefined;

  /**
   * Offset between anchor and popover
   */
  export let offset: OffsetOptions = 0;

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
  export let resize: PopoverOptions['resize'] = false;

  const dispatch = createEventDispatcher();
  const settingsClasses = getComponentClasses('Popover');

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
  <!-- @ts-expect-error -->
  <div
    class={cls('Popover absolute z-50 outline-none', settingsClasses.root, className)}
    {style}
    tabindex="-1"
    use:popover={{ anchorEl, placement, autoPlacement, offset, padding, matchWidth, resize }}
    on:clickOutside={(e) => {
      e.stopPropagation();
      close('clickOutside');
    }}
  >
    <slot close={() => close()} />
  </div>
{/if}
