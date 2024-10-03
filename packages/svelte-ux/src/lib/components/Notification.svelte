<script lang="ts">
  import { createEventDispatcher, type ComponentProps } from 'svelte';
  import { fly } from 'svelte/transition';
  import { quadIn } from 'svelte/easing';
  import { cls } from '@layerstack/tailwind';

  import { mdiClose } from '@mdi/js';

  import Button from './Button.svelte';
  import Icon from './Icon.svelte';

  const dispatch = createEventDispatcher();

  export let title: string | undefined = undefined;
  export let description: string | undefined = undefined;
  export let icon: string | undefined = undefined;
  export let actions: Record<string, Function> = {};

  export let open: boolean = true;
  export let closeIcon: boolean = false;
  export let variant: 'inline' | 'below' | 'split' = 'inline';

  export let classes: {
    root?: string;
    title?: string;
    description?: string;
    icon?: ComponentProps<Icon>['classes'];
    actions?: string;
  } = {};

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
    class={cls(
      'Notification rounded-lg border bg-surface-100 shadow-lg z-10',
      classes.root,
      $$props.class
    )}
    transition:fly={{ duration: 200, easing: quadIn, x: 100 }}
    on:outroend={() => dispatch('close')}
    on:click={onClick}
    on:keypress
    bind:this={notificationEl}
  >
    <div class="flex">
      <div class="flex-1 flex items-center gap-4 p-4">
        {#if icon || $$slots.icon}
          <slot name="icon">
            <Icon
              data={icon}
              class={cls(variant === 'below' && 'self-start mt-0.5')}
              classes={classes.icon}
            />
          </slot>
        {/if}

        <div class="flex-1 grid gap-1">
          {#if title || $$slots.title}
            <div class={cls('font-medium', classes.title)}>
              <slot name="title">
                {title}
              </slot>
            </div>
          {/if}

          {#if description || $$slots.description}
            <div class={cls('text-sm text-surface-content/50', classes.description)}>
              <slot name="description">
                {description}
              </slot>
            </div>
          {/if}

          {#if (actions || $$slots.actions) && variant === 'below'}
            <div bind:this={actionsEl} class={cls('mt-2 -ml-4 -mb-2', classes.actions)}>
              <slot name="actions">
                {#each Object.entries(actions) as [name, fn], i}
                  <Button color={i === 0 ? 'primary' : 'default'} on:click={() => fn()}
                    >{name}</Button
                  >
                {/each}
              </slot>
            </div>
          {/if}
        </div>

        {#if (actions || $$slots.actions) && variant === 'inline'}
          <div bind:this={actionsEl} class={cls('-my-2 -mr-2', classes.actions)}>
            <slot name="actions">
              {#each Object.entries(actions) as [name, fn], i}
                <Button color={i === 0 ? 'primary' : 'default'} on:click={() => fn()}>{name}</Button
                >
              {/each}
            </slot>
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

      {#if (actions || $$slots.actions) && variant === 'split'}
        <div bind:this={actionsEl} class={cls('grid border-l divide-y', classes.actions)}>
          <slot name="actions">
            {#each Object.entries(actions) as [name, fn], i}
              <Button
                color={i === 0 ? 'primary' : 'default'}
                class="rounded-none"
                on:click={() => fn()}>{name}</Button
              >
            {/each}
          </slot>
        </div>
      {/if}
    </div>
  </div>
{/if}
