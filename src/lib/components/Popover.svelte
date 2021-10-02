<script context="module" lang="ts">
  export type PopoverPlacement =
    | 'top-start'
    | 'top'
    | 'top-end'
    | 'bottom-start'
    | 'bottom'
    | 'bottom-end'
    | 'left-start'
    | 'left'
    | 'left-end'
    | 'right-start'
    | 'right'
    | 'right-end';

  export type PopoverOrigin = {
    vertical: 'top' | 'center' | 'bottom' | number;
    horizontal: 'left' | 'center' | 'right' | number;
  };

  function getAnchorOrigin(placement: PopoverPlacement): PopoverOrigin {
    switch (placement) {
      case 'top-start':
        return { vertical: 'top', horizontal: 'left' };
      case 'top':
        return { vertical: 'top', horizontal: 'center' };
      case 'top-end':
        return { vertical: 'top', horizontal: 'right' };
      case 'bottom-start':
        return { vertical: 'bottom', horizontal: 'left' };
      case 'bottom':
        return { vertical: 'bottom', horizontal: 'center' };
      case 'bottom-end':
        return { vertical: 'bottom', horizontal: 'right' };
      case 'left-start':
        return { vertical: 'top', horizontal: 'left' };
      case 'left':
        return { vertical: 'center', horizontal: 'left' };
      case 'left-end':
        return { vertical: 'bottom', horizontal: 'left' };
      case 'right-start':
        return { vertical: 'top', horizontal: 'right' };
      case 'right':
        return { vertical: 'center', horizontal: 'right' };
      case 'right-end':
        return { vertical: 'bottom', horizontal: 'right' };
    }
  }

  function getPopoverOrigin(placement: PopoverPlacement): PopoverOrigin {
    switch (placement) {
      case 'top-start':
        return { vertical: 'bottom', horizontal: 'left' };
      case 'top':
        return { vertical: 'bottom', horizontal: 'center' };
      case 'top-end':
        return { vertical: 'bottom', horizontal: 'right' };
      case 'bottom-start':
        return { vertical: 'top', horizontal: 'left' };
      case 'bottom':
        return { vertical: 'top', horizontal: 'center' };
      case 'bottom-end':
        return { vertical: 'top', horizontal: 'right' };
      case 'left-start':
        return { vertical: 'top', horizontal: 'right' };
      case 'left':
        return { vertical: 'center', horizontal: 'right' };
      case 'left-end':
        return { vertical: 'bottom', horizontal: 'right' };
      case 'right-start':
        return { vertical: 'top', horizontal: 'left' };
      case 'right':
        return { vertical: 'center', horizontal: 'left' };
      case 'right-end':
        return { vertical: 'bottom', horizontal: 'left' };
    }
  }
</script>

<script lang="ts">
  import { createEventDispatcher, tick } from 'svelte';

  import { getScrollParent } from '../utils/dom';
  import { objectToString } from '../utils/styles';

  const dispatch = createEventDispatcher();

  export let placement: PopoverPlacement = 'bottom';

  export let anchorOrigin: PopoverOrigin = getAnchorOrigin(placement);
  export let popoverOrigin: PopoverOrigin = getPopoverOrigin(placement);

  export let open: boolean = false;
  export let marginThreshold = 8;
  export let offset = 0;

  /**
   * Set width of popover element the same as anchor element
   */
  export let matchWidth: boolean = false;

  export let anchorEl: HTMLElement = undefined;
  let popoverEl: HTMLElement;

  let popoverStyles = {
    top: null,
    left: null,
    transformOrigin: null,
  };
  let width = matchWidth && anchorEl ? `${anchorEl.getBoundingClientRect().width}px` : 'initial';

  function getOffsetTop(rect: DOMRect, vertical: PopoverOrigin['vertical']) {
    if (typeof vertical === 'number') {
      return vertical;
    } else if (vertical === 'top') {
      return 0;
    } else if (vertical === 'center') {
      return rect.height / 2;
    } else if (vertical === 'bottom') {
      return rect.height;
    }

    throw new Error(`unhandled origin: ${vertical}`);
  }

  function getOffsetLeft(rect: DOMRect, horizontal: PopoverOrigin['horizontal']) {
    if (typeof horizontal === 'number') {
      return horizontal;
    } else if (horizontal === 'left') {
      return 0;
    } else if (horizontal === 'center') {
      return rect.width / 2;
    } else if (horizontal === 'right') {
      return rect.width;
    }

    throw new Error(`unhandled origin: ${horizontal}`);
  }

  function getAnchorOffset(anchorRect: DOMRect) {
    let transformParent = { top: 0, left: 0 };

    // `position: fixed` is relative to the viewport or nearest transformed parent - see: https://stackoverflow.com/a/38796408/191902
    // Remove transform parent's offset (containing block for all descendants)
    let parent = anchorEl.parentElement;
    while (parent) {
      const transform = getComputedStyle(parent).transform;

      if (transform !== 'none') {
        // console.log('transform parent detected:', parent);
        transformParent = {
          top: parent.offsetTop,
          left: parent.offsetLeft,
        };
        parent = null;
      } else {
        parent = parent.parentElement;
      }
    }

    return {
      top: anchorRect.top + getOffsetTop(anchorRect, anchorOrigin.vertical) - transformParent.top,
      left:
        anchorRect.left + getOffsetLeft(anchorRect, anchorOrigin.horizontal) - transformParent.left,
    };
  }

  function getPopoverOffset(popoverRect: DOMRect) {
    const topOffset = placement.startsWith('top')
      ? offset
      : placement.startsWith('bottom')
      ? -offset
      : 0;
    const leftOffset = placement.startsWith('left')
      ? offset
      : placement.startsWith('right')
      ? -offset
      : 0;

    return {
      top: getOffsetTop(popoverRect, popoverOrigin.vertical) + topOffset,
      left: getOffsetLeft(popoverRect, popoverOrigin.horizontal) + leftOffset,
    };
  }

  function getTransformOriginValue(transformOrigin: PopoverOrigin) {
    return [transformOrigin.horizontal, transformOrigin.vertical]
      .map((n) => (typeof n === 'number' ? `${n}px` : n))
      .join(' ');
  }

  function getPosition(anchorRect: DOMRect, popoverRect: DOMRect) {
    const anchorOffset = getAnchorOffset(anchorRect);
    const popoverOffset = getPopoverOffset(popoverRect);

    // Calculate element positioning
    let top = anchorOffset.top - popoverOffset.top;
    let left = anchorOffset.left - popoverOffset.left;
    const bottom = top + popoverRect.height;
    const right = left + popoverRect.width;

    // Window thresholds taking required margin into account
    const heightThreshold = window.innerHeight - marginThreshold;
    const widthThreshold = window.innerWidth - marginThreshold;

    // Check if the vertical axis needs shifting
    if (top < marginThreshold) {
      const diff = top - marginThreshold;
      top -= diff;
      popoverOffset.top += diff;
    } else if (bottom > heightThreshold) {
      const diff = bottom - heightThreshold;
      top -= diff;
      popoverOffset.top += diff;
    }

    // Check if the horizontal axis needs shifting
    if (left < marginThreshold) {
      const diff = left - marginThreshold;
      left -= diff;
      popoverOffset.left += diff;
    } else if (right > widthThreshold) {
      const diff = right - widthThreshold;
      left -= diff;
      popoverOffset.left += diff;
    }

    return {
      top: Math.round(top),
      left: Math.round(left),
      transformOrigin: getTransformOriginValue(popoverOrigin),
    };
  }

  function setPosition() {
    if (!open || !anchorEl || !popoverEl) {
      return;
    }

    const anchorRect = anchorEl.getBoundingClientRect();

    const newPopoverStyles = {
      top: null,
      left: null,
      transformOrigin: null,
    };

    const popoverRect = popoverEl.getBoundingClientRect();

    // If anchor is scrolled offscreen, close popover
    if (anchorRect.top < -anchorRect.height || anchorRect.top > window.innerHeight) {
      close('overflow');
      return;
    }

    const { top, left, transformOrigin } = getPosition(anchorRect, popoverRect);

    if (top !== null) {
      newPopoverStyles.top = `${top}px`;
    }
    if (left !== null) {
      newPopoverStyles.left = `${left}px`;
    }
    newPopoverStyles.transformOrigin = transformOrigin;

    popoverStyles = newPopoverStyles;
  }

  $: {
    anchorEl = anchorEl ?? popoverEl?.parentElement;

    if (matchWidth && anchorEl) {
      const anchorRect = anchorEl.getBoundingClientRect();
      width = `${anchorRect.width}px`;
    }

    // Update position after width has been set in the DOM
    tick().then(() => {
      setPosition();
    });
  }

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

  // function onClickOutside(e: Event & { target: EventTarget | null }) {
  function onClickOutside(e: any) {
    if (open && anchorEl && !anchorEl.contains(e.target)) {
      e.stopPropagation();
      close('clickOutside');
    }
  }

  // Wait for popover element to be displayed, then attach scroll event listener to update position as scrolled within container
  let scrollParent;
  $: {
    if (popoverEl) {
      // Popover shown (mounted)
      scrollParent = getScrollParent(popoverEl);
      scrollParent.addEventListener('scroll', setPosition);
    } else if (scrollParent) {
      // Popover Hidden (unmounted)
      scrollParent.removeEventListener('scroll', setPosition);
    }
  }
</script>

<svelte:window
  on:resize|passive={() => setPosition()}
  on:keydown|capture={onKeydown}
  on:click|capture={onClickOutside}
/>

{#if open}
  <div
    class="popover fixed z-50 outline-none {$$props.class ?? ''}"
    style="width: {width}; {objectToString(popoverStyles)} {$$props.style ?? ''}"
    tabindex="-1"
    bind:this={popoverEl}
  >
    <slot {setPosition} />
  </div>
{/if}
