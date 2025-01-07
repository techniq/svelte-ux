<script lang="ts">

</script>

<h1>Examples</h1>

```svelte
<Toggle>
  {#snippet children({ on: open, toggle, toggleOff })}
    <Button onclick={toggle}>Show dialog</Button>

    <Dialog {open} onclose={toggleOff}>
      <!-- render contents -->
    </Dialog>
  {/snippet}
</Toggle>
```
