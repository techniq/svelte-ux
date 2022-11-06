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

<!--
  - [ ] Selection
    - `data-key` only allows string keys, but allows attaching to dom element
    - what about enum / toggle button use cases?
  - [ ] Support changing color of indicator based on selection
  - [ ] Support coloring options based on selection (.selected class?, add bold font, etc)
  - [ ] Pass fallback transition to <ToggleGroup contained={optionStyle==='contained'} underlined={optionStyle==='underlined'}> (fade, scale, etc)
  - [x] Rename `key` to `value`?
  - [ ] Support overflow scrolling (with button)
  - Reference:
    - https://svelte.dev/repl/8e68120858e5322272dc9136c4bb79cc?version=3.7.0
-->

# Examples

## Style

<label>
  <input type="radio" value="contained" bind:group={optionStyle} />
  Contained (Apple)
</label>
<label>
  <input type="radio" value="underlined" bind:group={optionStyle} />
  Underlined (Twitter)
</label>

## Panels

<Preview>
  <ToggleGroup
    contained={optionStyle === 'contained'}
    underlined={optionStyle === 'underlined'}
  >
    <div class="options">
      <ToggleOption value="all" class="w-32">All</ToggleOption>
      <ToggleOption value="missed" class="w-32">Missed</ToggleOption>
      <ToggleOption value="calls" class="w-32">Calls</ToggleOption>
    </div>
    <div class="mt-2 p-4 bg-black/5 rounded border">
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
    <div class="options">
      <ToggleOption value="all">All</ToggleOption>
      <ToggleOption value="missed">Missed</ToggleOption>
      <ToggleOption value="calls">Calls</ToggleOption>
    </div>
  </ToggleGroup>
</Preview>

## Full width

<Preview>
  <ToggleGroup
    contained={optionStyle === 'contained'}
    underlined={optionStyle === 'underlined'}
  >
    <div class="options w-full">
      <ToggleOption value="all">All</ToggleOption>
      <ToggleOption value="missed">Missed</ToggleOption>
      <ToggleOption value="calls">Calls</ToggleOption>
    </div>
  </ToggleGroup>
</Preview>

## Full width w/ vertical

<Preview>
  <ToggleGroup
    contained={optionStyle === 'contained'}
    underlined={optionStyle === 'underlined'}
    vertical
  >
    <div class="options w-full">
      <ToggleOption value="all">All</ToggleOption>
      <ToggleOption value="missed">Missed</ToggleOption>
      <ToggleOption value="calls">Calls</ToggleOption>
    </div>
  </ToggleGroup>
</Preview>

## Grid layout

<Preview>
  <ToggleGroup
    contained={optionStyle === 'contained'}
    underlined={optionStyle === 'underlined'}
  >
    <div class="options !grid grid-rows-3 grid-cols-3">
      <ToggleOption value={1}>1</ToggleOption>
      <ToggleOption value={2}>2</ToggleOption>
      <ToggleOption value={3}>3</ToggleOption>
      <ToggleOption value={4}>4</ToggleOption>
      <ToggleOption value={5}>5</ToggleOption>
      <ToggleOption value={6}>6</ToggleOption>
      <ToggleOption value={7}>7</ToggleOption>
      <ToggleOption value={8}>8</ToggleOption>
      <ToggleOption value={9}>9</ToggleOption>
    </div>
  </ToggleGroup>
</Preview>

## Circle

<Preview>
  <ToggleGroup
    contained={optionStyle === 'contained'}
    underlined={optionStyle === 'underlined'}
    circle
  >
    <div class="options">
      <ToggleOption value={1} class="h-10 aspect-square">1</ToggleOption>
      <ToggleOption value={2} class="h-10 aspect-square">2</ToggleOption>
      <ToggleOption value={3} class="h-10 aspect-square">3</ToggleOption>
    </div>
  </ToggleGroup>
</Preview>

## Controlled

<Preview>
  <ToggleGroup
    contained={optionStyle === 'contained'}
    underlined={optionStyle === 'underlined'}
    value={selected}
  >
    <div class="options">
      <ToggleOption value="all" class="w-32">All</ToggleOption>
      <ToggleOption value="missed" class="w-32">Missed</ToggleOption>
      <ToggleOption value="calls" class="w-32">Calls</ToggleOption>
    </div>
  </ToggleGroup>
</Preview>

<div class="mt-4">
  Select:
  <Button on:click={() => (selected = 0)}>All</Button>
  <Button on:click={() => (selected = 1)}>Missed</Button>
  <Button on:click={() => (selected = 2)}>Calls</Button>
</div>

## Controlled w/ with value (string)

<Preview>
  <ToggleGroup
    contained={optionStyle === 'contained'}
    underlined={optionStyle === 'underlined'}
    value={selectedStr}
  >
    <div class="options">
      <ToggleOption value="all" class="w-32">All</ToggleOption>
      <ToggleOption value="missed" class="w-32">Missed</ToggleOption>
      <ToggleOption value="calls" class="w-32">Calls</ToggleOption>
    </div>
  </ToggleGroup>
</Preview>

<div class="mt-4">
  Select:
  <Button on:click={() => (selectedStr = 'all')}>All</Button>
  <Button on:click={() => (selectedStr = 'missed')}>Missed</Button>
  <Button on:click={() => (selectedStr = 'calls')}>Calls</Button>
</div>

## Controlled w/ with value (object)

<Preview>
  <ToggleGroup
    contained={optionStyle === 'contained'}
    underlined={optionStyle === 'underlined'}
    value={selectedObj}
  >
    <div class="options">
      <ToggleOption value={allValue} class="w-32">All</ToggleOption>
      <ToggleOption value={missedValue} class="w-32">Missed</ToggleOption>
      <ToggleOption value={callsValue} class="w-32">Calls</ToggleOption>
    </div>
  </ToggleGroup>
</Preview>

<div class="mt-4">
  Select:
  <Button on:click={() => (selectedObj = allValue)}>All</Button>
  <Button on:click={() => (selectedObj = missedValue)}>Missed</Button>
  <Button on:click={() => (selectedObj = callsValue)}>Calls</Button>
</div>

## Overflow scrollIntoView

<Preview>
  <ToggleGroup
    contained={optionStyle === 'contained'}
    underlined={optionStyle === 'underlined'}
    value={selected}
  >
    <div class="options overflow-auto w-full">
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
    </div>
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
