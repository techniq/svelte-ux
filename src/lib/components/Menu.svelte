<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { slide, SlideParams } from 'svelte/transition';
  import type { TransitionConfig } from 'svelte/transition';
  import type { Placement } from '@floating-ui/dom';

  import { focusMove } from '../actions/focus';
  import { cls } from '../utils/styles';

  import Popover from './Popover.svelte';

  const dispatch = createEventDispatcher();

  export let open = false;
  export let offset = 4;

  export let matchWidth: boolean = false;
  export let placement: Placement = matchWidth ? 'bottom-start' : 'bottom';
  export let autoPlacement = false;
  export let resize = false;
  export let disableTransition = false;
  export let transition = disableTransition
    ? (node: HTMLElement, params: any) => null as TransitionConfig
    : slide;
  export let transitionParams: any = undefined; // TODO: Provider interface of all *Params (SlideParams, FlyParams, etc)
  export let explicitClose = false;
  export let moveFocus = true;

  let menuItemsEl: HTMLMenuElement;

  function onClick(e) {
    // Do not allow event to reach Popover's clickOutside
    e.stopPropagation();

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
  {autoPlacement}
  {offset}
  {matchWidth}
  {resize}
  {open}
  class={cls('bg-white rounded shadow border overflow-auto', $$props.class)}
  style={$$props.style}
  on:close
  let:close
>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <menu
    class="menu-items outline-none"
    bind:this={menuItemsEl}
    on:click={onClick}
    transition:transition={transitionParams}
    use:focusMove={{ disabled: !moveFocus }}
  >
    <slot {close} />
  </menu>
</Popover>
