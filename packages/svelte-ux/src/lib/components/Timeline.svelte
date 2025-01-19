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
  import TimelineEvent from './TimelineEvent.svelte';
  import { cls } from '@layerstack/tailwind';
  import { getComponentClasses } from './theme.js';

  import Icon from './Icon.svelte';

  type TimelineEventData = {
    start?: string | number | boolean;
    end?: string | number | boolean;
    icon?: ComponentProps<Icon>['data'];
    completed?: boolean;
  };

  export let data: TimelineEventData[] = [];

  /** Align vertically (default: horizontal) */
  export let vertical: boolean = false;

  /** Place timeline on left and all start/end events on same/end side  */
  export let compact: boolean = false;

  /** Common icon for all events */
  export let icon: ComponentProps<TimelineEvent>['icon'] = undefined;

  /** Snap point to start */
  export let snapPoint = false;

  export let classes: {
    root?: string;
    event?: ComponentProps<TimelineEvent>['classes'];
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
      <TimelineEvent classes={classes.event} {...item} />
    {/each}
  </slot>
</ul>
