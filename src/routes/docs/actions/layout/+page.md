<script lang="ts">
	import { subDays, subMonths } from 'date-fns';

	import Button from '$lib/components/Button.svelte';
	import Preview from '$lib/components/Preview.svelte';

	import { remainingViewportHeight, remainingViewportWidth, overflow } from '$lib/actions/layout';

	let overflowX = 0;
	let overflowY = 0;
	let overflowItems = 1;
</script>

<h1>Usage</h1>

```js
import { remainingViewportHeight, remainingViewportWidth, overflow } from 'svelte-ux';
```

<h2>remainingViewportHeight</h2>

> TODO

<h2>remainingViewportWidth</h2>

> TODO

<h2>overflow</h2>

<Button on:click={() => overflowItems += 1}>+ item</Button>
<Button on:click={() => overflowItems -= overflowItems > 1 ? 1 : 0}>- item</Button>

<div class="w-1/2 h-[100px] border border-black/20 rounded-lg bg-white whitespace-nowrap truncate p-4" use:overflow on:overflowX={e => overflowX = e.detail} on:overflowY={e => overflowY = e.detail}>
	{#each { length: overflowItems } as _}
		<div>Resize the window to see text truncate and watch values</div>
	{/each}
</div>
<div>overflowX: {overflowX}</div>
<div>overflowY: {overflowY}</div>
