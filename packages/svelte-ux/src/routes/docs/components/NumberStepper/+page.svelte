<script lang="ts">
  import { NumberStepper } from 'svelte-ux';
  import Preview from '$lib/components/Preview.svelte';

  let value = 10;
</script>

<h1>Examples</h1>

<h2>Basic</h2>

<Preview>
  <NumberStepper />
</Preview>

<h2>bind:value</h2>

<Preview>
  <NumberStepper bind:value />
  {value}
</Preview>

<h2>on:change</h2>

<Preview>
  <NumberStepper on:change={(e) => console.log(e.detail.value)} />
</Preview>

<h2>Dense</h2>

<Preview>
  <NumberStepper dense />
</Preview>

<h2>Min / Max</h2>

<Preview>
  <NumberStepper min={0} max={10} />
</Preview>

<h2>Step</h2>

<Preview>
  <NumberStepper step={0.1} />
</Preview>

<h2>Prefix</h2>

<Preview>
  <NumberStepper class="w-28">
    <span slot="prefix">$</span>
  </NumberStepper>
</Preview>

<h2>Suffix</h2>

<Preview>
  <NumberStepper class="w-28">
    <span slot="suffix">kg</span>
  </NumberStepper>
</Preview>
