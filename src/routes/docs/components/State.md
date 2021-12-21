---
component: $component
filename: $filename
---

```svelte
<State initial={selected} let:value let:set>
	{#each items as item}
		<Button on:click={set(item)}>
			{item.name}
		</Button>
	{/each}
</Toggle>
```
