<script lang="ts">
  import type { ComponentProps } from 'svelte';
  import { cls } from '@layerstack/tailwind';
  import { getComponentClasses } from './theme.js';
  import Tab from './Tab.svelte';

  export let value: any = undefined;
  export let placement: 'top' | 'bottom' | 'left' | 'right' = 'top';

  $: vertical = placement === 'left' || placement === 'right';

  export let options: { label: string; value: any }[] = [];

  export let classes: {
    root?: string;
    tabs?: string;
    tab?: ComponentProps<Tab>['classes'];
    content?: string;
  } = {};
  const settingsClasses = getComponentClasses('Tabs');
</script>

<div
  class={cls(
    'Tabs',
    'overflow-auto flex',
    `placement-${placement}`,
    {
      top: 'flex-col',
      bottom: 'flex-col-reverse',
      left: 'flex-row',
      right: 'flex-row-reverse',
    }[placement],
    settingsClasses.root,
    classes.root,
    $$props.class
  )}
>
  <div
    class={cls(
      'flex gap-1 overflow-auto z-[1]',
      vertical && 'flex-col',
      {
        top: '-mb-px',
        bottom: '-mt-px',
        left: '-mr-px',
        right: '-ml-px',
      }[placement],
      settingsClasses.tabs,
      classes.tabs
    )}
  >
    <slot>
      {#each options as tab (tab.value)}
        <Tab
          {placement}
          selected={value === tab.value}
          on:click={() => (value = tab.value)}
          classes={{ ...settingsClasses.tab, ...classes.tab }}
        >
          {tab.label}
        </Tab>
      {/each}
    </slot>
  </div>

  <div
    class={cls(
      vertical && 'flex-1',
      {
        top: 'border-t',
        bottom: 'border-b',
        left: 'border-l',
        right: 'border-r',
      }[placement],
      settingsClasses.content,
      classes.content
    )}
  >
    <slot name="content" {value} />
  </div>
</div>
