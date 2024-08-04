<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { fly } from 'svelte/transition';
  import { quadIn } from 'svelte/easing';

  import { mdiClose } from '@mdi/js';

  import Button from './Button.svelte';

  const dispatch = createEventDispatcher();

  export let open: boolean = true;
  export let actions: 'below' | 'right' | 'split' = 'below';
  export let closeIcon: boolean = false;

  let notificationEl: HTMLDivElement;
  let actionsEl: HTMLDivElement;

  function onClick(e: MouseEvent) {
    try {
      // https://stackoverflow.com/questions/28900077/why-is-event-target-not-element-in-typescript
      if (!(e.target instanceof Element)) {
        console.error('Unexpected target');
        return;
      }

      if (e.target != actionsEl && actionsEl?.contains(e.target)) {
        // Close if action button clicked on (but not container).  Can be disabled with `e.stopPropagation()`
        open = false;
      }
    } catch (err) {
      console.error(err);
    }
  }
</script>

{#if open}
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    class="Notification rounded-lg border bg-surface-100 shadow-lg z-10"
    transition:fly={{ duration: 200, easing: quadIn, x: 100 }}
    on:outroend={() => dispatch('close')}
    on:click={onClick}
    on:keypress
    bind:this={notificationEl}
  >
    <div class="grid grid-flow-col">
      <div class="grid grid-flow-col items-center gap-4 p-4">
        {#if $$slots.icon}
          <slot name="icon" />
        {/if}

        <div class="grid gap-1">
          {#if $$slots.title}
            <div class="font-medium">
              <slot name="title" />
            </div>
          {/if}

          {#if $$slots.description}
            <div class="text-sm text-surface-content/50">
              <slot name="description" />
            </div>
          {/if}

          {#if $$slots.actions && actions === 'below'}
            <div bind:this={actionsEl} class="mt-2 -ml-4 -mb-2">
              <slot name="actions" />
            </div>
          {/if}
        </div>

        {#if $$slots.actions && actions === 'right'}
          <div bind:this={actionsEl} class="-my-2 ml-8 -mr-2">
            <slot name="actions" />
          </div>
        {/if}

        {#if closeIcon}
          <Button
            icon={mdiClose}
            on:click={() => (open = false)}
            class="text-surface-content/25 self-start"
          />
        {/if}
      </div>

      {#if $$slots.actions && actions === 'split'}
        <div bind:this={actionsEl}>
          <slot name="actions" />
        </div>
      {/if}
    </div>
  </div>
{/if}
