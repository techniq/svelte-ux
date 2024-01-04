<script lang="ts">
  import ThemeInit from './ThemeInit.svelte';
  import { settings as setSettings, type SettingsInput } from './settings';

  type $$Props = SettingsInput & { themeInit?: boolean };

  /** Include the ThemeInit component to improve SSR compatibility. */
  export let themeInit = true;

  setSettings($$restProps);
</script>

{#if themeInit}
  <ThemeInit />
{/if}
<slot />
