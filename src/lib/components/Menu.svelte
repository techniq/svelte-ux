<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { slide } from 'svelte/transition';
  import type { TransitionConfig } from 'svelte/transition';

  import Popover from './Popover.svelte';
  import type { PopoverOrigin, PopoverPlacement } from './Popover.svelte';

  import { remainingViewportHeight } from '../actions/layout';

  const dispatch = createEventDispatcher();

  export { className as class };

  export let open = false;
  export let offset = 4;
  export let className = '';
  export let style = null;
  export let disableTransition = false;
  export let transition = disableTransition
    ? (node: HTMLElement, params: any) => null as TransitionConfig
    : slide;

  /**
   * Set height to remaining height of viewport
   */
  export let maxViewportHeight = false;

  export let placement: PopoverPlacement = 'bottom';
  export let anchorOrigin: PopoverOrigin = undefined;
  export let popoverOrigin: PopoverOrigin = undefined;
  export let matchWidth: boolean = false;

  let menuItemsEl: HTMLUListElement;

  function onClick(e) {
    try {
      if (e.target === menuItemsEl) {
        // Clicked within menu but outside of any items
        // console.log('clicked:menuItems', e.target, menuEl);
      } else {
        //
        // console.log('clicked:menuItem', e.target);
        open = false;
        dispatch('close', 'item');
      }
    } catch (err) {
      console.error(err);
    }
  }
</script>

<Popover
  class={className}
  {style}
  {placement}
  {anchorOrigin}
  {popoverOrigin}
  {offset}
  {matchWidth}
  {open}
  on:close
  let:setPosition
>
  <ul
    class="menu-items overflow-x-hidden overflow-y-visible bg-white rounded shadow border outline-none"
    use:remainingViewportHeight={{
      max: true,
      offset: 8,
      enabled: maxViewportHeight,
    }}
    bind:this={menuItemsEl}
    on:click={onClick}
    transition:transition
    on:introend={() => {
      // Update position after transition finishes (full height of menu is available for popover calculation)
      if (!maxViewportHeight) {
        setPosition();
      }
    }}
  >
    <slot />
  </ul>
</Popover>
