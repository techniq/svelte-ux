<script lang="ts">
  import { writable } from 'svelte/store';

	import { TextField, debounceStore } from 'svelte-ux';
	import Preview from '$lib/components/Preview.svelte';

  const value = writable(null);
  const debouncedValue = debounceStore(value)
</script>

<h1>Usage</h1>

```svelte
<script>
  import { writable } from 'svelte/store';
  import { debounceStore } from 'svelte-ux';

  const value = writable('');
  const debouncedValue = debounceStore(value);
</script>
```

<h2>Example</h2>

<Preview>
  <TextField bind:value={$value} />
  <div>value: {$value}</div>
  <div>debouncedValue: {$debouncedValue}</div>
</Preview>
