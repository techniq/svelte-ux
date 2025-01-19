<script context="module" lang="ts">
  let lastShown: Date | null = null;
</script>

<script lang="ts">
  import { fly } from 'svelte/transition';
  import type { OffsetOptions, Placement } from '@floating-ui/dom';

  import Popover from './Popover.svelte';
  import { cls } from '@layerstack/tailwind';
  import { getComponentClasses } from './theme.js';

  export let title = '';
  export let open = false;
  export let offset: OffsetOptions = 0;
  export let delay = 500;
  export let underline = false;
  export let cursor = false;
  export let enabled = true;

  // Popover props
  export let placement: Placement = 'bottom';
  export let autoPlacement = false;
  export let matchWidth: boolean = false;

  export let classes: {
    root?: string;
    popover?: string;
    title?: string;
    content?: string;
  } = {};
  const settingsClasses = getComponentClasses('Tooltip');

  $: hasTitle = title || $$slots.title;

  let containerEl: HTMLDivElement;

  let timeoutId: ReturnType<typeof setTimeout>;

  function showTooltip(e: MouseEvent | FocusEvent) {
    if (
      delay === 0 ||
      e instanceof FocusEvent ||
      new Date().valueOf() - (lastShown?.valueOf() ?? 0) < 500
    ) {
      // If no delay, focus event, or any tooltips shown in the last 1/2 second, show immediately
      lastShown = new Date();
      open = true;
    } else {
      timeoutId = setTimeout(() => {
        lastShown = new Date();
        open = true;
      }, delay);
    }
  }
  function hideTooltip() {
    clearTimeout(timeoutId);
    if (open) {
      lastShown = new Date();
    }
    open = false;
  }

  function onFocusIn(e: FocusEvent) {
    // TODO: Is there a better way to differentiate between focus from click vs tab?
    if ((e.target as Element)?.parentElement?.querySelector(':focus-visible')) {
      // tab focused
      showTooltip(e);
    } else {
      // click focused
      hideTooltip();
      lastShown = null;
    }
  }
</script>

{#if enabled && (title || $$slots.title)}
  <Popover
    anchorEl={containerEl?.firstElementChild ?? undefined}
    {placement}
    {autoPlacement}
    {offset}
    {matchWidth}
    {open}
    class={cls('Tooltip pointer-events-none', settingsClasses.popover, classes.popover)}
    {...$$restProps}
  >
    <slot name="title">
      <div
        class={cls(
          'text-xs text-surface-100 bg-surface-content px-2 py-1 rounded whitespace-nowrap',
          settingsClasses.title,
          classes.title
        )}
        transition:fly={{
          x: placement === 'left' ? 6 : placement === 'right' ? -6 : 0,
          y: placement === 'top' ? 6 : placement === 'bottom' ? -6 : 0,
          duration: 300,
        }}
      >
        {title}
      </div>
    </slot>
  </Popover>
{/if}

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  class={cls('contents', settingsClasses.content, classes.content)}
  on:mouseenter={showTooltip}
  on:mouseleave={hideTooltip}
  on:focusin={onFocusIn}
  on:focusout={hideTooltip}
  on:click={hideTooltip}
  bind:this={containerEl}
>
  {#if $$props.class || underline || cursor}
    <span
      class={cls(
        hasTitle && underline && 'border-b border-dotted',
        hasTitle && cursor && 'cursor-help',
        settingsClasses.root,
        classes.root,
        $$props.class
      )}
    >
      <slot />
    </span>
  {:else}
    <slot />
  {/if}
</div>
