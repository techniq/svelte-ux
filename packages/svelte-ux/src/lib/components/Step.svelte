<script lang="ts">
  import type { ComponentProps } from 'svelte';

  import Icon from './Icon.svelte';
  import { getSteps } from './Steps.svelte';
  import { getComponentClasses } from './theme.js';
  import { cls } from '../utils/styles.js';

  /** Override content (by default uses an incrementing counter)*/
  export let content: string | undefined = undefined;

  /** Use icon instead of content */
  export let icon: ComponentProps<Icon>['data'] = undefined;

  /** If completed, will color content and line leading up to item */
  export let completed = false;

  export let classes: {
    root?: string;
    line?: string;
    content?: string;
    /** Apply classes to completed item point and line leading up to item */
    completed?: string;
  } = {};
  const settingsClasses = getComponentClasses('Step');

  const stepsContext = getSteps();
  $: vertical = stepsContext?.vertical ?? false;
</script>

<li
  class={cls(
    'Step',
    'group grid place-items-center text-center',
    vertical
      ? 'grid-cols-[40px_1fr] gap-2 min-h-16 justify-items-start'
      : 'grid-rows-[40px_1fr] min-w-16',
    settingsClasses.root,
    classes.root,
    $$props.class
  )}
>
  <div
    class={cls(
      'group-first:hidden col-start-1 row-start-1 bg-surface-300 text-surface-content top-0',
      vertical ? 'h-full w-2 -mt-[100%] justify-self-center' : 'h-2 w-full -ml-[100%]',
      completed && (settingsClasses.completed ?? classes.completed ?? 'bg-primary'),
      settingsClasses.line,
      classes.line
    )}
  />

  <slot />

  <div
    class={cls(
      'bg-surface-300 text-surface-content relative col-start-1 row-start-1 grid size-8 place-items-center place-self-center rounded-full [counter-increment:step]',
      content == null && !$$slots.content && icon == null && 'before:content-[counter(step)]',
      completed &&
        (settingsClasses.completed ?? classes.completed ?? 'bg-primary text-primary-content'),
      settingsClasses.content,
      classes.content
    )}
  >
    <slot name="content">
      {#if icon}
        <Icon data={icon} />
      {:else}
        {content ?? ''}
      {/if}
    </slot>
  </div>
</li>
