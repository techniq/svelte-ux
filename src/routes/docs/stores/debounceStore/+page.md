<script lang="ts">
  import { writable } from 'svelte/store';

	import Preview from '$lib/components/Preview.svelte';
	import TextField from '$lib/components/TextField.svelte';

	import debounceStore from '$lib/stores/debounceStore';

  const value = writable(null);
  const debouncedValue = debounceStore(value)
</script>

# Usage

```svelte
<script>
  import { writable } from 'svelte/store';
  import { debounceStore } from 'svelte-ux';

  const value = writable('');
  const debouncedValue = debounceStore(value);
</script>
```

## Example

<Preview>
  <TextField bind:value={$value} />
  <div>value: {$value}</div>
  <div>debouncedValue: {$debouncedValue}</div>
</Preview>
