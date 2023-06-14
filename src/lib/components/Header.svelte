<script lang="ts">
  import { cls } from '$lib/utils/styles';
  import Breadcrumb from './Breadcrumb.svelte';
  import Stack from './Stack.svelte';
  import { getComponentTheme } from './theme';

  export let title: string | string[] | null = null;
  export let subheading: string | string[] | null = null;

  const theme = getComponentTheme('Header');
</script>

<Stack
  horizontal
  template="{$$slots.avatar ? 'auto' : ''} 1fr {$$slots.actions ? 'auto' : ''}"
  gap={16}
  items="center"
  class={cls('Header', theme.root, $$props.class)}
>
  <slot name="avatar" />

  <div>
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
          <Breadcrumb items={subheading} class="text-sm text-black/50" />
        {:else}
          <div class="text-sm text-black/50">{subheading}</div>
        {/if}
      {/if}
    </slot>
  </div>

  <slot name="actions" />
</Stack>
