<script lang="ts">

</script>

<h1>Examples</h1>

```svelte
<Toggle let:on={open} let:toggle let:toggleOff>
  <Button on:click={toggle}>Show dialog</Button>

  <Dialog {open} on:close={toggleOff}>
    <!-- render contents -->
  </Dialog>
</Toggle>
```
