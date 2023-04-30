<script lang="ts">
	import api from '$lib/components/State.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';
</script>

# Examples

```svelte
<State initial={selected} let:value let:set>
	{#each items as item}
		<Button on:click={set(item)}>
			{item.name}
		</Button>
	{/each}
</Toggle>
```

# API

<ApiDocs {api} />
