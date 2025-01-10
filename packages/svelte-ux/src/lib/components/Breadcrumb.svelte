<script lang="ts" generics="TItem">
  import { mdiChevronRight } from '@mdi/js';

  import Icon from './Icon.svelte';
  import { cls } from '../utils/styles.js';
  import { getComponentClasses } from './theme.js';
  import type { SvelteHTMLElements } from 'svelte/elements';
  import type { Snippet } from 'svelte';

  interface Props {
    items?: TItem[];
    divider?: string | Snippet;
    inline?: boolean;
    item?: Snippet<[{ item: TItem }]>;
  }

  let {
    items = [],
    divider,
    inline = false,
    class: className,
    item,
    ...restProps
  }: Props & Omit<SvelteHTMLElements['div'], keyof Props> = $props();

  const settingsClasses = getComponentClasses('Breadcrumb');

  let displayItems = $derived(items?.filter((x) => x != null) ?? []);
</script>

<div
  {...restProps}
  class={cls(
    'Breadcrumb',
    inline ? 'inline-flex' : 'flex',
    'items-center justify-start flex-wrap',
    settingsClasses.root,
    className
  )}
>
  {#each displayItems as displayItem, index}
    {#if item}
      {@render item({ item: displayItem })}
    {:else}
      <div class="item">{displayItem}</div>
    {/if}

    {#if index < displayItems.length - 1}
      {#if typeof divider === 'function'}
        {@render divider()}
      {:else if divider}
        <div class="divider opacity-25">{divider}</div>
      {:else}
        <Icon data={mdiChevronRight} class="divider opacity-25" />
      {/if}
    {/if}
  {/each}
</div>
