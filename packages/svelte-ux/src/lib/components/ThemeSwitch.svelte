<script lang="ts">
  import { mdiWeatherNight, mdiWhiteBalanceSunny } from '@mdi/js';

  import Switch from './Switch.svelte';
  import Icon from './Icon.svelte';

  import { getSettings } from './settings.js';

  const { currentTheme } = getSettings();
</script>

<Switch
  checked={$currentTheme.dark}
  on:change={(e) => {
    // @ts-ignore: <input type="checkbox"> has `checked`, but difficult to type without dispatching custom event
    let newTheme = e.target?.checked ? 'dark' : 'light';
    currentTheme.setTheme(newTheme);
  }}
  classes={{
    switch: 'dark:bg-primary dark:border-primary',
    toggle: 'translate-x-0 dark:translate-x-full',
  }}
  {...$$restProps}
>
  <div class="grid grid-cols-1 grid-rows-1">
    <Icon
      data={mdiWeatherNight}
      size=".8rem"
      class="row-[1] col-[1] text-primary opacity-0 dark:opacity-100"
    />
    <Icon
      data={mdiWhiteBalanceSunny}
      size=".8rem"
      class="row-[1] col-[1] text-primary opacity-100 dark:opacity-0"
    />
  </div>
</Switch>
