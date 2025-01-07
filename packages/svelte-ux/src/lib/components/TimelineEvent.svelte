<script lang="ts">
  import type { ComponentProps, Snippet } from 'svelte';
  import Icon from './Icon.svelte';
  import { getComponentClasses } from './theme.js';
  import { cls } from '../utils/styles.js';
  import { getTimeline } from './Timeline.svelte';
  import { mdiCircle } from '@mdi/js';

  interface Props {
    /** Value shown above (horizontal) or left (vertical).  If true, sets location of default slot */
    start?: string | number | boolean | Snippet;
    /** Value shown below (horizontal) or right (vertical).  If true, sets location of default slot */
    end?: string | number | boolean | Snippet;
    /** Icon to show on timeline */
    icon?: ComponentProps<typeof Icon>['data'];
    /** If completed, will color icon and line leading up to event */
    completed?: boolean;
    classes?: {
      root?: string;
      start?: string;
      end?: string;
      point?: string;
      icon?: string;
      line?: string;
    };
    class?: string;
    children?: Snippet;
    point?: Snippet;
  }

  let {
    start = false,
    end = false,
    icon = $bindable(),
    completed = false,
    classes = {},
    class: className,
    point,
    children,
  }: Props = $props();
  const settingsClasses = getComponentClasses('TimelineEvent');

  const timelineContext = getTimeline();
  let vertical = $derived(timelineContext?.vertical ?? false);
  let compact = $derived(timelineContext?.compact ?? false);

  $effect(() => {
    icon = icon ?? timelineContext?.icon ?? undefined;
  });

  let snapPoint = $derived(timelineContext?.snapPoint ?? false);
</script>

<li
  class={cls(
    'TimelineEvent',
    'relative grid shrink-0 items-center',
    'grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]',
    'grid-rows-[minmax(0,1fr)_auto_minmax(0,1fr)]',
    '[--color-completed:theme(colors.primary)]',
    snapPoint
      ? vertical
        ? 'grid-rows-[0.25rem_auto_minmax(0,1fr)]'
        : 'grid-cols-[0.25rem_auto_minmax(0,1fr)]'
      : '',
    compact && vertical ? 'grid-cols-[0_auto_minmax(0,1fr)] grid-rows-[0_auto_minmax(0,1fr)]' : '',
    vertical && 'justify-items-center',
    completed &&
      'timelineevent-completed [&_hr:last-child]:has-[~li.timelineevent-completed]:bg-[--color-completed]',
    settingsClasses.root,
    classes.root,
    className
  )}
>
  <hr
    class={cls(
      'border-0 bg-surface-300',
      '[:first-child>&]:hidden',
      vertical
        ? 'w-1 h-full col-start-2 row-start-1 rounded-b'
        : 'w-full h-1 col-start-1 row-start-2 rounded-r',
      !icon && 'rounded-none',
      completed && 'bg-[--color-completed]',
      settingsClasses.line,
      classes.line
    )}
  />

  {#if start}
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
      {#if children}
        {@render children()}
      {:else if typeof start === 'function'}
        {@render start()}
      {:else}
        {start}
      {/if}
    </div>
  {/if}

  <div class={cls('point', 'col-start-2 row-start-2 grid', settingsClasses.point, classes.point)}>
    {#if point}
      {@render point()}
    {:else}
      <Icon
        data={icon ?? mdiCircle}
        size={icon ? '1rem' : '.5rem'}
        class={cls(
          'icon',
          completed && 'text-[--color-completed]',
          settingsClasses.icon,
          classes.icon
        )}
      />
    {/if}
  </div>

  {#if end}
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
      {#if children}
        {@render children()}
      {:else if typeof end === 'function'}
        {@render end()}
      {:else}
        {end}
      {/if}
    </div>
  {/if}

  <hr
    class={cls(
      'border-0 bg-surface-300',
      '[:last-child>&]:hidden',
      vertical
        ? 'w-1 h-full col-start-2 col-end-auto row-start-3 row-end-[none] rounded-t'
        : 'w-full h-1 col-start-3 col-end-[none] row-start-2 row-end-auto rounded-l',
      !icon && 'rounded-none',
      settingsClasses.line,
      classes.line
    )}
  />
</li>
