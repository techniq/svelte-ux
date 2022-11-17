---
name: $name
sourceUrl: $sourceUrl
docUrl: $docUrl
---

<script lang="ts">
	import Preview from '$lib/components/Preview.svelte';

	import { scrollIntoView, scrollShadow } from '$lib/actions/scroll';

  const itemCount = 10;
  const items = Array.from({ length: itemCount }).map((_, i) => `Item: ${i}`)
  let scrolledIndex = 0;
</script>

## scrollIntoView

### Smootly scroll element into center of view

<Preview>
  <input type="range" bind:value={scrolledIndex} min={0} max={itemCount - 1} /> {scrolledIndex}
  <div class="h-40 overflow-auto border rounded">
    {#each items as item, i}
      <div
        use:scrollIntoView={{ condition: scrolledIndex === i }}
        class:bg-gray-200={scrolledIndex === i}
      >
        {item}
      </div>
    {/each}
  </div>
</Preview>

## scrollShadow

### Add shadows to indicate scrolling available

<Preview>
  <div class="h-40 overflow-auto border rounded" use:scrollShadow>
    {#each items as item, i}
      <div>{item}</div>
    {/each}
  </div>
</Preview>

<Preview>
  <div class="overflow-auto border rounded flex whitespace-nowrap gap-8 p-2" use:scrollShadow>
    {#each items as item, i}
      <div class="p-4 border">{item}</div>
    {/each}
  </div>
</Preview>
