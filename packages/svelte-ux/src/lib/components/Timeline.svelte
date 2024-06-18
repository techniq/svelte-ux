<script lang="ts" context="module">
  import { type ComponentProps, setContext, getContext } from 'svelte';

  type TimelineContext = {
    vertical: boolean;
    compact: boolean;
    icon: ComponentProps<Icon>['icon'];
    snapPoint: boolean;
  };

  const timelineKey = Symbol();

  export function setTimeline(value: TimelineContext | undefined) {
    setContext(timelineKey, value);
  }

  export function getTimeline() {
    return getContext<TimelineContext | undefined>(timelineKey);
  }
</script>

<script lang="ts">
  import TimelineItem from './TimelineItem.svelte';
  import { cls } from '../utils/styles.js';
  import { getComponentClasses } from './theme.js';

  import Icon from './Icon.svelte';

  type TimelineItemData = {
    start?: string | boolean;
    end?: string | boolean;
    icon?: ComponentProps<Icon>['data'];
    completed?: boolean;
  };

  export let data: TimelineItemData[] = [];

  /** Align vertically (default: horizontal) */
  export let vertical: boolean = false;

  /** Place timeline on left and all start/end items on end side  */
  export let compact: boolean = false;

  /** Common icon for all items */
  export let icon: ComponentProps<TimelineItem>['icon'] = undefined;

  /** Snap point to start */
  export let snapPoint = false;

  export let classes: {
    root?: string;
    item?: ComponentProps<TimelineItem>['classes'];
  } = {};
  const settingsClasses = getComponentClasses('Timeline');

  setTimeline({
    vertical,
    compact,
    icon,
    snapPoint,
  });
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
      <TimelineItem classes={classes.item} {...item} />
    {/each}
  </slot>
</ul>
