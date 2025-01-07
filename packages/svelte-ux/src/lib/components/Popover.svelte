<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { OffsetOptions, Placement } from '@floating-ui/dom';

  import { popover, type PopoverOptions } from '../actions/popover.js';
  import { cls } from '../utils/styles.js';
  import { getComponentClasses } from './theme.js';

  interface Props {
    open?: boolean;
    placement?: Placement;
    class?: string;
    style?: string;
    /**
     * Place popover based on which side of the viewport has more space
     */
    autoPlacement?: boolean;
    /**
     * Provide element to anchor.  If not provided, uses direct parent of Popover
     */
    anchorEl?: Element | HTMLElement;
    /**
     * Offset between anchor and popover
     */
    offset?: OffsetOptions;
    /**
     * Shift popover if within threshold of window
     */
    padding?: number;
    /**
     * Set width of popover element the same as anchor element
     */
    matchWidth?: boolean;
    /**
     * Set max-height of popover element to the remaining height from anchor element to bottom of viewport
     */
    resize?: PopoverOptions['resize'];
    onClose?: (value: string) => void;
    children?: Snippet<[{ close: () => void }]>;
  }

  let {
    open = $bindable(false),
    placement,
    class: className,
    style,
    autoPlacement = false,
    anchorEl,
    offset = 0,
    padding = 4,
    matchWidth = false,
    resize = false,
    onClose,
    children,
  }: Props = $props();

  const settingsClasses = getComponentClasses('Popover');

  function close(reason: string = 'unknown') {
    if (open) {
      onClose?.(reason);
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

<svelte:window onkeydown={onKeydown} />

{#if open}
  <!-- @ts-expect-error -->
  <div
    class={cls('Popover absolute z-50 outline-none', settingsClasses.root, className)}
    {style}
    tabindex="-1"
    use:popover={{ anchorEl, placement, autoPlacement, offset, padding, matchWidth, resize }}
    onclickOutside={(e) => {
      e.stopPropagation();
      close('clickOutside');
    }}
  >
    {@render children?.({ close: () => close() })}
  </div>
{/if}
