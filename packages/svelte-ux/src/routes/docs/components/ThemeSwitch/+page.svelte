<script lang="ts">
  import { ThemeSwitch } from 'svelte-ux';
  import Preview from '$lib/components/Preview.svelte';
</script>

<h1>Examples</h1>

<h2>Default</h2>

<Preview>
  <ThemeSwitch />
</Preview>

<h2>Custom Icon Color</h2>

<Preview>
  <ThemeSwitch classes={{ icon: 'text-yellow-500' }} />
</Preview>
