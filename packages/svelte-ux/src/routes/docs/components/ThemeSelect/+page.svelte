<script lang="ts">
  import { ThemeSelect } from 'svelte-ux';
  import Preview from '$lib/components/Preview.svelte';

  export let data;
</script>

<h1>Examples</h1>

<h2>Default (based on settings)</h2>
<Preview>
  <ThemeSelect />
</Preview>

<h2>Single light/dark theme</h2>

<Preview>
  <ThemeSelect lightThemes={['light']} darkThemes={['dark']} />
</Preview>

<h2>Multiple light/dark themes</h2>

<Preview>
  <!-- Use docs themes for convenience of many themes -->
  <ThemeSelect lightThemes={data.themes.light} darkThemes={data.themes.dark} />
</Preview>
