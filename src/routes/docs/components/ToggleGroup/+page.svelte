<script lang="ts">
  import type { ComponentProps } from 'svelte';
  import toggleGroupApi from '$lib/components/ToggleGroup.svelte?raw&sveld';
  import toggleOptionApi from '$lib/components/ToggleOption.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';

  import Preview from '$lib/components/Preview.svelte';
  import Button from '$lib/components/Button.svelte';
  import Field from '$lib/components/Field.svelte';
  import Radio from '$lib/components/Radio.svelte';
  import ToggleGroup from '$lib/components/ToggleGroup.svelte';
  import ToggleOption from '$lib/components/ToggleOption.svelte';
  import TogglePanel from '$lib/components/TogglePanel.svelte';

  const allValue = {};
  const missedValue = {};
  const callsValue = {};

  let selected = 1;
  let selectedStr = 'all';
  let selectedObj = missedValue;

  let variant: ComponentProps<ToggleGroup>['variant'] = 'default';
  let size: ComponentProps<ToggleGroup>['size'] = 'md';
  let rounded: ComponentProps<ToggleGroup>['rounded'] = true;
  let inset: ComponentProps<ToggleGroup>['inset'] = false;
  let gap: ComponentProps<ToggleGroup>['gap'] = false;
  let vertical: ComponentProps<ToggleGroup>['vertical'] = false;
  let showPanes = false;
</script>

<h1>Playground</h1>

<div class="grid grid-cols-[1fr,200px] gap-3">
  <div>
    <Preview>
      <ToggleGroup {variant} {size} {rounded} {gap} {inset} {vertical}>
        <ToggleOption value="all">All</ToggleOption>
        <ToggleOption value="missed">Missed</ToggleOption>
        <ToggleOption value="calls">Calls</ToggleOption>
        <svelte:fragment slot="panes">
          {#if showPanes}
            <div class="mt-2 p-4 bg-black/5 rounded border">
              <TogglePanel>All panel</TogglePanel>
              <TogglePanel>Missed panel</TogglePanel>
              <TogglePanel>Calls panel</TogglePanel>
            </div>
          {/if}
        </svelte:fragment>
      </ToggleGroup>
    </Preview>
  </div>

  <div class="grid gap-2">
    <Field label="Variant" classes={{ input: 'grid gap-1' }}>
      <Radio name="variant" value="default" bind:group={variant}>default</Radio>
      <Radio name="variant" value="outline" bind:group={variant}>outline</Radio>
      <Radio name="variant" value="fill" bind:group={variant}>fill</Radio>
      <Radio name="variant" value="fill-light" bind:group={variant}>fill-light</Radio>
      <Radio name="variant" value="underline" bind:group={variant}>underline</Radio>
    </Field>

    <Field label="Size" classes={{ input: 'grid gap-1' }}>
      <Radio name="size" value="xs" bind:group={size}>xs</Radio>
      <Radio name="size" value="sm" bind:group={size}>sm</Radio>
      <Radio name="size" value="md" bind:group={size}>md</Radio>
      <Radio name="size" value="lg" bind:group={size}>lg</Radio>
    </Field>

    <Field label="Rounded" classes={{ input: 'grid gap-1' }}>
      <Radio name="rounded" value={false} bind:group={rounded}>false</Radio>
      <Radio name="rounded" value={true} bind:group={rounded}>true</Radio>
      <Radio name="rounded" value="full" bind:group={rounded}>full</Radio>
    </Field>

    <Field label="Gap" classes={{ input: 'grid gap-1' }}>
      <Radio name="gap" value={false} bind:group={gap}>false</Radio>
      <Radio name="gap" value={true} bind:group={gap}>true</Radio>
      <Radio name="gap" value="px" bind:group={gap}>px</Radio>
    </Field>

    <Field label="Inset" classes={{ input: 'grid gap-1' }}>
      <Radio name="inset" value={false} bind:group={inset}>false</Radio>
      <Radio name="inset" value={true} bind:group={inset}>true</Radio>
    </Field>

    <Field label="Vertical" classes={{ input: 'grid gap-1' }}>
      <Radio name="vertical" value={false} bind:group={vertical}>false</Radio>
      <Radio name="vertical" value={true} bind:group={vertical}>true</Radio>
    </Field>

    <Field label="Show panes" classes={{ input: 'grid gap-1' }}>
      <Radio name="panes" value={false} bind:group={showPanes}>false</Radio>
      <Radio name="panes" value={true} bind:group={showPanes}>true</Radio>
    </Field>
  </div>
</div>

<h1>Examples</h1>

<h2>Variants</h2>

{#each ['default', 'outline', 'fill', 'fill-light', 'underline'] as variant}
  <h3>{variant}</h3>
  <Preview>
    <div class="inline-grid gap-2">
      <ToggleGroup {variant} bind:value={selectedStr}>
        <ToggleOption value="all">All</ToggleOption>
        <ToggleOption value="missed">Missed</ToggleOption>
        <ToggleOption value="calls">Calls</ToggleOption>
      </ToggleGroup>

      <ToggleGroup {variant} bind:value={selectedStr} rounded={false}>
        <ToggleOption value="all">All</ToggleOption>
        <ToggleOption value="missed">Missed</ToggleOption>
        <ToggleOption value="calls">Calls</ToggleOption>
      </ToggleGroup>

      <ToggleGroup {variant} bind:value={selectedStr} rounded="full">
        <ToggleOption value="all">All</ToggleOption>
        <ToggleOption value="missed">Missed</ToggleOption>
        <ToggleOption value="calls">Calls</ToggleOption>
      </ToggleGroup>

      <ToggleGroup {variant} bind:value={selectedStr} rounded="full" inset>
        <ToggleOption value="all">All</ToggleOption>
        <ToggleOption value="missed">Missed</ToggleOption>
        <ToggleOption value="calls">Calls</ToggleOption>
      </ToggleGroup>

      <ToggleGroup {variant} bind:value={selectedStr} gap>
        <ToggleOption value="all">All</ToggleOption>
        <ToggleOption value="missed">Missed</ToggleOption>
        <ToggleOption value="calls">Calls</ToggleOption>
      </ToggleGroup>

      <ToggleGroup {variant} bind:value={selectedStr} gap="px">
        <ToggleOption value="all">All</ToggleOption>
        <ToggleOption value="missed">Missed</ToggleOption>
        <ToggleOption value="calls">Calls</ToggleOption>
      </ToggleGroup>
    </div>
  </Preview>
{/each}

<h2>Vertical layout</h2>

<Preview>
  <ToggleGroup vertical>
    <ToggleOption value="all">All</ToggleOption>
    <ToggleOption value="missed">Missed</ToggleOption>
    <ToggleOption value="calls">Calls</ToggleOption>
  </ToggleGroup>
</Preview>

<h2>Vertical with fixed width</h2>

<Preview>
  <ToggleGroup class="w-[300px]" vertical>
    <ToggleOption value="all">All</ToggleOption>
    <ToggleOption value="missed">Missed</ToggleOption>
    <ToggleOption value="calls">Calls</ToggleOption>
  </ToggleGroup>
</Preview>

<h2>Left aligned tabs with fixed height</h2>

<Preview>
  <ToggleGroup variant="underline" classes={{ options: 'justify-start h-10' }}>
    <ToggleOption value="all">All</ToggleOption>
    <ToggleOption value="missed">Missed</ToggleOption>
    <ToggleOption value="calls">Calls</ToggleOption>
  </ToggleGroup>
</Preview>

<h2>Grid layout</h2>

<Preview>
  <ToggleGroup classes={{ options: 'grid-rows-3 grid-cols-3' }}>
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

<h2>Circle</h2>

<Preview>
  <ToggleGroup rounded="full" classes={{ options: 'inline-grid' }}>
    <ToggleOption value={1} class="h-10 aspect-square">1</ToggleOption>
    <ToggleOption value={2} class="h-10 aspect-square">2</ToggleOption>
    <ToggleOption value={3} class="h-10 aspect-square">3</ToggleOption>
  </ToggleGroup>
</Preview>

<h2>Controlled</h2>

<Preview>
  <ToggleGroup bind:value={selectedStr}>
    <ToggleOption value="all">All</ToggleOption>
    <ToggleOption value="missed">Missed</ToggleOption>
    <ToggleOption value="calls">Calls</ToggleOption>
  </ToggleGroup>
</Preview>

<div class="mt-4">
  Select:
  <Button on:click={() => (selectedStr = 'all')}>All</Button>
  <Button on:click={() => (selectedStr = 'missed')}>Missed</Button>
  <Button on:click={() => (selectedStr = 'calls')}>Calls</Button>
  <Button on:click={() => (selectedStr = null)}>Clear</Button>
</div>

<h2>Controlled with null option</h2>

<Preview>
  <ToggleGroup bind:value={selectedStr}>
    <ToggleOption value={null}>None</ToggleOption>
    <ToggleOption value="all">All</ToggleOption>
    <ToggleOption value="missed">Missed</ToggleOption>
    <ToggleOption value="calls">Calls</ToggleOption>
  </ToggleGroup>
</Preview>

<div class="mt-4">
  Select:
  <Button on:click={() => (selectedStr = null)}>None</Button>
  <Button on:click={() => (selectedStr = 'all')}>All</Button>
  <Button on:click={() => (selectedStr = 'missed')}>Missed</Button>
  <Button on:click={() => (selectedStr = 'calls')}>Calls</Button>
</div>

<h2>Controlled with undefined option</h2>

<Preview>
  <ToggleGroup bind:value={selectedStr}>
    <ToggleOption value={undefined}>None</ToggleOption>
    <ToggleOption value="all">All</ToggleOption>
    <ToggleOption value="missed">Missed</ToggleOption>
    <ToggleOption value="calls">Calls</ToggleOption>
  </ToggleGroup>
</Preview>

<div class="mt-4">
  Select:
  <Button on:click={() => (selectedStr = undefined)}>None</Button>
  <Button on:click={() => (selectedStr = 'all')}>All</Button>
  <Button on:click={() => (selectedStr = 'missed')}>Missed</Button>
  <Button on:click={() => (selectedStr = 'calls')}>Calls</Button>
</div>

<h2>Controlled (object value)</h2>

<Preview>
  <ToggleGroup bind:value={selectedObj}>
    <ToggleOption value={allValue}>All</ToggleOption>
    <ToggleOption value={missedValue}>Missed</ToggleOption>
    <ToggleOption value={callsValue}>Calls</ToggleOption>
  </ToggleGroup>
</Preview>

<div class="mt-4">
  Select:
  <Button on:click={() => (selectedObj = allValue)}>All</Button>
  <Button on:click={() => (selectedObj = missedValue)}>Missed</Button>
  <Button on:click={() => (selectedObj = callsValue)}>Calls</Button>
  <Button on:click={() => (selectedObj = null)}>Clear</Button>
</div>

<h2>Overflow scrollIntoView</h2>

<Preview>
  <ToggleGroup
    value={selected}
    classes={{ options: 'w-full overflow-auto scrollbar-none' }}
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

<h1>ToggleGroup API</h1>

<ApiDocs api={toggleGroupApi} />

<h1>ToggleOption API</h1>

<ApiDocs api={toggleOptionApi} />
