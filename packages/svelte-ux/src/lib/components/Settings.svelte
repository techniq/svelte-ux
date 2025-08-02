<script lang="ts">
  import ThemeInit from './ThemeInit.svelte';
  import { settings as setSettings, type SettingsOptions } from './settings.js';

  type $$Props = SettingsOptions & { themeInit?: boolean };

  /** Include the ThemeInit component to improve SSR compatibility. */
  export let themeInit = true;

  setSettings($$restProps);
</script>

{#if themeInit}
  <ThemeInit />
{/if}
<slot />
