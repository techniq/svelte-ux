<script lang="ts">
	import api from '$lib/components/State.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';
</script>

<h1>Examples</h1>

```svelte
<State initial={selected} let:value let:set>
	{#each items as item}
		<Button on:click={set(item)}>
			{item.name}
		</Button>
	{/each}
</Toggle>
```

<h1>API</h1>

<ApiDocs {api} />
