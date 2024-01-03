<script lang="ts">
  import { mdiRefresh } from '@mdi/js';

  import AppBar from '$lib/components/AppBar.svelte';
  import Button from '$lib/components/Button.svelte';
  import Preview from '$lib/components/Preview.svelte';
  import ListItem from '$lib/components/ListItem.svelte';
</script>

<h1>Examples</h1>

<h2>Default</h2>

<Preview>
  <AppBar />
</Preview>

<h2>Title as string</h2>

<Preview>
  <AppBar title="Example" />
</Preview>

<h2>Title as array</h2>

<Preview>
  <AppBar title={['One', 'Two', 'Three']} />
</Preview>

<h2>Title as slot</h2>

<Preview>
  <AppBar title="Example (shown in window title)">
    <div slot="title">
      <ListItem title="Example" subheading="Subheading" />
    </div>
  </AppBar>
</Preview>

<h2>Actions</h2>

<Preview>
  <AppBar title="Example">
    <div slot="actions">
      <Button icon={mdiRefresh} class="p-2 hover:bg-surface-100/10" />
    </div>
  </AppBar>
</Preview>

<h2>Color</h2>

<Preview>
  <div class="grid gap-2">
    <AppBar title="Example" class="bg-primary text-primary-content" />
    <AppBar title="Example" class="bg-blue-500 text-primary-content" />
  </div>
</Preview>
