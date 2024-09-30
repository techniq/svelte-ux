<script lang="ts">
  import { NavItem } from 'svelte-ux';

  import { page } from '$app/stores';
  import { entries } from '$lib/types/typeHelpers.js';
  import { mdiCog, mdiFormatListBulleted, mdiHome, mdiPalette } from '@mdi/js';

  const components = {
    App: ['AppBar', 'AppLayout', 'NavItem', 'Settings', 'ThemeInit', 'ThemeSelect', 'ThemeSwitch'],
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
      'RangeField',
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
      'Timeline',
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
    Visualization: ['BarStack'],
    Date: [
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
</script>

<NavItem text="Getting Started" icon={mdiHome} currentUrl={$page.url} path="/" />
<NavItem text="Customization" icon={mdiCog} currentUrl={$page.url} path="/customization" />
<NavItem text="Theme" icon={mdiPalette} currentUrl={$page.url} path="/theme" />
<NavItem text="Changelog" icon={mdiFormatListBulleted} currentUrl={$page.url} path="/changelog" />

<h1>Components</h1>
{#each entries(components) as [header, items]}
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
<NavItem
  text="@layerstack/svelte-actions"
  currentUrl={$page.url}
  path="https://www.layerstack.dev/docs/svelte-actions"
  target="_blank"
/>
<NavItem
  text="@layerstack/svelte-table"
  currentUrl={$page.url}
  path="https://www.layerstack.dev/docs/svelte-table/actions"
  target="_blank"
/>

<h1>Stores</h1>
<NavItem
  text="@layerstack/svelte-stores"
  currentUrl={$page.url}
  path="https://www.layerstack.dev/docs/svelte-stores"
  target="_blank"
/>
<NavItem
  text="@layerstack/svelte-table"
  currentUrl={$page.url}
  path="https://www.layerstack.dev/docs/svelte-table/stores"
  target="_blank"
/>

<h1>Utils</h1>
<NavItem
  text="@layerstack/tailwind"
  currentUrl={$page.url}
  path="https://www.layerstack.dev/docs/tailwind"
  target="_blank"
/>
<NavItem
  text="@layerstack/utils"
  currentUrl={$page.url}
  path="https://www.layerstack.dev/docs/utils"
  target="_blank"
/>
