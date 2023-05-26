<script lang="ts">
  import api from '$lib/components/AppLayout.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';
  import Blockquote from '$docs/Blockquote.svelte';
</script>

<h1>Examples</h1>

<Blockquote>TODO</Blockquote>

```svelte
<AppLayout>
  <nav slot="nav" class="h-full">
    <!-- Nav menu -->
  </nav>

  <AppBar title="Example">
    <div slot="actions">
      <!-- App actions -->
    </div>
  </AppBar>

  <main>
    <slot />
  </main>
</AppLayout>
```

<h1>API</h1>

<ApiDocs {api} />
