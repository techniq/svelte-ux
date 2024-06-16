<script lang="ts">
  import type { ComponentProps } from 'svelte';
  import Icon from './Icon.svelte';
  import { getComponentClasses } from './theme.js';
  import { cls } from '../utils/styles.js';

  export let start: any = undefined;
  export let end: any = undefined;
  export let icon: ComponentProps<Icon>['data'] = undefined;
  export let vertical = false;

  /** Snap icon to start */
  export let snapIcon = false;

  export let classes: {
    root?: string;
    start?: string;
    end?: string;
    icon?: string;
    line?: string;
  } = {};
  const settingsClasses = getComponentClasses('TimelineItem');
</script>

<li
  class={cls(
    'TimelineItem',
    'relative grid shrink-0 items-center',
    vertical && 'justify-items-center',
    snapIcon
      ? vertical
        ? '[--timeline-col-start:minmax(0,1fr)] [--timeline-row-start:0.25rem]'
        : '[--timeline-col-start:0.25rem] [--timeline-row-start:minmax(0,1fr)]'
      : '',
    settingsClasses.root,
    classes.root,
    $$props.class
  )}
>
  <hr
    class={cls(
      'border-0 bg-surface-300',
      vertical ? 'w-1 h-full col-start-2 row-start-1' : 'w-full h-1 col-start-1 row-start-2',
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
          : 'col-start-1 col-end-4 row-start-1 row-end-2 m-1 self-end justify-self-center',
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
      class={cls('icon', 'col-start-2 row-start-2', settingsClasses.icon, classes.icon)}
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

<style>
  li {
    grid-template-rows: var(--timeline-row-start, minmax(0, 1fr)) auto var(
        --timeline-row-end,
        minmax(0, 1fr)
      );
    grid-template-columns: var(--timeline-col-start, minmax(0, 1fr)) auto var(
        --timeline-col-end,
        minmax(0, 1fr)
      );
  }
</style>
