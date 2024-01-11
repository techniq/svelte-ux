<script lang="ts">
  import { mdiWeatherNight, mdiWhiteBalanceSunny } from '@mdi/js';

  import Switch from './Switch.svelte';
  import Icon from './Icon.svelte';

  import { getSettings } from './settings';

  const { currentTheme } = getSettings();
</script>

<Switch
  checked={$currentTheme.dark}
  on:change={(e) => {
    let newTheme = e.target?.checked ? 'dark' : 'light';
    currentTheme.setTheme(newTheme);
  }}
  let:checked
  {...$$restProps}
>
  {#if checked}
    <Icon data={mdiWeatherNight} size=".8rem" class="text-primary" />
  {:else}
    <Icon data={mdiWhiteBalanceSunny} size=".8rem" class="text-primary" />
  {/if}
</Switch>
