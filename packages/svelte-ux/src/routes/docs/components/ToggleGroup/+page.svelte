<script lang="ts">
  import type { ComponentProps } from 'svelte';

  import { ApiDocs, Button, Field, Radio, ToggleGroup, ToggleOption, TogglePanel } from 'svelte-ux';

  import Preview from '$lib/components/Preview.svelte';

  import toggleGroupApi from '$lib/components/ToggleGroup.svelte?raw&sveld';
  import toggleOptionApi from '$lib/components/ToggleOption.svelte?raw&sveld';

  const allValue = {};
  const missedValue = {};
  const callsValue = {};

  let selected = $state(1);
  let selectedStr: string | undefined | null = $state('all');
  let selectedObj: object | undefined | null = $state(missedValue);

  let variant: ComponentProps<typeof ToggleGroup>['variant'] = $state('default');
  let size: ComponentProps<typeof ToggleGroup>['size'] = $state('md');
  let rounded: ComponentProps<typeof ToggleGroup>['rounded'] = $state(true);
  let inset: ComponentProps<typeof ToggleGroup>['inset'] = $state(false);
  let gap: ComponentProps<typeof ToggleGroup>['gap'] = $state(false);
  let vertical: ComponentProps<typeof ToggleGroup>['vertical'] = $state(false);
  let showPanes = $state(false);

  const variants = [
    'default',
    'outline',
    'fill',
    'fill-light',
    'fill-surface',
    'underline',
  ] as const;
</script>

<h1>Playground</h1>

<div class="grid gap-2">
  <div>
    <Preview>
      <ToggleGroup {variant} {size} {rounded} {gap} {inset} {vertical}>
        <ToggleOption value="all">All</ToggleOption>
        <ToggleOption value="missed">Missed</ToggleOption>
        <ToggleOption value="calls">Calls</ToggleOption>

        {#snippet panes()}
          {#if showPanes}
            <div class="mt-2 p-4 bg-surface-content/5 rounded border">
              <TogglePanel>All panel</TogglePanel>
              <TogglePanel>Missed panel</TogglePanel>
              <TogglePanel>Calls panel</TogglePanel>
            </div>
          {/if}
        {/snippet}
      </ToggleGroup>
    </Preview>
  </div>

  <Field label="Variant" classes={{ input: 'flex flex-wrap gap-3' }}>
    <Radio name="variant" value="default" bind:group={variant}>default</Radio>
    <Radio name="variant" value="outline" bind:group={variant}>outline</Radio>
    <Radio name="variant" value="fill" bind:group={variant}>fill</Radio>
    <Radio name="variant" value="fill-light" bind:group={variant}>fill-light</Radio>
    <Radio name="variant" value="fill-surface" bind:group={variant}>fill-surface</Radio>
    <Radio name="variant" value="underline" bind:group={variant}>underline</Radio>
  </Field>

  <div class="grid md:grid-cols-3 gap-2">
    <Field label="Size" classes={{ container: 'h-full', input: 'flex gap-3 md:grid md:gap-1' }}>
      <Radio name="size" value="xs" bind:group={size}>xs</Radio>
      <Radio name="size" value="sm" bind:group={size}>sm</Radio>
      <Radio name="size" value="md" bind:group={size}>md</Radio>
      <Radio name="size" value="lg" bind:group={size}>lg</Radio>
    </Field>

    <Field label="Rounded" classes={{ container: 'h-full', input: 'flex gap-3 md:grid md:gap-1' }}>
      <Radio name="rounded" value={false} bind:group={rounded}>false</Radio>
      <Radio name="rounded" value={true} bind:group={rounded}>true</Radio>
      <Radio name="rounded" value="full" bind:group={rounded}>full</Radio>
    </Field>

    <Field label="Gap" classes={{ container: 'h-full', input: 'flex gap-3 md:grid md:gap-1' }}>
      <Radio name="gap" value={false} bind:group={gap}>false</Radio>
      <Radio name="gap" value={true} bind:group={gap}>true</Radio>
      <Radio name="gap" value="px" bind:group={gap}>px</Radio>
    </Field>

    <Field label="Inset" classes={{ input: 'flex gap-3 md:grid md:gap-1' }}>
      <Radio name="inset" value={false} bind:group={inset}>false</Radio>
      <Radio name="inset" value={true} bind:group={inset}>true</Radio>
    </Field>

    <Field label="Vertical" classes={{ input: 'flex gap-3 md:grid md:gap-1' }}>
      <Radio name="vertical" value={false} bind:group={vertical}>false</Radio>
      <Radio name="vertical" value={true} bind:group={vertical}>true</Radio>
    </Field>

    <Field label="Show panes" classes={{ input: 'flex gap-3 md:grid md:gap-1' }}>
      <Radio name="panes" value={false} bind:group={showPanes}>false</Radio>
      <Radio name="panes" value={true} bind:group={showPanes}>true</Radio>
    </Field>
  </div>
</div>

<h1>Examples</h1>

<h2>Variants</h2>

{#each variants as variant}
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
  <Button onclick={() => (selectedStr = 'all')}>All</Button>
  <Button onclick={() => (selectedStr = 'missed')}>Missed</Button>
  <Button onclick={() => (selectedStr = 'calls')}>Calls</Button>
  <Button onclick={() => (selectedStr = null)}>Clear</Button>
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
  <Button onclick={() => (selectedStr = null)}>None</Button>
  <Button onclick={() => (selectedStr = 'all')}>All</Button>
  <Button onclick={() => (selectedStr = 'missed')}>Missed</Button>
  <Button onclick={() => (selectedStr = 'calls')}>Calls</Button>
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
  <Button onclick={() => (selectedStr = undefined)}>None</Button>
  <Button onclick={() => (selectedStr = 'all')}>All</Button>
  <Button onclick={() => (selectedStr = 'missed')}>Missed</Button>
  <Button onclick={() => (selectedStr = 'calls')}>Calls</Button>
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
  <Button onclick={() => (selectedObj = allValue)}>All</Button>
  <Button onclick={() => (selectedObj = missedValue)}>Missed</Button>
  <Button onclick={() => (selectedObj = callsValue)}>Calls</Button>
  <Button onclick={() => (selectedObj = null)}>Clear</Button>
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
  <Button onclick={() => (selected = 1)}>1</Button>
  <Button onclick={() => (selected = 2)}>2</Button>
  <Button onclick={() => (selected = 3)}>3</Button>
  <Button onclick={() => (selected = 4)}>4</Button>
  <Button onclick={() => (selected = 5)}>5</Button>
  <Button onclick={() => (selected = 6)}>6</Button>
  <Button onclick={() => (selected = 7)}>7</Button>
  <Button onclick={() => (selected = 8)}>8</Button>
  <Button onclick={() => (selected = 9)}>9</Button>
  <Button onclick={() => (selected = 10)}>10</Button>
</div>

<h1>ToggleGroup API</h1>

<ApiDocs api={toggleGroupApi} />

<h1>ToggleOption API</h1>

<ApiDocs api={toggleOptionApi} />
