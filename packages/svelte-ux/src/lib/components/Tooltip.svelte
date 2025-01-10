<script module lang="ts">
  let lastShown: Date | null = null;
</script>

<script lang="ts">
  import { fly } from 'svelte/transition';
  import type { OffsetOptions, Placement } from '@floating-ui/dom';

  import Popover from './Popover.svelte';
  import { cls } from '../utils/styles.js';
  import { getComponentClasses } from './theme.js';
  import type { ComponentProps, Snippet } from 'svelte';

  interface Props {
    title?: string | Snippet;
    open?: boolean;
    offset?: OffsetOptions;
    delay?: number;
    underline?: boolean;
    cursor?: boolean;
    enabled?: boolean;
    // Popover props
    placement?: Placement;
    autoPlacement?: boolean;
    matchWidth?: boolean;
    classes?: {
      root?: string;
      popover?: string;
      title?: string;
      content?: string;
    };
    children?: Snippet;
  }

  let {
    title = '',
    open = $bindable(false),
    offset = 0,
    delay = 500,
    underline = false,
    cursor = false,
    enabled = true,
    placement = 'bottom',
    autoPlacement = false,
    matchWidth = false,
    classes = {},
    class: className,
    children,
    ...restProps
  }: Props & Omit<ComponentProps<typeof Popover>, keyof Props> = $props();

  const settingsClasses = getComponentClasses('Tooltip');

  let containerEl = $state() as HTMLDivElement;

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

{#if enabled && title}
  <Popover
    anchorEl={containerEl?.firstElementChild ?? undefined}
    {placement}
    {autoPlacement}
    {offset}
    {matchWidth}
    {open}
    class={cls('Tooltip pointer-events-none', settingsClasses.popover, classes.popover)}
    {...restProps}
  >
    {#if typeof title === 'function'}
      {@render title()}
    {:else}
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
    {/if}
  </Popover>
{/if}

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class={cls('contents', settingsClasses.content, classes.content)}
  onmouseenter={showTooltip}
  onmouseleave={hideTooltip}
  onfocusin={onFocusIn}
  onfocusout={hideTooltip}
  onclick={hideTooltip}
  bind:this={containerEl}
>
  {#if className || underline || cursor}
    <span
      class={cls(
        title && underline && 'border-b border-dotted',
        title && cursor && 'cursor-help',
        settingsClasses.root,
        classes.root,
        className
      )}
    >
      {@render children?.()}
    </span>
  {:else}
    {@render children?.()}
  {/if}
</div>
