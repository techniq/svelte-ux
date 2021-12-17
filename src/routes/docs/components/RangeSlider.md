<script>
  import { mdiMagnify, mdiPlus } from '@mdi/js';

  import Preview from '$lib/components/Preview.svelte';
  import RangeSlider from '$lib/components/RangeSlider.svelte';

  let value = [25, 75];
</script>

## Basic

<Preview>
  <RangeSlider />
</Preview>

## bind:value

<Preview>
  <RangeSlider bind:value />
</Preview>

## min/max

<Preview>
  <RangeSlider min={50} max={100} />
</Preview>

## step

<Preview>
  <RangeSlider max={1} step={0.01} />
</Preview>
