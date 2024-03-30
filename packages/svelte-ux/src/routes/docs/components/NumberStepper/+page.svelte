<script lang="ts">
  import NumberStepper from '$lib/components/NumberStepper.svelte';
  import Preview from '$lib/components/Preview.svelte';

  let value = 10;
</script>

<h1>Examples</h1>

<h2>basic</h2>

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

<h2>dense</h2>

<Preview>
  <NumberStepper dense />
</Preview>

<h2>min / max</h2>

<Preview>
  <NumberStepper min={0} max={10} />
</Preview>

<h2>step</h2>

<Preview>
  <NumberStepper step={0.1} />
</Preview>
