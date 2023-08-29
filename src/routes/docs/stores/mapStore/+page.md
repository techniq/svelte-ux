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
import { uniqueStore } from 'svelte-ux';

const store = mapStore();
// $store.get(key)
// $store.has(key)
// store.set(key, value);
// store.update(key, value => value + 1);
// store.delete(key);
// store.clear();
// store.refresh();
```
