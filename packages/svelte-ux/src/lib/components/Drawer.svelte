<script lang="ts">
  import { fly } from 'svelte/transition';

  import Backdrop from './Backdrop.svelte';
  import ProgressCircle from './ProgressCircle.svelte';
  import Overlay from './Overlay.svelte';

  import { focusMove } from '../actions/focus.js';
  import { portal as portalAction, type PortalOptions } from '../actions/portal.js';
  import { cls } from '../utils/styles.js';
  import { getComponentClasses } from './theme.js';
  import type { Snippet } from 'svelte';
  import type { SvelteHTMLElements } from 'svelte/elements';

  interface Props {
    open?: boolean;
    portal?: PortalOptions;
    persistent?: boolean;
    loading?: boolean | null;
    placement?: 'top' | 'bottom' | 'left' | 'right';
    classes?: {
      root?: string;
      backdrop?: string;
      actions?: string;
    };
    class?: string;
    style?: string;
    onintrostart?: SvelteHTMLElements['div']['onintrostart'];
    onoutrostart?: SvelteHTMLElements['div']['onoutrostart'];
    onintroend?: SvelteHTMLElements['div']['onintroend'];
    onoutroend?: SvelteHTMLElements['div']['onoutroend'];
    onChange?: (open: boolean) => void;
    onClose?: () => void;
    onCloseAttempt?: () => void;
    onOpen?: () => void;
    children?: Snippet<[{ open: boolean, close: typeof close }]>;
    actions?: Snippet<[{ open: boolean, close: typeof close }]>;
  }

  let {
    open = $bindable(true),
    portal = true,
    persistent = false,
    loading,
    placement = 'right',
    classes = {},
    class: className,
    style,
    onintroend,
    onintrostart,
    onoutroend,
    onoutrostart,
    onChange,
    onClose,
    onCloseAttempt,
    onOpen,
    children,
    actions,
  }: Props = $props();
  const settingsClasses = getComponentClasses('Drawer');

  $effect(() => {
    onChange?.(open);
  });

  function close(options?: { force?: boolean }) {
    const force = options?.force ?? false;
    if (open) {
      if (!persistent || force) {
        open = false;
      } else {
        // attempted close of persistent dialog
        onCloseAttempt?.();
      }
    }
  }

  $effect(() => {
    if (open) {
      onOpen?.();
    } else {
      onClose?.();
    }
  });
</script>

<!-- Separate `{#if}` block works around Svelte 5 regression: https://github.com/sveltejs/svelte/issues/12440  -->
{#if open}
  <Backdrop
    onClick={(e) => {
      close();
    }}
    onMouseUp={(e) => {
      // Do not allow event to reach Popover's onmouseup (clickOutside)
      e.stopPropagation();
    }}
    class={cls('z-50', settingsClasses.backdrop, classes.backdrop)}
    {portal}
  />
{/if}

{#if open}
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <div
    class={cls(
      'Drawer',
      'bg-surface-100 fixed overflow-auto transform z-50 outline-none',
      {
        'h-full': ['left', 'right'].includes(placement),
        'w-full': ['top', 'bottom'].includes(placement),
        'top-0': ['top', 'left', 'right'].includes(placement),
        'bottom-0': placement === 'bottom',
        'left-0': ['top', 'top', 'bottom'].includes(placement),
        'right-0': placement === 'right',
      },
      settingsClasses.root,
      classes.root,
      className
    )}
    {style}
    in:fly|global={{
      x: placement === 'left' ? '-100%' : placement === 'right' ? '100%' : 0,
      y: placement === 'top' ? '-100%' : placement === 'bottom' ? '100%' : 0,
    }}
    out:fly={{
      x: placement === 'left' ? '-100%' : placement === 'right' ? '100%' : 0,
      y: placement === 'top' ? '-100%' : placement === 'bottom' ? '100%' : 0,
    }}
    {onintrostart}
    {onoutrostart}
    {onintroend}
    {onoutroend}
    onkeydown={(e) => {
      if (e.key === 'Escape') {
        // Do not allow event to reach Popover's onkeydown
        e.stopPropagation();

        close();
      }
    }}
    use:portalAction={portal}
    use:focusMove={{ restoreFocus: true }}
    role="dialog"
  >
    {#if loading}
      <Overlay center class="rounded">
        <ProgressCircle />
      </Overlay>
    {/if}

    {@render children?.({ open, close })}

    {#if actions}
      <div
        class={cls(
          'actions fixed bottom-0 w-full flex justify-center bg-surface-content/5 p-1 border-t',
          settingsClasses.actions,
          classes.actions
        )}
      >
        {@render actions?.({ open, close })}
      </div>
    {/if}
  </div>
{/if}
