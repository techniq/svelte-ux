<script lang="ts" generics="TItem">
  import { mdiChevronRight } from '@mdi/js';

  import Icon from './Icon.svelte';
  import { cls } from '@layerstack/tailwind';
  import { getComponentClasses } from './theme.js';

  export let items: TItem[] = [];
  export let divider: string | undefined = undefined;
  export let inline = false;
  let className: string | undefined = undefined;
  export { className as class };

  const settingsClasses = getComponentClasses('Breadcrumb');

  $: displayItems = items?.filter((x) => x != null) ?? [];
</script>

<div
  {...$$restProps}
  class={cls(
    'Breadcrumb',
    inline ? 'inline-flex' : 'flex',
    'items-center justify-start flex-wrap',
    settingsClasses.root,
    className
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
          <Icon data={mdiChevronRight} class="divider opacity-25" />
        {/if}
      </slot>
    {/if}
  {/each}
</div>
