<script lang="ts">
  import type { ComponentProps } from 'svelte';
  import Icon from './Icon.svelte';
  import { getComponentClasses } from './theme.js';
  import { cls } from '../utils/styles.js';
  import { getTimeline } from './Timeline.svelte';

  /** Value shown above (horizontal) or left (vertical).  If true, sets location of default slot */
  export let start: string | boolean = false;

  /** Value shown below (horizontal) or right (vertical).  If true, sets location of default slot */
  export let end: string | boolean = false;

  /** Icon to show on timeline */
  export let icon: ComponentProps<Icon>['data'] = undefined;

  /** If complete, will color icon and line leading up to item */
  export let complete = false;

  export let classes: {
    root?: string;
    start?: string;
    end?: string;
    icon?: string;
    line?: string;
  } = {};
  const settingsClasses = getComponentClasses('TimelineItem');

  const timelineContext = getTimeline();
  $: vertical = timelineContext?.vertical ?? false;
  $: compact = timelineContext?.compact ?? false;
  $: icon = icon ?? timelineContext?.icon ?? undefined;
  $: snapIcon = timelineContext?.snapIcon ?? false;
</script>

<li
  class={cls(
    'TimelineItem',
    'relative grid shrink-0 items-center',
    'grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]',
    'grid-rows-[minmax(0,1fr)_auto_minmax(0,1fr)]',
    snapIcon
      ? vertical
        ? 'grid-rows-[0.25rem_auto_minmax(0,1fr)]'
        : 'grid-cols-[0.25rem_auto_minmax(0,1fr)]'
      : '',
    compact && vertical ? 'grid-cols-[0_auto_minmax(0,1fr)]' : '',
    vertical && 'justify-items-center',
    complete &&
      'timelineitem-complete [&_hr:last-child]:has-[~li.timelineitem-complete]:bg-primary',
    settingsClasses.root,
    classes.root,
    $$props.class
  )}
>
  <hr
    class={cls(
      'border-0 bg-surface-300',
      vertical ? 'w-1 h-full col-start-2 row-start-1' : 'w-full h-1 col-start-1 row-start-2',
      complete && 'bg-primary',
      '[:first-child>&]:hidden',
      settingsClasses.line,
      classes.line
    )}
  />

  {#if start || $$slots.start}
    <div
      class={cls(
        'start',
        vertical
          ? 'col-start-1 col-end-2 row-start-1 row-end-4 self-center justify-self-end'
          : 'col-start-1 col-end-4 row-start-1 row-end-2 self-end justify-self-center m-1',
        compact
          ? vertical
            ? 'col-start-3 col-end-4 row-start-1 row-end-4 self-center justify-self-start'
            : 'col-start-1 col-end-4 row-start-3 row-end-4 self-start justify-self-center m-1'
          : '',
        settingsClasses.start,
        classes.start
      )}
    >
      <slot>
        <slot name="start">
          {start}
        </slot>
      </slot>
    </div>
  {/if}

  {#if icon}
    <Icon
      data={icon}
      class={cls(
        'icon',
        'col-start-2 row-start-2',
        complete && 'text-primary',
        settingsClasses.icon,
        classes.icon
      )}
    />
  {:else}
    <div />
  {/if}

  {#if end || $$slots.end}
    <div
      class={cls(
        'end',
        vertical
          ? 'col-start-3 col-end-4 row-start-1 row-end-4 self-center justify-self-start'
          : 'col-start-1 col-end-4 row-start-3 row-end-4 m-1 self-start justify-self-center',
        settingsClasses.end,
        classes.end
      )}
    >
      <slot>
        <slot name="end">
          {end}
        </slot>
      </slot>
    </div>
  {/if}

  <hr
    class={cls(
      'border-0 bg-surface-300',
      vertical
        ? 'w-1 h-full col-start-2 col-end-auto row-start-3 row-end-[none]'
        : 'w-full h-1 col-start-3 col-end-[none] row-start-2 row-end-auto',
      '[:last-child>&]:hidden',
      settingsClasses.line,
      classes.line
    )}
  />
</li>
