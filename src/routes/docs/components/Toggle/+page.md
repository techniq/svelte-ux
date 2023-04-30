<script lang="ts">
  import api from '$lib/components/Toggle.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';
</script>

# Examples

```svelte
<Toggle let:on={open} let:toggle>
  <Button on:click={toggle}>Show dialog</Button>

  <Dialog {open} on:close={toggle}>
    <!-- render contents -->
  </Dialog>
</Toggle>
```

# API

<ApiDocs {api} />
