<script lang="ts">
  import NavItem from '$lib/components/NavItem.svelte';
  import Preview from '$lib/components/Preview.svelte';

  import { page } from '$app/stores';
</script>

<h1>Examples</h1>

<h2>Default</h2>

<Preview>
  <NavItem text="Home" currentUrl={$page.url} path="/" />
</Preview>

<h2>Active path</h2>

<Preview>
  <NavItem
    text="NavItem"
    currentUrl={$page.url}
    path="/docs/components/NavItem"
    classes={{ root: 'pl-3', active: 'bg-accent-50 text-accent-500' }}
  />
</Preview>
