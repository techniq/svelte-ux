<script lang="ts">
  import { type ComponentProps, type Snippet } from 'svelte';
  import { slide } from 'svelte/transition';
  import type { TransitionConfig } from 'svelte/transition';
  import type { Placement } from '@floating-ui/dom';

  import { focusMove } from '../actions/focus.js';
  import { cls } from '../utils/styles.js';

  import Popover from './Popover.svelte';
  import type { TransitionParams } from '../types/typeHelpers.js';
  import { getComponentSettings } from './settings.js';

  const { classes: settingsClasses, defaults } = getComponentSettings('Menu');

  interface Props {
    open?: boolean;
    offset?: number;
    matchWidth?: boolean;
    placement?: Placement;
    autoPlacement?: boolean;
    resize?: ComponentProps<typeof Popover>['resize'];
    disableTransition?: boolean;
    transition?: (node: HTMLElement, params: TransitionParams) => TransitionConfig;
    transitionParams?: TransitionParams;
    explicitClose?: boolean;
    moveFocus?: boolean;
    classes?: {
      root?: string;
      menu?: string;
    };
    menuItemsEl?: HTMLMenuElement;
    class?: string;
    style?: string;
    onClose?: (value: string) => void;
    children?: Snippet<[{ close: () => void }]>;
  }

  let {
    open = $bindable(false),
    offset = 4,
    matchWidth = false,
    placement = matchWidth ? 'bottom-start' : 'bottom',
    autoPlacement = false,
    resize = false,
    disableTransition = false,
    transition,
    transitionParams,
    explicitClose = false,
    moveFocus = true,
    classes = {},
    menuItemsEl = $bindable(),
    class: className,
    style,
    onClose,
    children: childrenRender,
  }: Props = $props();

  function onClick(e: MouseEvent) {
    try {
      if (e.target === menuItemsEl) {
        // Clicked within menu but outside of any items
      } else if (!explicitClose) {
        open = false;
        onClose?.('item');
      }
    } catch (err) {
      console.error(err);
    }
  }
  let resolvedTransition = $derived(
    transition ??
      defaults.transition ??
      (disableTransition
        ? (node: HTMLElement, params: TransitionParams) => ({}) as TransitionConfig
        : slide)
  );
  let resolvedTransitionParams = $derived(transitionParams ?? defaults.transitionParams ?? {});
</script>

<Popover
  {placement}
  {autoPlacement}
  {offset}
  {matchWidth}
  {resize}
  {open}
  class={cls(
    'Menu',
    'bg-surface-100 rounded shadow border overflow-auto',
    settingsClasses.root,
    classes.root,
    className
  )}
  {style}
  {onClose}
>
  {#snippet children({ close })}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
    <menu
      class={cls('menu-items outline-none max-h-screen', settingsClasses.menu, classes.menu)}
      bind:this={menuItemsEl}
      onclick={onClick}
      onmouseup={(e) => {
        // Do not allow event to reach Popover's onmouseup (clickOutside)
        e.stopPropagation();
      }}
      transition:resolvedTransition={resolvedTransitionParams}
      use:focusMove={{ disabled: !moveFocus }}
    >
      {@render childrenRender?.({ close })}
    </menu>
  {/snippet}
</Popover>
