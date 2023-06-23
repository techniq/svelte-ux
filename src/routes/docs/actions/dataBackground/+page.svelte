<script lang="ts">
  import { sort } from 'd3-array';

  import Preview from '$lib/components/Preview.svelte';
  import Button from '$lib/components/Button.svelte';
  import Code from '$lib/components/Code.svelte';
  import TweenedValue from '$lib/components/TweenedValue.svelte';

  import { dataBackground } from '$lib/actions/dataBackground';
  import { randomInteger } from '$lib/utils/number';
  import ToggleGroup from '$lib/components/ToggleGroup.svelte';
  import ToggleOption from '$lib/components/ToggleOption.svelte';
  import Field from '$lib/components/Field.svelte';
  import Checkbox from '$lib/components/Checkbox.svelte';
  import Switch from '$lib/components/Switch.svelte';
  import NumberStepper from '$lib/components/NumberStepper.svelte';

  let originalDomain = [-100, 100];

  function getValues() {
    return Array.from({ length: 20 }).map(() =>
      randomInteger(originalDomain[0], originalDomain[1])
    );
  }

  let values = getValues();
  let domainSelected = 'original'; // 'derived'
  let sorted = false;
  let inset = [0, 0];
  let baseline = false;
  let duration = 300;

  // Use original domain (ex. -100 => 100) or derive based on data
  $: domain =
    domainSelected === 'original' ? originalDomain : [Math.min(...values), Math.max(...values)];
</script>

<h1>Usage</h1>

<Code source={`import { dataBackground } from 'svelte-ux';`} language="javascript" class="mb-4" />

<div class="grid gap-2">
  <div class="grid grid-cols-[2fr,1fr,1fr] gap-2">
    <Field label="Domain">
      <ToggleGroup
        bind:value={domainSelected}
        variant="contained"
        classes={{ root: 'w-full', options: 'w-full' }}
      >
        <ToggleOption value="original">Original</ToggleOption>
        <ToggleOption value="derived">Derived</ToggleOption>
      </ToggleGroup>
    </Field>

    <Field label="Sorted" let:id classes={{ container: 'h-full items-center', input: 'mt-3' }}>
      <Switch bind:checked={sorted} {id} />
    </Field>

    <Field
      label="Show baseline"
      let:id
      classes={{ container: 'h-full items-center', input: 'mt-3' }}
    >
      <Switch bind:checked={baseline} {id} />
    </Field>
  </div>

  <div class="grid grid-cols-[1fr,1fr] gap-2">
    <Field label="Domain range">
      <div class="grid grid-cols-[auto,1fr] gap-2">
        <span>min:</span>
        <NumberStepper bind:value={originalDomain[0]} dense class="w-32" />
        <span>max:</span>
        <NumberStepper bind:value={originalDomain[1]} dense class="w-32" />
      </div>
    </Field>

    <Field label="Inset">
      <div class="grid grid-cols-[auto,1fr] gap-2">
        <span>x:</span>
        <NumberStepper bind:value={inset[0]} dense min={0} />
        <span>y:</span>
        <NumberStepper bind:value={inset[1]} dense min={0} />
      </div>
    </Field>
  </div>
  <Field label="Tweened duration">
    <div class="grid grid-cols-[1fr,40px] gap-3 w-full">
      <input type="range" bind:value={duration} max={1000} />
      <span class="text-right pr-1">{duration}</span>
    </div>
  </Field>

  <Button on:click={() => (values = getValues())} variant="fill" color="blue">Update data</Button>
</div>

<h2>dataBackground</h2>

<Preview>
  <table class="w-full _w-40 border">
    {#each sorted ? sort(values) : values as value}
      <!-- re-mount if duration changes so action is updated -->
      {#key duration}
        <tr>
          <td
            class="text-right border border-gray-100 tabular-nums"
            use:dataBackground={{
              value,
              color: value > 0 ? 'hsl(140 100% 80%)' : 'hsl(0 100% 80%)',
              domain,
              bar: true,
              inset,
              baseline,
              tweened: { duration },
            }}
          >
            <TweenedValue {value} format="integer" options={{ duration }} />
          </td>
        </tr>
      {/key}
    {/each}
  </table>
</Preview>
