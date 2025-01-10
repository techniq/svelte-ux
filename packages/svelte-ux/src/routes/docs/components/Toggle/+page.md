<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import { Dialog } from '$lib/components/index.js';
  import Toggle from '$lib/components/Toggle.svelte';
</script>

<h1>Examples</h1>

```svelte
<Toggle>
  {#snippet children({ on: open, toggle, toggleOff })}
    <Button onclick={toggle}>Show dialog</Button>

    <Dialog {open} onClose={toggleOff}>
      <!-- render contents -->
    </Dialog>
  {/snippet}
</Toggle>
```
