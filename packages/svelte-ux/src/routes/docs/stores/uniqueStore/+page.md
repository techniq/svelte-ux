<script lang="ts">
	import Preview from '$lib/components/Preview.svelte';
	import Checkbox from '$lib/components/Checkbox.svelte';
	import TextField from '$lib/components/TextField.svelte';

	import uniqueStore from '$lib/stores/uniqueStore';

	const items = Array.from({ length: 5 }).map((_,i) => {
    return {
      id: i + 1
    }
  });

	const selected = uniqueStore();
</script>

<h1>Usage</h1>

```js
import { uniqueStore } from 'svelte-ux';

const store = uniqueStore();
// $store.has(value)
// $store.size
// store.add(value);
// store.delete(value);
// store.toggle(value);
```

<h1>Examples</h1>

<h2>Basic</h2>

<Preview>
	{#each items as item}
		<div>
			<Checkbox checked={$selected.has(item.id)} on:change={() => selected.toggle(item.id)}>
				{item.id}
			</Checkbox>
		</div>
	{/each}
	selected: {JSON.stringify([...$selected])}
</Preview>
