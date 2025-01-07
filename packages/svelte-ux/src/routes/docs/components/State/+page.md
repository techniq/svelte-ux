<script lang="ts">

</script>

<h1>Examples</h1>

```svelte
<State initial={selected}>
  {#snippet children({ value, set })}
    {#each items as item}
      <Button on:click={set(item)}>
        {item.name}
      </Button>
    {/each}
  {/snippet}
</State>
```
