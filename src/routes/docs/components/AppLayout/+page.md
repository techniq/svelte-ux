<script lang="ts">
  import api from '$lib/components/AppLayout.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';
  import Blockquote from '$docs/Blockquote.svelte';
</script>

<h1>Example</h1>

<h2>Basic (full height nav)</h2>

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

<h2>Full width layout</h2>

```svelte
<AppLayout areas="'header header' 'aside main'">
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
