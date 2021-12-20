<script>
  import { mdiMagnify, mdiPlus } from '@mdi/js';

  import Preview from '$lib/components/Preview.svelte';
  import RangeSlider from '$lib/components/RangeSlider.svelte';

  let value = [25, 75];
</script>

<div class="prose">

- Double click start, end or range to set min/max
- Keyboard control start, end, or range based on last set

</div>

## basic

<Preview>
  <RangeSlider />
</Preview>

## disabled

<Preview>
  <RangeSlider disabled />
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

### small

<Preview>
  <RangeSlider max={1} step={0.01} />
</Preview>

## step

### large

<Preview>
  <RangeSlider max={100} step={10} />
</Preview>
