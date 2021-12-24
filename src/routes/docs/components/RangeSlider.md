---
component: $component
filename: $filename
---

<script>
  import { mdiMagnify, mdiPlus } from '@mdi/js';

  import api from '$lib/components/RangeSlider.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';

  import Preview from '$lib/components/Preview.svelte';
  import RangeSlider from '$lib/components/RangeSlider.svelte';

  let value = [25, 75];
</script>

# Examples

## Description

<div class="prose">

- Drag start and end points individually, or drag the middle together
- Double click start, end or range to set min/max
- Use keyboard arrow keys to adjust last changed

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

# API

<ApiDocs {api} />
