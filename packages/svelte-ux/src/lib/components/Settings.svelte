<script lang="ts">
  import type { Snippet } from 'svelte';
  import ThemeInit from './ThemeInit.svelte';
  import { settings as setSettings, type SettingsInput } from './settings.js';

  interface Props {
    /** Include the ThemeInit component to improve SSR compatibility. */
    themeInit?: boolean;
    children?: Snippet;
  }

  let { themeInit = true, children, ...restProps }: Props & SettingsInput = $props();

  setSettings(restProps);
</script>

{#if themeInit}
  <ThemeInit />
{/if}
{@render children?.()}
