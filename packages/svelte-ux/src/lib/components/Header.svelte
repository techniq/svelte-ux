<script lang="ts">
  import { cls } from '$lib/utils/styles';
  import Breadcrumb from './Breadcrumb.svelte';
  import { getComponentTheme } from './theme';

  export let title: string | string[] | null = null;
  export let subheading: string | string[] | null = null;

  const theme = getComponentTheme('Header');
</script>

<div class={cls('Header', 'flex items-center gap-4', theme.root, $$props.class)}>
  <slot name="avatar" />

  <div class="flex-1">
    <slot name="title">
      {#if title}
        {#if Array.isArray(title)}
          <Breadcrumb items={title} class="text-lg" />
        {:else}
          <div class="text-lg">{title}</div>
        {/if}
      {/if}
    </slot>

    <slot name="subheading">
      {#if subheading}
        {#if Array.isArray(subheading)}
          <Breadcrumb items={subheading} class="text-sm text-surface-content/50" />
        {:else}
          <div class="text-sm text-surface-content/50">{subheading}</div>
        {/if}
      {/if}
    </slot>
  </div>

  <slot name="actions" />
</div>
