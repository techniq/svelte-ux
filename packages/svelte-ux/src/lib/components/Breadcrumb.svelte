<script lang="ts" generics="TItem">
  import { cls } from '@layerstack/tailwind';
  import { getComponentClasses } from './theme.js';
  import { getSettings } from './settings.js';

  export let items: TItem[] = [];
  export let divider: string | undefined = undefined;
  export let inline = false;
  let className: string | undefined = undefined;
  export { className as class };

  const { icons } = getSettings();
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
          {@const Icon = icons.chevronRight}
          <Icon class="divider opacity-25" />
        {/if}
      </slot>
    {/if}
  {/each}
</div>
