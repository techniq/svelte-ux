<script lang="ts">
  import { page } from '$app/stores';
  import NavItem from '$lib/components/NavItem.svelte';

  const components = {
    App: ['AppBar', 'AppLayout', 'NavItem'],
    General: [
      'Avatar',
      'Badge',
      'Breadcrumb',
      'Button',
      'ButtonGroup',
      'Card',
      'Collapse',
      'CopyButton',
      'ExpansionPanel',
      'Icon',
      'InfiniteScroll',
      'Lazy',
      'ListItem',
      'Overflow',
      'Paginate',
      'Pagination',
      'Progress',
      'ProgressCircle',
      'ScrollContainer',
      'Steps',
      'Table',
      'TableOfContents',
      'Theme',
      'ToggleButton',
      'ToggleGroup',
      'TreeList',
    ],
    Motion: ['ScrollingNumber', 'SpringValue', 'Tilt', 'TweenedValue'],
    Inputs: [
      'Checkbox',
      'Field',
      'Input',
      'MultiSelect',
      'MultiSelectField',
      'MultiSelectMenu',
      'NumberStepper',
      'Radio',
      'RangeSlider',
      'SelectField',
      'Switch',
      'TextField',
    ],
    Layout: [
      'Grid',
      { label: 'Grid (classes)', value: 'GridTailwind' },
      'Overlay',
      'Stack',
      { label: 'Stack (classes)', value: 'StackTailwind' },
    ],
    Model: [
      'Dialog',
      'Drawer',
      'Menu',
      'MenuButton',
      'MenuField',
      'MenuItem',
      'ResponsiveMenu',
      'Notification',
      'Popover',
      'Tooltip',
    ],
    State: ['Form', 'Selection', 'State', 'StoreSubscribe', 'Toggle'],
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
    'popover',
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

  const utils = ['cls', 'format', 'Logger'];
</script>

<NavItem text="Getting Started" currentUrl={$page.url} path="/" />
<NavItem text="Customization" currentUrl={$page.url} path="/customization" />

<h1>Components</h1>
{#each Object.entries(components) as [header, items]}
  <h2>{header}</h2>
  {#each items as item}
    {#if typeof item === 'object'}
      <NavItem text={item.label} currentUrl={$page.url} path="/docs/components/{item.value}" />
    {:else}
      <NavItem text={item} currentUrl={$page.url} path="/docs/components/{item}" />
    {/if}
  {/each}
{/each}

<h1>Actions</h1>
{#each actions as item}
  <NavItem text={item} currentUrl={$page.url} path="/docs/actions/{item}" />
{/each}

<h1>Stores</h1>
{#each stores as item}
  <NavItem text={item} currentUrl={$page.url} path="/docs/stores/{item}" />
{/each}

<h1>Utils</h1>
{#each utils as item}
  <NavItem text={item} currentUrl={$page.url} path="/docs/utils/{item}" />
{/each}
