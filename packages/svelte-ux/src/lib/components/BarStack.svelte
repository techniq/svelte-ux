<script lang="ts">
  import { sum } from 'd3-array';

  import type { Snippet } from 'svelte';
  import { cls } from '../utils/styles.js';
  import { getComponentClasses } from './index.js';

  interface Props {
    data: {
      label: string;
      value: number;
      color?: string;
      style?: string;
      classes?: {
        root?: string;
        bar?: string;
      };
    }[];
    total?: number;
    classes?: {
      root?: string;
      item?: string;
    };
    class?: string;
    onItemClick?: (value: (typeof data)[number]) => void;
    bar?: Snippet<[{ item: (typeof data)[number]; total: number }]>;
    children?: Snippet<[{ item: (typeof data)[number]; total: number }]>;
  }

  let { data, total, classes = {}, class: className, onItemClick, children, bar }: Props = $props();
  const settingsClasses = getComponentClasses('BarStack');
</script>

<div class={cls('BarStack', 'flex gap-px', settingsClasses.root, classes.root, className)}>
  {#each data as item}
    {@const valuePercent = item.value / (total ?? sum(data, (d) => d.value))}
    <!-- Hide empty -->
    {#if item.value}
      <button
        style:flex={item.value}
        class={cls(
          'item',
          'group relative overflow-hidden transition-[flex] duration-300 ease-in-out text-left',
          classes.item,
          item.classes?.root
        )}
        onclick={() => onItemClick?.(item)}
      >
        {#if children}
          {@render children({ item, total: total ?? sum(data, (d) => d.value) })}
        {:else}
          <div
            class={cls('group-first:rounded-l group-last:rounded-r', item.classes?.bar)}
            style:background-color={item.color}
            style={item.style}
          >
            {#if bar}
              {@render bar({ item, total: total ?? sum(data, (d) => d.value) })}
            {:else}
              <div class="h-1"></div>
            {/if}
          </div>
        {/if}
      </button>
    {/if}
  {/each}
</div>
