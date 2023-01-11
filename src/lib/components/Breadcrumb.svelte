<script lang="ts">
  import { mdiChevronRight } from '@mdi/js';

  import Icon from './Icon.svelte';
  import { cls } from '../utils/styles';

  export let items = [];
  export let divider: string | undefined = undefined;
  export let inline = false;

  $: displayItems = items?.filter((x) => x != null) ?? [];
</script>

<div
  {...$$restProps}
  class={cls(
    inline ? 'inline-flex' : 'flex',
    'items-center justify-start flex-wrap',
    $$restProps.class
  )}
>
  {#each displayItems as item, index}
    <slot name="item" {item}>
      <div class="item">{item}</div>
    </slot>

    {#if index < displayItems.length - 1}
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
