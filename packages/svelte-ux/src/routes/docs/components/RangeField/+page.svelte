<script lang="ts">
  import { RangeField } from 'svelte-ux';
  import Preview from '$lib/components/Preview.svelte';

  let value = 10;
</script>

<h1>Examples</h1>

<h2>basic</h2>

<Preview>
  <RangeField />
</Preview>

<h2>label</h2>

<Preview>
  <RangeField label="Range" />
</Preview>

<h2>bind:value</h2>

<Preview>
  <RangeField bind:value />
  {value}
</Preview>

<h2>on:change</h2>

<Preview>
  <RangeField on:change={(e) => console.log(e.detail.value)} />
</Preview>

<h2>min / max</h2>

<Preview>
  <RangeField min={0} max={10} />
</Preview>

<h2>step</h2>

<Preview>
  <RangeField min={0} max={10} step={0.1} />
</Preview>

<h2>format</h2>

<Preview>
  <RangeField min={0} max={10} step={0.1} format="decimal" />
</Preview>
