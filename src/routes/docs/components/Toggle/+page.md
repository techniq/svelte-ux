<script lang="ts">
  import api from '$lib/components/Toggle.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';
</script>

<h1>Examples</h1>

```svelte
<Toggle let:on={open} let:toggle>
  <Button on:click={toggle}>Show dialog</Button>

  <Dialog {open} on:close={toggle}>
    <!-- render contents -->
  </Dialog>
</Toggle>
```

<h1>API</h1>

<ApiDocs {api} />
