<script lang="ts">
	import Preview from '$lib/components/Preview.svelte';

	import { scrollIntoView } from '$lib/actions/scroll';

  const itemCount = 20;
  const items = Array.from({ length: itemCount }).map((_, i) => `Item: ${i}`)
  let scrolledIndex = 0;
</script>

## scrollIntoView

### Smootly scroll element into center of view

<Preview>
  <input type="range" bind:value={scrolledIndex} min={0} max={itemCount} /> {scrolledIndex}
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
