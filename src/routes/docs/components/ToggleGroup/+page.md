---
name: $name
sourceUrl: $sourceUrl
docUrl: $docUrl
---

<script>
  import toggleGroupApi from '$lib/components/ToggleGroup.svelte?raw&sveld';
  import toggleOptionApi from '$lib/components/ToggleOption.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';

  import Button from '$lib/components/Button.svelte';
  import Preview from '$lib/components/Preview.svelte';
  import Radio from '$lib/components/Radio.svelte';
  import ToggleGroup from '$lib/components/ToggleGroup.svelte';
  import ToggleOption from '$lib/components/ToggleOption.svelte';
  import TogglePanel from '$lib/components/TogglePanel.svelte';

  const allValue = {};
  const missedValue = {};
  const callsValue = {};

  let selected = 1;
  let selectedStr = 'missed';
  let selectedObj = missedValue;

  let optionStyle = 'contained';
</script>

# Examples

## Style

<div class="bg-white p-2 rounded border border-gray-300 flex gap-4">
  <Radio value="contained" bind:group={optionStyle}>Contained</Radio>
  <Radio value="underlined" bind:group={optionStyle}>Underlined</Radio>
</div>

## Panels

<Preview>
  <ToggleGroup
    contained={optionStyle === 'contained'}
    underlined={optionStyle === 'underlined'}
  >
    <ToggleOption value="all" class="w-32">All</ToggleOption>
    <ToggleOption value="missed" class="w-32">Missed</ToggleOption>
    <ToggleOption value="calls" class="w-32">Calls</ToggleOption>
    <div slot="panes" class="mt-2 p-4 bg-black/5 rounded border">
      <TogglePanel>All panel</TogglePanel>
      <TogglePanel>Missed panel</TogglePanel>
      <TogglePanel>Calls panel</TogglePanel>
    </div>
  </ToggleGroup>
</Preview>

## Vertical layout

<Preview>
  <ToggleGroup
    contained={optionStyle === 'contained'}
    underlined={optionStyle === 'underlined'}
    vertical
  >
    <ToggleOption value="all">All</ToggleOption>
    <ToggleOption value="missed">Missed</ToggleOption>
    <ToggleOption value="calls">Calls</ToggleOption>
  </ToggleGroup>
</Preview>

## Full width

<Preview>
  <ToggleGroup
    contained={optionStyle === 'contained'}
    underlined={optionStyle === 'underlined'}
    classes={{ options: 'w-full' }}
  >
    <ToggleOption value="all">All</ToggleOption>
    <ToggleOption value="missed">Missed</ToggleOption>
    <ToggleOption value="calls">Calls</ToggleOption>
  </ToggleGroup>
</Preview>

## Full width w/ vertical

<Preview>
  <ToggleGroup
    contained={optionStyle === 'contained'}
    underlined={optionStyle === 'underlined'}
    classes={{ options: 'w-full' }}
    vertical
  >
    <ToggleOption value="all">All</ToggleOption>
    <ToggleOption value="missed">Missed</ToggleOption>
    <ToggleOption value="calls">Calls</ToggleOption>
  </ToggleGroup>
</Preview>

## Grid layout

<Preview>
  <ToggleGroup
    contained={optionStyle === 'contained'}
    underlined={optionStyle === 'underlined'}
    classes={{ options: '!grid grid-rows-3 grid-cols-3' }}
  >
    <ToggleOption value={1}>1</ToggleOption>
    <ToggleOption value={2}>2</ToggleOption>
    <ToggleOption value={3}>3</ToggleOption>
    <ToggleOption value={4}>4</ToggleOption>
    <ToggleOption value={5}>5</ToggleOption>
    <ToggleOption value={6}>6</ToggleOption>
    <ToggleOption value={7}>7</ToggleOption>
    <ToggleOption value={8}>8</ToggleOption>
    <ToggleOption value={9}>9</ToggleOption>
  </ToggleGroup>
</Preview>

## Circle

<Preview>
  <ToggleGroup
    contained={optionStyle === 'contained'}
    underlined={optionStyle === 'underlined'}
    circle
  >
    <ToggleOption value={1} class="h-10 aspect-square">1</ToggleOption>
    <ToggleOption value={2} class="h-10 aspect-square">2</ToggleOption>
    <ToggleOption value={3} class="h-10 aspect-square">3</ToggleOption>
  </ToggleGroup>
</Preview>

## Controlled

<Preview>
  <ToggleGroup
    contained={optionStyle === 'contained'}
    underlined={optionStyle === 'underlined'}
    bind:value={selectedStr}
  >
    <ToggleOption value="all" class="w-32">All</ToggleOption>
    <ToggleOption value="missed" class="w-32">Missed</ToggleOption>
    <ToggleOption value="calls" class="w-32">Calls</ToggleOption>
  </ToggleGroup>
</Preview>

<div class="mt-4">
  Select:
  <Button on:click={() => (selectedStr = 'all')}>All</Button>
  <Button on:click={() => (selectedStr = 'missed')}>Missed</Button>
  <Button on:click={() => (selectedStr = 'calls')}>Calls</Button>
  <Button on:click={() => (selectedStr = null)}>Clear</Button>
</div>

## Controlled (object value)

<Preview>
  <ToggleGroup
    contained={optionStyle === 'contained'}
    underlined={optionStyle === 'underlined'}
    bind:value={selectedObj}
  >
    <ToggleOption value={allValue} class="w-32">All</ToggleOption>
    <ToggleOption value={missedValue} class="w-32">Missed</ToggleOption>
    <ToggleOption value={callsValue} class="w-32">Calls</ToggleOption>
  </ToggleGroup>
</Preview>

<div class="mt-4">
  Select:
  <Button on:click={() => (selectedObj = allValue)}>All</Button>
  <Button on:click={() => (selectedObj = missedValue)}>Missed</Button>
  <Button on:click={() => (selectedObj = callsValue)}>Calls</Button>
  <Button on:click={() => (selectedObj = null)}>Clear</Button>
</div>

## Overflow scrollIntoView

<Preview>
  <ToggleGroup
    contained={optionStyle === 'contained'}
    underlined={optionStyle === 'underlined'}
    value={selected}
    classes={{ options: 'overflow-auto w-full' }}
    autoscroll
  >
    <ToggleOption value={1} class="w-32">One</ToggleOption>
    <ToggleOption value={2} class="w-32">Two</ToggleOption>
    <ToggleOption value={3} class="w-32">Three</ToggleOption>
    <ToggleOption value={4} class="w-32">Four</ToggleOption>
    <ToggleOption value={5} class="w-32">Five</ToggleOption>
    <ToggleOption value={6} class="w-32">Six</ToggleOption>
    <ToggleOption value={7} class="w-32">Seven</ToggleOption>
    <ToggleOption value={8} class="w-32">Eight</ToggleOption>
    <ToggleOption value={9} class="w-32">Nine</ToggleOption>
    <ToggleOption value={10} class="w-32">Ten</ToggleOption>
  </ToggleGroup>
</Preview>

<div class="mt-4">
  Select:
  <Button on:click={() => (selected = 1)}>1</Button>
  <Button on:click={() => (selected = 2)}>2</Button>
  <Button on:click={() => (selected = 3)}>3</Button>
  <Button on:click={() => (selected = 4)}>4</Button>
  <Button on:click={() => (selected = 5)}>5</Button>
  <Button on:click={() => (selected = 6)}>6</Button>
  <Button on:click={() => (selected = 7)}>7</Button>
  <Button on:click={() => (selected = 8)}>8</Button>
  <Button on:click={() => (selected = 9)}>9</Button>
  <Button on:click={() => (selected = 10)}>10</Button>
</div>

# ToggleGroup API

<ApiDocs api={toggleGroupApi} />

# ToggleOption API

<ApiDocs api={toggleOptionApi} />
