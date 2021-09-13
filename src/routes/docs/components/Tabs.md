<script>
  import Button from '../components/Button.svelte';
  import Preview from '../components/Preview.svelte';
  import Tab from '../components/Tab.svelte';
  import Tabs from '../components/Tabs.svelte';
  import TabPanel from '../components/TabPanel.svelte';

  const allValue = {};
  const missedValue = {};
  const callsValue = {};

  let selected = 1;
  let selectedStr = 'missed';
  let selectedObj = missedValue;

  let tabStyle = 'contained';
</script>

<!--
  - [x] Variable width tabs
  - [ ] Selection
    - `data-key` only allows string keys, but allows attaching to dom element
    - what about enum / toggle button use cases?
  - [ ] Support changing color of indicator based on selection
  - [ ] Support coloring tab based on selection (.selected class?, add bold font, etc)
  - [ ] Pass fallback transition to <Tabs contained={tabStyle==='contained'} underlined={tabStyle==='underlined'}> (fade, scale, etc)
  - [x] Rename `key` to `value`?
  - [ ] Support overflow scrolling (with button)
  - Reference:
    - https://svelte.dev/repl/8e68120858e5322272dc9136c4bb79cc?version=3.7.0
-->

## Style

<label>
  <input type="radio" value="contained" bind:group={tabStyle} />
  Contained (Apple)
</label>
<label>
  <input type="radio" value="underlined" bind:group={tabStyle} />
  Underlined (Twitter)
</label>

## Panels

<Preview>
  <Tabs
    contained={tabStyle === 'contained'}
    underlined={tabStyle === 'underlined'}
  >
    <div class="tabList">
      <Tab value="all" style="width: 120px">All</Tab>
      <Tab value="missed" style="width: 120px">Missed</Tab>
      <Tab value="calls" style="width: 120px">Calls</Tab>
    </div>
    <div style="margin-top: 8px; padding: 16px">
      <TabPanel>All panel</TabPanel>
      <TabPanel>Missed panel</TabPanel>
      <TabPanel>Calls panel</TabPanel>
    </div>
  </Tabs>
</Preview>

## Vertical layout

<Preview>
  <Tabs
    contained={tabStyle === 'contained'}
    underlined={tabStyle === 'underlined'}
    vertical
  >
    <div class="tabList">
      <Tab value="all">All</Tab>
      <Tab value="missed">Missed</Tab>
      <Tab value="calls">Calls</Tab>
    </div>
  </Tabs>
</Preview>

## Full width

<Preview>
  <Tabs
    contained={tabStyle === 'contained'}
    underlined={tabStyle === 'underlined'}
  >
    <div class="tabList w-full">
      <Tab value="all">All</Tab>
      <Tab value="missed">Missed</Tab>
      <Tab value="calls">Calls</Tab>
    </div>
  </Tabs>
</Preview>

## Full width w/ vertical

<Preview>
  <Tabs
    contained={tabStyle === 'contained'}
    underlined={tabStyle === 'underlined'}
    vertical
  >
    <div class="tabList w-full">
      <Tab value="all">All</Tab>
      <Tab value="missed">Missed</Tab>
      <Tab value="calls">Calls</Tab>
    </div>
  </Tabs>
</Preview>

## Grid layout

<Preview>
  <Tabs
    contained={tabStyle === 'contained'}
    underlined={tabStyle === 'underlined'}
  >
    <div
      class="tabList"
      style="display: grid; grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 48px)"
    >
      <Tab value={1}>1</Tab>
      <Tab value={2}>2</Tab>
      <Tab value={3}>3</Tab>
      <Tab value={4}>4</Tab>
      <Tab value={5}>5</Tab>
      <Tab value={6}>6</Tab>
      <Tab value={7}>7</Tab>
      <Tab value={8}>8</Tab>
      <Tab value={9}>9</Tab>
    </div>
  </Tabs>
</Preview>

## Circle

<Preview>
  <Tabs
    contained={tabStyle === 'contained'}
    underlined={tabStyle === 'underlined'}
    circle
  >
    <div class="tabList">
      <Tab value={1} class="h-12 w-12">1</Tab>
      <Tab value={2} class="1h-12 w-12">2</Tab>
      <Tab value={3} class="h-12 w-12">3</Tab>
    </div>
  </Tabs>
</Preview>

## Controlled

<Preview>
  <Tabs
    contained={tabStyle === 'contained'}
    underlined={tabStyle === 'underlined'}
    {selected}
  >
    <div class="tabList">
      <Tab value="all" style="width: 120px">All</Tab>
      <Tab value="missed" style="width: 120px">Missed</Tab>
      <Tab value="calls" style="width: 120px">Calls</Tab>
    </div>
  </Tabs>
</Preview>

<div class="mt-4">
  Select:
  <Button on:click={() => (selected = 0)}>All</Button>

<Button on:click={() => (selected = 1)}>Missed</Button>

<Button on:click={() => (selected = 2)}>Calls</Button>

</div>

## Controlled w/ with value (string)

<Preview>
  <Tabs
    contained={tabStyle === 'contained'}
    underlined={tabStyle === 'underlined'}
    selected={selectedStr}
  >
    <div class="tabList">
      <Tab value="all" style="width: 120px">All</Tab>
      <Tab value="missed" style="width: 120px">Missed</Tab>
      <Tab value="calls" style="width: 120px">Calls</Tab>
    </div>
  </Tabs>
</Preview>

<div class="mt-4">
  Select:
  <Button on:click={() => (selectedStr = 'all')}>All</Button>

<Button on:click={() => (selectedStr = 'missed')}>Missed</Button>

<Button on:click={() => (selectedStr = 'calls')}>Calls</Button>

</div>

## Controlled w/ with value (object)

<Preview>
  <Tabs
    contained={tabStyle === 'contained'}
    underlined={tabStyle === 'underlined'}
    selected={selectedObj}
  >
    <div class="tabList">
      <Tab value={allValue} style="width: 120px">All</Tab>
      <Tab value={missedValue} style="width: 120px">Missed</Tab>
      <Tab value={callsValue} style="width: 120px">Calls</Tab>
    </div>
  </Tabs>
</Preview>

<div class="mt-4">
  Select:
  <Button on:click={() => (selectedObj = allValue)}>All</Button>

<Button on:click={() => (selectedObj = missedValue)}>Missed</Button>

<Button on:click={() => (selectedObj = callsValue)}>Calls</Button>

</div>
