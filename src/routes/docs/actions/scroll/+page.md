<script lang="ts">
  import { flip } from 'svelte/animate';

	import Button from '$lib/components/Button.svelte';
	import Preview from '$lib/components/Preview.svelte';

	import { scrollIntoView, scrollFade, scrollShadow } from '$lib/actions/scroll';

  let filterItems = false;

  const itemCount = 30;
  $: items = Array.from({ length: itemCount }).map((_, i) => `Item: ${i}`).filter((_, i) => filterItems ? i > 25 : true)
  let scrolledIndex = 0;
</script>

# Usage

```js
import { scrollIntoView, scrollFade, scrollShadow } from 'svelte-ux';
```

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
  <div class="h-40 border rounded" use:scrollShadow>
    {#each items as item, i (item)}
      <div>{item}</div>
    {/each}
  </div>
</Preview>

### with flip'd children

<Preview>
  <div class="h-40 border rounded" use:scrollShadow>
    {#each items as item, i (item)}
      <div animate:flip={{ duration: 300 }}>{item}</div>
    {/each}
  </div>
</Preview>

### Horizontal scroll

<Preview>
  <div class="h-20 border rounded" use:scrollShadow>
    <div class="flex whitespace-nowrap gap-2 p-2">
      {#each items as item, i}
        <div class="p-4 border">{item}</div>
      {/each}
    </div>
  </div>
</Preview>

### White shadow on bottom (fade content)

<Preview>
  <div class="h-40 border rounded" use:scrollShadow={{ bottom: { color: 'rgb(255 255 255 / 1)', offset: 30, blur: 30, scrollRatio: 0 }}}>
    {#each items as item, i}
      <div>{item}</div>
    {/each}
  </div>
</Preview>

### with truncation

<Preview>
  <div class="w-[200px] h-40 border rounded" use:scrollShadow>
    {#each items as item, i}
      <div class="truncate">{item} with a really long description</div>
    {/each}
  </div>
</Preview>

## scrollFade

### Add shadows to indicate scrolling available

<Preview>
  <div class="max-h-40 border rounded" use:scrollFade>
    {#each items as item, i (item)}
      <div>{item}</div>
    {/each}
  </div>
</Preview>

### with flip'd children

<Preview>
  <div class="max-h-40 border rounded" use:scrollFade>
    {#each items as item, i (item)}
      <div animate:flip={{ duration: 3000 }}>{item}</div>
    {/each}
  </div>
</Preview>

### Horizontal scroll

<Preview>
  <div class="h-20 border rounded" use:scrollFade>
    <div class="flex whitespace-nowrap gap-2 p-2">
      {#each items as item, i}
        <div class="p-4 border">{item}</div>
      {/each}
    </div>
  </div>
</Preview>

<div>
  <Button on:click={() => filterItems = !filterItems}>Toggle filter</Button>
</div>
