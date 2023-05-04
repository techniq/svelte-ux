<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { fly } from 'svelte/transition';
  import { quadIn } from 'svelte/easing';

  import { mdiClose } from '@mdi/js';

  import Button from './Button.svelte';
  import Stack from './Stack.svelte';

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
        // console.log('clicked:actions', e.target, actionsEl);
        open = false;
      } else if (notificationEl?.contains(e.target)) {
        // console.log('clicked:within', e.target);
      } else {
        // console.log('clicked:other', e.target);
      }
    } catch (err) {
      console.error(err);
    }
  }
</script>

{#if open}
  <div
    class="notification rounded-lg border bg-white shadow-lg z-10"
    transition:fly|local={{ duration: 200, easing: quadIn, x: 100 }}
    on:outroend={() => dispatch('close')}
    on:click={onClick}
    bind:this={notificationEl}
  >
    <Stack horizontal>
      <Stack horizontal gap={16} class="p-4" items="center">
        {#if $$slots.icon}
          <slot name="icon" />
        {/if}

        <Stack vertical gap={2}>
          {#if $$slots.title}
            <div class="font-medium">
              <slot name="title" />
            </div>
          {/if}

          {#if $$slots.description}
            <div class="text-sm text-black/50">
              <slot name="description" />
            </div>
          {/if}

          {#if $$slots.actions && actions === 'below'}
            <div bind:this={actionsEl} class="mt-2 -ml-4 -mb-2">
              <slot name="actions" />
            </div>
          {/if}
        </Stack>

        {#if $$slots.actions && actions === 'right'}
          <div bind:this={actionsEl} class="-my-2 ml-8 -mr-2">
            <slot name="actions" />
          </div>
        {/if}

        {#if closeIcon}
          <Button
            icon={mdiClose}
            on:click={() => (open = false)}
            class="text-black/25 self-start"
          />
        {/if}
      </Stack>

      {#if $$slots.actions && actions === 'split'}
        <div bind:this={actionsEl}>
          <slot name="actions" />
        </div>
      {/if}
    </Stack>
  </div>
{/if}
