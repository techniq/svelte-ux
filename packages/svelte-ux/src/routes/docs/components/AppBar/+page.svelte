<script lang="ts">
  import { AppBar, Button, getSettings, ListItem } from 'svelte-ux';
  import { cls } from '@layerstack/tailwind';

  import LucideLayoutGrid from '~icons/lucide/layout-grid';

  import Preview from '$lib/components/Preview.svelte';

  const { icons } = getSettings();
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
      <Button icon={icons.refresh} class="p-2 hover:bg-surface-100/10" />
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

<h2>menuIcon prop</h2>

<Preview>
  <AppBar title="Example" menuIcon={LucideLayoutGrid} />
</Preview>

<h2>menuIcon slot</h2>

<Preview>
  <AppBar title="Example">
    <svelte:fragment slot="menuIcon" let:toggleMenu let:isMenuOpen>
      <Button
        icon={icons}
        on:click={toggleMenu}
        class={cls('p-3 transition-transform', isMenuOpen && 'rotate-180')}
      />
    </svelte:fragment>
  </AppBar>
</Preview>

<h2>remove icon</h2>

<Preview>
  <AppBar title="Example" menuIcon={null} />
</Preview>
