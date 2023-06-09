<script lang="ts">
  import { mdiChevronRight } from '@mdi/js';

  import Icon from './Icon.svelte';
  import { cls } from '../utils/styles';
  import { getComponentTheme } from './theme';

  export let items = [];
  export let divider: string | undefined = undefined;
  export let inline = false;

  const theme = getComponentTheme('Breadcrumb');

  $: displayItems = items?.filter((x) => x != null) ?? [];
</script>

<div
  {...$$restProps}
  class={cls(
    'Breadcrumb',
    inline ? 'inline-flex' : 'flex',
    'items-center justify-start flex-wrap',
    theme.root,
    $$props.class
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
