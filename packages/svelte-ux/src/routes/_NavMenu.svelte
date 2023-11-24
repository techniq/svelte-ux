<script lang="ts">
  import { page } from '$app/stores';
  import NavItem from '$lib/components/NavItem.svelte';
  import { mdiFormatListBulleted, mdiHome, mdiPalette } from '@mdi/js';

  const components = {
    App: ['AppBar', 'AppLayout', 'NavItem', 'Settings'],
    Elements: ['Avatar', 'Button', 'ButtonGroup', 'Card', 'Icon'],
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
      'ToggleGroup',
    ],
    Navigation: ['Breadcrumb', 'Paginate', 'Pagination', 'TableOfContents', 'Tabs', 'TreeList'],
    Layout: [
      'Collapse',
      'ExpansionPanel',
      'Grid',
      { label: 'Grid (classes)', value: 'GridTailwind' },
      'InfiniteScroll',
      'Lazy',
      'ListItem',
      'Overflow',
      'Overlay',
      'ScrollContainer',
      'Stack',
      { label: 'Stack (classes)', value: 'StackTailwind' },
      'Steps',
      'Table',
    ],
    Modal: [
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
    Feedback: ['Badge', 'Progress', 'ProgressCircle'],
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
    State: ['Form', 'Selection', 'State', 'StoreSubscribe', 'Toggle', 'ToggleButton'],
    Motion: ['ScrollingValue', 'SpringValue', 'Tilt', 'TweenedValue'],
    Effects: ['Gooey', 'Shine'],
    Other: ['CopyButton'],
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
    'spotlight',
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
    'mapStore',
    'matchMedia',
    'paginationStore',
    'promiseStore',
    'queryParamsStore',
    'selectionStore',
    'tableOrderStore',
    'timerStore',
    'uniqueStore',
  ];

  const utils = ['cls', 'format', 'json', 'Logger', 'string'];
</script>

<NavItem text="Getting Started" icon={mdiHome} currentUrl={$page.url} path="/" />
<NavItem text="Customization" icon={mdiPalette} currentUrl={$page.url} path="/customization" />
<NavItem text="Changelog" icon={mdiFormatListBulleted} currentUrl={$page.url} path="/changelog" />

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
