<script lang="ts">
  import ThemeInit from './ThemeInit.svelte';
  import { settings as setSettings, type Settings } from './settings';

  export let settings: Settings;
  /** Include the ThemeInit component to improve SSR compatibility. */
  export let themeInit = true;

  setSettings(settings);
</script>

{#if themeInit}
  <ThemeInit />
{/if}
<slot />
