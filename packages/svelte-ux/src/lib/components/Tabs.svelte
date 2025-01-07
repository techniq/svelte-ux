<script lang="ts">
  import type { ComponentProps, Snippet } from 'svelte';
  import { cls } from '../utils/styles.js';
  import { getComponentClasses } from './theme.js';
  import Tab from './Tab.svelte';

  interface Props {
    value?: any;
    placement?: 'top' | 'bottom' | 'left' | 'right';
    options?: { label: string; value: any }[];
    classes?: {
      root?: string;
      tabs?: string;
      tab?: ComponentProps<typeof Tab>['classes'];
      content?: string;
    };
    class?: string;
    children?: Snippet;
    content?: Snippet<[{ value: any }]>;
  }

  let {
    value = $bindable(),
    placement = 'top',
    options = [],
    classes = {},
    class: className,
    children,
    content,
  }: Props = $props();
  const settingsClasses = getComponentClasses('Tabs');
  let vertical = $derived(placement === 'left' || placement === 'right');
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
    className
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
    {#if children}
      {@render children()}
    {:else}
      {#each options as tab (tab.value)}
        <Tab
          {placement}
          selected={value === tab.value}
          onclick={() => (value = tab.value)}
          classes={{ ...settingsClasses.tab, ...classes.tab }}
        >
          {tab.label}
        </Tab>
      {/each}
    {/if}
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
    {@render content?.({ value })}
  </div>
</div>
