<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { sum } from 'd3-array';

  import { cls } from '@layerstack/tailwind';
  import { getComponentClasses } from './index.js';

  export let data: {
    label: string;
    value: number;
    color?: string;
    style?: string;
    classes?: {
      root?: string;
      bar?: string;
    };
  }[];
  export let total: number | undefined = undefined;

  export let classes: {
    root?: string;
    item?: string;
  } = {};
  const settingsClasses = getComponentClasses('BarStack');

  const dispatch = createEventDispatcher<{
    itemClick: (typeof data)[number];
  }>();
</script>

<div class={cls('BarStack', 'flex gap-px', settingsClasses.root, classes.root, $$props.class)}>
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
        on:click={() => dispatch('itemClick', item)}
      >
        <slot {item} total={total ?? sum(data, (d) => d.value)}>
          <div
            class={cls('group-first:rounded-l group-last:rounded-r', item.classes?.bar)}
            style:background-color={item.color}
            style={item.style}
          >
            <slot name="bar" {item} total={total ?? sum(data, (d) => d.value)}>
              <div class="h-1"></div>
            </slot>
          </div>
        </slot>
      </button>
    {/if}
  {/each}
</div>
