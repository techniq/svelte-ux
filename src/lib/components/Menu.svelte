<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { slide, SlideParams } from 'svelte/transition';
  import type { TransitionConfig } from 'svelte/transition';
  import clsx from 'clsx';
  import type { Placement } from '@floating-ui/dom';

  import Popover from './Popover.svelte';

  const dispatch = createEventDispatcher();

  export let open = false;
  export let offset = 4;

  export let matchWidth: boolean = false;
  export let placement: Placement = matchWidth ? 'bottom-start' : 'bottom';
  export let disableTransition = false;
  export let transition = disableTransition
    ? (node: HTMLElement, params: any) => null as TransitionConfig
    : slide;
  export let transitionParams: any = undefined; // TODO: Provider interface of all *Params (SlideParams, FlyParams, etc)
  export let explicitClose = false;

  let menuItemsEl: HTMLUListElement;

  function onClick(e) {
    try {
      if (e.target === menuItemsEl) {
        // Clicked within menu but outside of any items
        // console.log('clicked:menuItems', e.target, menuEl);
      } else if (!explicitClose) {
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
  {placement}
  {offset}
  {matchWidth}
  {open}
  class={clsx('bg-white rounded shadow border', $$props.class)}
  style={$$props.style}
  on:close
  let:close
>
  <ul
    class="menu-items outline-none"
    bind:this={menuItemsEl}
    on:click={onClick}
    transition:transition={transitionParams}
  >
    <slot {close} />
  </ul>
</Popover>
