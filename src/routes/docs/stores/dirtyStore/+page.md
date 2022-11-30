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

	import dirtyStore from '$lib/stores/dirtyStore';

  const value = writable('');
  const isDirty = dirtyStore(value)
</script>

## Usage

```svelte
<script>
  import { writable } from 'svelte/store';
  import { debounceStore } from 'svelte-ux';

  const value = writable('');
  const isDirty = dirtyStore(value);
</script>
```

## Example

<Preview>
  <TextField bind:value={$value} />
  <div>isDirty: {$isDirty}</div>
  <Button on:click={() => isDirty.reset()}>Reset</Button>
</Preview>
