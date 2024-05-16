<script lang="ts">
  import Preview from '$lib/components/Preview.svelte';
  import RangeSlider from '$lib/components/RangeSlider.svelte';

  let value = [25, 75];
</script>

<h1>Examples</h1>

<h2>Description</h2>

<h2>basic</h2>

<Preview>
  <RangeSlider />
</Preview>

<h2>disabled</h2>

<Preview>
  <RangeSlider disabled />
</Preview>

<h2>bind:value</h2>

<Preview>
  <RangeSlider bind:value />
</Preview>

<h2>min/max</h2>

<Preview>
  <RangeSlider min={50} max={100} />
</Preview>

<h2>step</h2>

<h3>small</h3>

<Preview>
  <RangeSlider max={1} step={0.01} />
</Preview>

<h2>step</h2>

<h3>large</h3>

<Preview>
  <RangeSlider max={100} step={10} />
</Preview>

<h2>disableTooltips</h2>

<Preview>
  <RangeSlider disableTooltips />
</Preview>
