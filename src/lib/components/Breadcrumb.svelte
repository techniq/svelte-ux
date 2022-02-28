<script lang="ts">
  import clsx from 'clsx';
  import { mdiChevronRight } from '@mdi/js';

  import Icon from './Icon.svelte';

  export let items = [];
  export let divider: string | undefined = undefined;
  export let inline = false;
</script>

<div
  {...$$restProps}
  class={clsx(
    inline ? 'inline-flex' : 'flex',
    'items-center justify-start flex-wrap',
    $$restProps.class
  )}
>
  {#each items ?? [] as item, index}
    <slot name="item" {item}>
      <div class="item">{item}</div>
    </slot>

    {#if index < items.length - 1}
      <slot name="divider">
        {#if divider}
          <div class="divider opacity-25">{divider}</div>
        {:else}
          <Icon path={mdiChevronRight} class="divider opacity-25" />
        {/if}
      </slot>
    {/if}
  {/each}
</div>
