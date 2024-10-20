<script lang="ts">
  import { cls } from '@layerstack/tailwind';
  import Breadcrumb from './Breadcrumb.svelte';
  import { getComponentClasses } from './theme.js';

  export let title: string | string[] | null = null;
  export let subheading: string | string[] | null = null;
  let className: string | undefined = undefined;
  export { className as class };

  export let classes: {
    root?: string;
    container?: string;
    title?: string;
    subheading?: string;
  } = {};

  const settingsClasses = getComponentClasses('Header');
</script>

<div
  class={cls('Header', 'flex items-center gap-4', settingsClasses.root, classes.root, className)}
>
  <slot name="avatar" />

  <div class={cls('flex-1', classes.container)}>
    <slot name="title">
      {#if title}
        {#if Array.isArray(title)}
          <Breadcrumb items={title} class="text-lg" />
        {:else}
          <div class={cls('text-lg', classes.title)}>{title}</div>
        {/if}
      {/if}
    </slot>

    <slot name="subheading">
      {#if subheading}
        {#if Array.isArray(subheading)}
          <Breadcrumb
            items={subheading}
            class={cls('text-sm text-surface-content/50', classes.subheading)}
          />
        {:else}
          <div class={cls('text-sm text-surface-content/50', classes.subheading)}>{subheading}</div>
        {/if}
      {/if}
    </slot>
  </div>

  <slot name="actions" />
</div>
