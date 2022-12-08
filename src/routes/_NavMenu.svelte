<script lang="ts">
  import { page } from '$app/stores';
  import NavItem from '$lib/components/NavItem.svelte';
</script>

<NavItem text="Getting Started" currentUrl={$page.url} path="/" class="pl-6 py-2 mt-4" />

<div
  class="py-2 pl-4 mt-4 text-sm text-gray-200 font-bold bg-black/20 border-t border-b border-white/10"
>
  Components
</div>

<div class="pt-4 pb-2 pl-4 text-xs text-gray-200 font-bold">App</div>
<NavItem text="AppBar" currentUrl={$page.url} path="/docs/components/AppBar" class="pl-6 py-2" />
<NavItem
  text="AppLayout"
  currentUrl={$page.url}
  path="/docs/components/AppLayout"
  class="pl-6 py-2"
/>
<NavItem
  text="Breadcrumb"
  currentUrl={$page.url}
  path="/docs/components/Breadcrumb"
  class="pl-6 py-2"
/>
<NavItem text="Steps" currentUrl={$page.url} path="/docs/components/Steps" class="pl-6 py-2" />

<div class="pt-4 pb-2 pl-4 text-xs text-gray-200 font-bold">General</div>
<NavItem text="Avatar" currentUrl={$page.url} path="/docs/components/Avatar" class="pl-6 py-2" />
<NavItem text="Badge" currentUrl={$page.url} path="/docs/components/Badge" class="pl-6 py-2" />
<NavItem text="Button" currentUrl={$page.url} path="/docs/components/Button" class="pl-6 py-2" />
<NavItem text="Card" currentUrl={$page.url} path="/docs/components/Card" class="pl-6 py-2" />
<NavItem
  text="Collapse"
  currentUrl={$page.url}
  path="/docs/components/Collapse"
  class="pl-6 py-2"
/>
<NavItem
  text="ExpansionPanel"
  currentUrl={$page.url}
  path="/docs/components/ExpansionPanel"
  class="pl-6 py-2"
/>
<NavItem text="Icon" currentUrl={$page.url} path="/docs/components/Icon" class="pl-6 py-2" />
<NavItem
  text="ListItem"
  currentUrl={$page.url}
  path="/docs/components/ListItem"
  class="pl-6 py-2"
/>
<NavItem
  text="Paginate"
  currentUrl={$page.url}
  path="/docs/components/Paginate"
  class="pl-6 py-2"
/>
<NavItem
  text="Pagination"
  currentUrl={$page.url}
  path="/docs/components/Pagination"
  class="pl-6 py-2"
/>
<NavItem
  text="Progress"
  currentUrl={$page.url}
  path="/docs/components/Progress"
  class="pl-6 py-2"
/>
<NavItem text="Scroll" currentUrl={$page.url} path="/docs/components/Scroll" class="pl-6 py-2" />
<NavItem
  text="SpringValue"
  currentUrl={$page.url}
  path="/docs/components/SpringValue"
  class="pl-6 py-2"
/>
<NavItem
  text="ToggleGroup"
  currentUrl={$page.url}
  path="/docs/components/ToggleGroup"
  class="pl-6 py-2"
/>
<NavItem
  text="TweenedValue"
  currentUrl={$page.url}
  path="/docs/components/TweenedValue"
  class="pl-6 py-2"
/>

<div class="pt-4 pb-2 pl-4 text-xs text-gray-200 font-bold">Inputs</div>
<NavItem
  text="Checkbox"
  currentUrl={$page.url}
  path="/docs/components/Checkbox"
  class="pl-6 py-2"
/>
<NavItem text="Field" currentUrl={$page.url} path="/docs/components/Field" class="pl-6 py-2" />
<NavItem text="Input" currentUrl={$page.url} path="/docs/components/Input" class="pl-6 py-2" />
<NavItem text="Radio" currentUrl={$page.url} path="/docs/components/Radio" class="pl-6 py-2" />
<NavItem
  text="RangeSlider"
  currentUrl={$page.url}
  path="/docs/components/RangeSlider"
  class="pl-6 py-2"
/>
<NavItem
  text="SelectField"
  currentUrl={$page.url}
  path="/docs/components/SelectField"
  class="pl-6 py-2"
/>
<NavItem text="Switch" currentUrl={$page.url} path="/docs/components/Switch" class="pl-6 py-2" />
<NavItem
  text="TextField"
  currentUrl={$page.url}
  path="/docs/components/TextField"
  class="pl-6 py-2"
/>

<div class="pt-4 pb-2 pl-4 text-xs text-gray-200 font-bold">Layout</div>
<NavItem text="Grid" currentUrl={$page.url} path="/docs/components/Grid" class="pl-6 py-2" />
<NavItem
  text="Grid (class)"
  currentUrl={$page.url}
  path="/docs/components/GridTailwind"
  class="pl-6 py-2"
/>
<NavItem text="Overlay" currentUrl={$page.url} path="/docs/components/Overlay" class="pl-6 py-2" />
<NavItem text="Stack" currentUrl={$page.url} path="/docs/components/Stack" class="pl-6 py-2" />
<NavItem
  text="Stack (class)"
  currentUrl={$page.url}
  path="/docs/components/StackTailwind"
  class="pl-6 py-2"
/>

<div class="pt-4 pb-2 pl-4 text-xs text-gray-200 font-bold">Modal</div>
<NavItem text="Dialog" currentUrl={$page.url} path="/docs/components/Dialog" class="pl-6 py-2" />
<NavItem text="Drawer" currentUrl={$page.url} path="/docs/components/Drawer" class="pl-6 py-2" />
<NavItem text="Menu" currentUrl={$page.url} path="/docs/components/Menu" class="pl-6 py-2" />
<NavItem
  text="MenuItem"
  currentUrl={$page.url}
  path="/docs/components/MenuItem"
  class="pl-6 py-2"
/>
<NavItem
  text="MenuField"
  currentUrl={$page.url}
  path="/docs/components/MenuField"
  class="pl-6 py-2"
/>
<NavItem
  text="Notification"
  currentUrl={$page.url}
  path="/docs/components/Notification"
  class="pl-6 py-2"
/>
<NavItem text="Popover" currentUrl={$page.url} path="/docs/components/Popover" class="pl-6 py-2" />
<NavItem text="Tooltip" currentUrl={$page.url} path="/docs/components/Tooltip" class="pl-6 py-2" />

<div class="pt-4 pb-2 pl-4 text-xs text-gray-200 font-bold">State</div>
<NavItem text="Form" currentUrl={$page.url} path="/docs/components/Form" class="pl-6 py-2" />
<NavItem
  text="Selection"
  currentUrl={$page.url}
  path="/docs/components/Selection"
  class="pl-6 py-2"
/>
<NavItem text="State" currentUrl={$page.url} path="/docs/components/State" class="pl-6 py-2" />
<NavItem text="Toggle" currentUrl={$page.url} path="/docs/components/Toggle" class="pl-6 py-2" />

<div class="pt-4 pb-2 pl-4 text-xs text-gray-200 font-bold">Table</div>
<NavItem text="Table" currentUrl={$page.url} path="/docs/components/Table" class="pl-6 py-2" />
<NavItem
  text="TablePagination"
  currentUrl={$page.url}
  path="/docs/components/TablePagination"
  class="pl-6 py-2"
/>

<div class="pt-4 pb-2 pl-4 text-xs text-gray-200 font-bold">Date</div>
<NavItem
  text="dateDisplay"
  currentUrl={$page.url}
  path="/docs/components/dateDisplay"
  class="pl-6 py-2"
/>
<NavItem
  text="DateField"
  currentUrl={$page.url}
  path="/docs/components/DateField"
  class="pl-6 py-2"
/>
<NavItem
  text="DatePickerField"
  currentUrl={$page.url}
  path="/docs/components/DatePickerField"
  class="pl-6 py-2"
/>
<NavItem
  text="DateRange"
  currentUrl={$page.url}
  path="/docs/components/DateRange"
  class="pl-6 py-2"
/>
<NavItem
  text="DateRangeField"
  currentUrl={$page.url}
  path="/docs/components/DateRangeField"
  class="pl-6 py-2"
/>
<NavItem
  text="Duration"
  currentUrl={$page.url}
  path="/docs/components/Duration"
  class="pl-6 py-2"
/>
<NavItem text="Month" currentUrl={$page.url} path="/docs/components/Month" class="pl-6 py-2" />
<NavItem
  text="MonthList"
  currentUrl={$page.url}
  path="/docs/components/MonthList"
  class="pl-6 py-2"
/>
<NavItem
  text="MonthListByYear"
  currentUrl={$page.url}
  path="/docs/components/MonthListByYear"
  class="pl-6 py-2"
/>
<NavItem
  text="YearList"
  currentUrl={$page.url}
  path="/docs/components/YearList"
  class="pl-6 py-2"
/>

<div
  class="py-2 pl-4 mt-4 text-sm text-gray-200 font-bold bg-black/20 border-t border-b border-white/10"
>
  Actions
</div>

<NavItem text="cssVars" currentUrl={$page.url} path="/docs/actions/cssVars" class="pl-6 py-2" />
<NavItem
  text="dataBackground"
  currentUrl={$page.url}
  path="/docs/actions/dataBackground"
  class="pl-6 py-2"
/>
<NavItem text="input" currentUrl={$page.url} path="/docs/actions/input" class="pl-6 py-2" />
<NavItem text="layout" currentUrl={$page.url} path="/docs/actions/layout" class="pl-6 py-2" />
<NavItem text="mouse" currentUrl={$page.url} path="/docs/actions/mouse" class="pl-6 py-2" />
<NavItem text="multi" currentUrl={$page.url} path="/docs/actions/multi" class="pl-6 py-2" />
<NavItem text="observer" currentUrl={$page.url} path="/docs/actions/observer" class="pl-6 py-2" />
<NavItem text="portal" currentUrl={$page.url} path="/docs/actions/portal" class="pl-6 py-2" />
<NavItem text="scroll" currentUrl={$page.url} path="/docs/actions/scroll" class="pl-6 py-2" />
<NavItem text="sticky" currentUrl={$page.url} path="/docs/actions/sticky" class="pl-6 py-2" />
<NavItem text="table" currentUrl={$page.url} path="/docs/actions/table" class="pl-6 py-2" />

<div
  class="py-2 pl-4 mt-4 text-sm text-gray-200 font-bold bg-black/20 border-t border-b border-white/10"
>
  Stores
</div>

<NavItem
  text="debounceStore"
  currentUrl={$page.url}
  path="/docs/stores/debounceStore"
  class="pl-6 py-2"
/>
<NavItem
  text="dirtyStore"
  currentUrl={$page.url}
  path="/docs/stores/dirtyStore"
  class="pl-6 py-2"
/>
<NavItem
  text="fetchStore"
  currentUrl={$page.url}
  path="/docs/stores/fetchStore"
  class="pl-6 py-2"
/>
<NavItem text="formStore" currentUrl={$page.url} path="/docs/stores/formStore" class="pl-6 py-2" />
<NavItem
  text="graphStore"
  currentUrl={$page.url}
  path="/docs/stores/graphStore"
  class="pl-6 py-2"
/>
<NavItem
  text="localStore"
  currentUrl={$page.url}
  path="/docs/stores/localStore"
  class="pl-6 py-2"
/>
<NavItem
  text="matchMedia"
  currentUrl={$page.url}
  path="/docs/stores/matchMedia"
  class="pl-6 py-2"
/>
<NavItem
  text="paginationStore"
  currentUrl={$page.url}
  path="/docs/stores/paginationStore"
  class="pl-6 py-2"
/>
<NavItem
  text="queryParamsStore"
  currentUrl={$page.url}
  path="/docs/stores/queryParamsStore"
  class="pl-6 py-2"
/>
<NavItem
  text="selectionStore"
  currentUrl={$page.url}
  path="/docs/stores/selectionStore"
  class="pl-6 py-2"
/>
<NavItem
  text="tableOrderStore"
  currentUrl={$page.url}
  path="/docs/stores/tableOrderStore"
  class="pl-6 py-2"
/>
<NavItem
  text="timerStore"
  currentUrl={$page.url}
  path="/docs/stores/timerStore"
  class="pl-6 py-2"
/>
