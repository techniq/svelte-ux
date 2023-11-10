<script lang="ts">

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
