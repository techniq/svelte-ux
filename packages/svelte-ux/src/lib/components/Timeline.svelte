<script lang="ts">
  import type { ComponentProps } from 'svelte';

  import TimelineItem from './TimelineItem.svelte';
  import { cls } from '$lib/utils/styles.js';
  import { getComponentClasses } from './theme.js';

  export let data: ComponentProps<TimelineItem>[] = [];

  export let vertical = false;
  export let compact = false;

  /** Common icon for all items */
  export let icon: ComponentProps<TimelineItem>['icon'] = undefined;

  /** Snap icon to start */
  export let snapIcon = false;

  export let classes: {
    root?: string;
    item?: ComponentProps<TimelineItem>['classes'];
  } = {};
  const settingsClasses = getComponentClasses('Timeline');
</script>

<ul
  class={cls(
    'Timeline',
    'relative flex',
    vertical && 'flex-col timeline-vertical',
    settingsClasses.root,
    classes.root,
    $$props.class
  )}
>
  <slot {data}>
    {#each data as item}
      <TimelineItem {vertical} {compact} {icon} {snapIcon} classes={classes.item} {...item} />
    {/each}
  </slot>
</ul>
