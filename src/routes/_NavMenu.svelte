<script lang="ts">
  import { page } from '$app/stores';
  import NavItem from '$lib/components/NavItem.svelte';

  const components = {
    App: ['AppBar', 'AppLayout', 'Breadcrumb', 'Steps'],
    General: [
      'Avatar',
      'Badge',
      'Button',
      'ButtonGroup',
      'Card',
      'Collapse',
      'ExpansionPanel',
      'Icon',
      'InfiniteScroll',
      'Lazy',
      'ListItem',
      'Overflow',
      'Paginate',
      'Pagination',
      'Progress',
      'ScrollContainer',
      'SpringValue',
      'Table',
      'ToggleButton',
      'ToggleGroup',
      'TweenedValue',
    ],
    Inputs: [
      'Checkbox',
      'Field',
      'Input',
      'Radio',
      'RangeSlider',
      'SelectField',
      'Switch',
      'TextField',
    ],
    Layout: [
      'Grid',
      { label: 'Grid (class)', value: 'GridTailwind' },
      'Overlay',
      'Stack',
      { label: 'Stack (class)', value: 'StackTailwind' },
    ],
    Model: [
      'Dialog',
      'Drawer',
      'Menu',
      'MenuItem',
      'MenuField',
      'Notification',
      'Popover',
      'Tooltip',
    ],
    State: ['Form', 'Selection', 'State', 'Toggle'],
    Date: [
      'dateDisplay',
      'DateField',
      'DatePickerField',
      'DateRange',
      'DateRangeField',
      'Duration',
      'Month',
      'MonthList',
      'MonthListByYear',
      'YearList',
    ],
  };

  const actions = [
    'cssVars',
    'dataBackground',
    'input',
    'layout',
    'mouse',
    'multi',
    'observer',
    'portal',
    'scroll',
    'sticky',
    'table',
  ];

  const stores = [
    'changeStore',
    'debounceStore',
    'dirtyStore',
    'fetchStore',
    'formStore',
    'graphStore',
    'localStore',
    'matchMedia',
    'paginationStore',
    'queryParamsStore',
    'selectionStore',
    'tableOrderStore',
    'timerStore',
  ];
</script>

<NavItem text="Getting Started" currentUrl={$page.url} path="/" class="pl-6 py-2 mt-4" />

<div
  class="py-2 pl-4 mt-4 text-sm text-gray-200 font-bold bg-black/20 border-t border-b border-white/10"
>
  Components
</div>
{#each Object.entries(components) as [header, items]}
  <div class="pt-4 pb-2 pl-4 text-xs text-gray-200 font-bold">{header}</div>
  {#each items as item}
    {#if typeof item === 'object'}
      <NavItem
        text={item.label}
        currentUrl={$page.url}
        path="/docs/components/{item.value}"
        class="pl-6 py-2"
      />
    {:else}
      <NavItem
        text={item}
        currentUrl={$page.url}
        path="/docs/components/{item}"
        class="pl-6 py-2"
      />
    {/if}
  {/each}
{/each}

<div
  class="py-2 pl-4 mt-4 text-sm text-gray-200 font-bold bg-black/20 border-t border-b border-white/10"
>
  Actions
</div>
{#each actions as item}
  <NavItem text={item} currentUrl={$page.url} path="/docs/actions/{item}" class="pl-6 py-2" />
{/each}

<div
  class="py-2 pl-4 mt-4 text-sm text-gray-200 font-bold bg-black/20 border-t border-b border-white/10"
>
  Stores
</div>
{#each stores as item}
  <NavItem text={item} currentUrl={$page.url} path="/docs/stores/{item}" class="pl-6 py-2" />
{/each}
