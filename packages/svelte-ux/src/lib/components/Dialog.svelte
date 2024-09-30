<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  // https://twitter.com/SvelteSociety/status/1306310173393186816
  // https://svelte.dev/repl/033e824fad0a4e34907666e7196caec4?version=3.25.1
  import { scale } from 'svelte/transition';
  import { quadIn } from 'svelte/easing';

  import { focusMove } from '@layerstack/svelte-actions/focus';
  import { portal as portalAction, type PortalOptions } from '@layerstack/svelte-actions';
  import { cls } from '@layerstack/tailwind';

  import Backdrop from './Backdrop.svelte';
  import ProgressCircle from './ProgressCircle.svelte';
  import Overlay from './Overlay.svelte';
  import { getComponentClasses } from './theme.js';

  const dispatch = createEventDispatcher<{
    close: null;
    closeAttempt: null;
    open: null;
  }>();

  export let open = false;
  export let portal: PortalOptions = true;
  export let persistent = false;
  export let loading: boolean | null = null;

  export let classes: {
    root?: string;
    dialog?: string;
    title?: string;
    actions?: string;
    backdrop?: string;
  } = {};
  const settingsClasses = getComponentClasses('Dialog');

  let dialogEl: HTMLDivElement;
  let actionsEl: HTMLDivElement;

  function onClick(e: MouseEvent) {
    try {
      // https://stackoverflow.com/questions/28900077/why-is-event-target-not-element-in-typescript
      if (!(e.target instanceof Element)) {
        return;
      }

      if (actionsEl == null) {
        // Dialog element not open and e.target no longer within trigger (ex. clear button pressed on TableSelectField)
      } else if (actionsEl.contains(e.target)) {
        // Close if action button clicked on (but not container).  Can be disabled with `e.stopPropagation()`
        if (e.target != actionsEl && !e.target.hasAttribute('slot')) {
          close();
        }
      }
    } catch (err) {
      console.error(err);
    }
  }

  function close(options?: { force?: boolean }) {
    const force = options?.force ?? false;
    if (open) {
      if (!persistent || force) {
        open = false;
      } else {
        // attempted close of persistent dialog
        dispatch('closeAttempt');
      }
    }
  }

  $: if (open) {
    dispatch('open');
  } else {
    dispatch('close');
  }
</script>

<!-- Separate `{#if}` block works around Svelte 5 regression: https://github.com/sveltejs/svelte/issues/12440  -->
{#if open}
  <Backdrop
    on:click={() => close()}
    on:mouseup={(e) => {
      // Do not allow event to reach Popover's on:mouseup (clickOutside)
      e.stopPropagation();
    }}
    class={cls('z-50', settingsClasses.backdrop, classes.backdrop)}
    fadeParams={{ duration: 150 }}
    {portal}
  />
{/if}

{#if open}
  <div
    class={cls(
      'Dialog',
      'fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center pointer-events-none',
      settingsClasses.root,
      classes.root
    )}
    on:click={onClick}
    on:keydown={(e) => {
      if (e.key === 'Escape') {
        // Do not allow event to reach Popover's on:keydown
        e.stopPropagation();
        close();
      }
    }}
    use:portalAction={portal}
    role="presentation"
  >
    <div
      class={cls(
        'dialog rounded bg-surface-100 elevation-4 overflow-y-auto pointer-events-auto relative outline-none',
        settingsClasses.dialog,
        classes.dialog,
        $$props.class
      )}
      style={$$props.style}
      in:scale|global={{ duration: 150, easing: quadIn }}
      out:scale={{ duration: 150, easing: quadIn }}
      on:introstart
      on:outrostart
      on:introend
      on:outroend
      bind:this={dialogEl}
      use:focusMove={{ restoreFocus: true }}
      role="dialog"
    >
      {#if loading}
        <Overlay center class="rounded">
          <ProgressCircle />
        </Overlay>
      {/if}

      <slot name="header" {open} {close}>
        {#if $$slots.title}
          <div
            class={cls('text-xl font-bold pt-4 pb-2 px-6', settingsClasses.title, classes.title)}
          >
            <slot name="title" {open} {close} />
          </div>
        {/if}
      </slot>

      <slot {open} {close} />

      {#if $$slots.actions}
        <div
          class={cls(
            'actions flex w-full justify-end p-2 bg-surface-content/5 border-t',
            settingsClasses.actions,
            classes.actions
          )}
          bind:this={actionsEl}
        >
          <slot name="actions" {open} {close} />
        </div>
      {/if}
    </div>
  </div>
{/if}
