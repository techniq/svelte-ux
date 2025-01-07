<script lang="ts" module>
  import { type ComponentProps, setContext, getContext, type Snippet } from 'svelte';

  type TimelineContext = {
    vertical: boolean;
    compact: boolean;
    icon: ComponentProps<typeof Icon>['data'];
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
  import { cls } from '../utils/styles.js';
  import { getComponentClasses } from './theme.js';

  import Icon from './Icon.svelte';

  type TimelineEventData = {
    start?: string | number | boolean;
    end?: string | number | boolean;
    icon?: ComponentProps<typeof Icon>['data'];
    completed?: boolean;
  };

  interface Props {
    data?: TimelineEventData[];
    /** Align vertically (default: horizontal) */
    vertical?: boolean;
    /** Place timeline on left and all start/end events on same/end side  */
    compact?: boolean;
    /** Common icon for all events */
    icon?: ComponentProps<typeof TimelineEvent>['icon'];
    /** Snap point to start */
    snapPoint?: boolean;
    classes?: {
      root?: string;
      event?: ComponentProps<typeof TimelineEvent>['classes'];
    };
    class?: string;
    children?: Snippet<[{ data: TimelineEventData[] }]>;
  }

  let {
    data = [],
    vertical = false,
    compact = false,
    icon,
    snapPoint = false,
    classes = {},
    class: className,
    children,
  }: Props = $props();
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
    className
  )}
>
  {#if children}
    {@render children({ data })}
  {:else}
    {#each data as item}
      <TimelineEvent classes={classes.event} {...item} />
    {/each}
  {/if}
</ul>
