---
name: $name
sourceUrl: $sourceUrl
docUrl: $docUrl
---

<script lang="ts">
  import { writable } from 'svelte/store';

	import Button from '$lib/components/Button.svelte';
	import Preview from '$lib/components/Preview.svelte';
	import TextField from '$lib/components/TextField.svelte';

	import changeStore from '$lib/stores/changeStore';

  const value = writable('');
  const changed = changeStore(value, (value) => console.log('changed', value));
</script>

## Usage

```svelte
<script>
  import { writable } from 'svelte/store';
  import { changeStore } from 'svelte-ux';

  const value = writable('');
  const changed = changeStore(value, (value) => console.log('changed', value));
</script>
```

## Example

<Preview>
  <TextField bind:value={$value} />
  <div>changed: {JSON.stringify($changed)}</div>
</Preview>
