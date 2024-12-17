<script lang="ts">
  import { ThemeSwitch } from 'svelte-ux';
  import Preview from '$lib/components/Preview.svelte';
</script>

<h1>Examples</h1>

<h2>Default</h2>

<Preview>
  <ThemeSwitch />
</Preview>

<h2>Customize Switch</h2>

<Preview>
  <ThemeSwitch classes={{ icon: 'text-primary-content', switch: 'bg-secondary w-20', toggle: 'bg-accent' }} />
</Preview>
