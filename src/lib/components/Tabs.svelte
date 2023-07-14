<script lang="ts">
  import type { ComponentProps } from 'svelte';
  import { cls } from '../utils/styles';
  import { getComponentTheme } from './theme';
  import Tab from './Tab.svelte';

  export let value: any = undefined;
  export let vertical = false;

  export let options: { label: string; value: any }[] = [];

  export let classes: {
    root?: string;
    tabs?: string;
    tab?: ComponentProps<Tab>['classes'];
    content?: string;
  } = {};
  const theme = getComponentTheme('Tabs');
</script>

<div
  class={cls(
    'Tabs',
    'overflow-auto',
    vertical ? 'flex' : '',
    theme.root,
    classes.root,
    $$props.class
  )}
>
  <div
    class={cls(
      'flex gap-2 overflow-auto',
      vertical ? 'flex-col -mr-px z-[1]' : '-mb-px',
      theme.tabs,
      classes.tabs
    )}
  >
    <slot>
      {#each options as tab (tab.value)}
        <Tab
          {vertical}
          selected={value === tab.value}
          on:click={() => (value = tab.value)}
          classes={{ ...theme.tab, ...classes.tab }}
        >
          {tab.label}
        </Tab>
      {/each}
    </slot>
  </div>

  <div
    class={cls(
      vertical ? 'flex-1' : 'rounded-b-lg rounded-tr-lg',
      'border border-gray-100 px-4 py-2'
    )}
  >
    <slot name="content" {value} />
  </div>
</div>
