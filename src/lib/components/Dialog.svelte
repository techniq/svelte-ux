<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  // https://twitter.com/SvelteSociety/status/1306310173393186816
  // https://svelte.dev/repl/033e824fad0a4e34907666e7196caec4?version=3.25.1
  import { scale } from 'svelte/transition';
  import { quadIn } from 'svelte/easing';

  import { focusMove } from '../actions/focus';
  import portalAction from '../actions/portal';
  import { cls } from '../utils/styles';

  import Backdrop from './Backdrop.svelte';
  import CircularProgress from './CircularProgress.svelte';
  import Overlay from './Overlay.svelte';

  const dispatch = createEventDispatcher();

  export let open = false;
  export let portal = true;
  export let persistent = false;
  export let loading: boolean | null = null;

  export let classes: {
    root?: string;
    dialog?: string;
    title?: string;
    actions?: string;
  } = {};

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
        // console.log('clicked:actions', e.target, actionsEl);
        if (e.target != actionsEl && !e.target.hasAttribute('slot')) open = false;
      } else if (dialogEl.contains(e.target)) {
        // console.log('clicked:within', e.target);
      } else {
        // console.log('clicked:other', e.target);
      }
    } catch (err) {
      console.error(err);
    }
  }

  $: if (open === false) {
    dispatch('close', { open });
  }
</script>

{#if open}
  <Backdrop
    on:mouseup={(e) => {
      // Do not allow event to reach Popover's on:mouseup (clickOutside)
      e.stopPropagation();
      if (!persistent) {
        open = false;
      }
    }}
    class="z-50"
    fadeParams={{ duration: 150 }}
    {portal}
  />

  <div
    class={cls(
      'fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center pointer-events-none',
      classes.root
    )}
    on:click={onClick}
    on:mouseup={(e) => {
      // Do not allow event to reach Popover's on:mouseup (clickOutside)
      e.stopPropagation();
    }}
    on:keydown={(e) => {
      // Do not allow event to reach Popover's on:keydown
      e.stopPropagation();
      if (e.key === 'Escape' && !persistent) {
        open = false;
      }
    }}
    use:portalAction={{ enabled: portal }}
  >
    <div
      class={cls(
        'dialog rounded bg-white elevation-4 overflow-y-auto pointer-events-auto relative outline-none',
        classes.dialog,
        $$props.class
      )}
      style={$$props.style}
      in:scale={{ duration: 150, easing: quadIn }}
      out:scale|local={{ duration: 150, easing: quadIn }}
      on:introstart
      on:outrostart
      on:introend
      on:outroend
      bind:this={dialogEl}
      use:focusMove={{ restoreFocus: true }}
    >
      {#if loading}
        <Overlay center class="rounded">
          <CircularProgress />
        </Overlay>
      {/if}

      <slot name="header">
        {#if $$slots.title}
          <div class={cls('text-xl font-bold pt-4 pb-2 px-6', classes.title)}>
            <slot name="title" />
          </div>
        {/if}
      </slot>

      <slot />

      <div
        class={cls('actions flex w-full justify-end p-2 bg-black/5 border-t', classes.actions)}
        bind:this={actionsEl}
      >
        <slot name="actions" />
      </div>
    </div>
  </div>
{/if}
