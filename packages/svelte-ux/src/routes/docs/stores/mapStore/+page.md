<script lang="ts">
	import Preview from '$lib/components/Preview.svelte';
	import Checkbox from '$lib/components/Checkbox.svelte';
	import TextField from '$lib/components/TextField.svelte';

	import mapStore from '$lib/stores/mapStore';

	const items = Array.from({ length: 5 }).map((_,i) => {
    return {
      id: i + 1
    }
  });

	const selected = mapStore();
</script>

<h1>Usage</h1>

```js
import { mapStore } from 'svelte-ux';

const store = mapStore();

// Get a value
$store.get(key);

// Set a value
store.set(key, value);

// Update a value
store.update(key, (value) => value + 1);

// Check if value exists
$store.has(key);

// Delete a value
store.delete(key);

// Delete all values
store.clear();

// Force a reactive update in case of internal changes to entries
store.refresh();
```
