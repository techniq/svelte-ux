<script lang="ts">
  import { mdiWeatherNight, mdiWhiteBalanceSunny } from '@mdi/js';

  import Switch from './Switch.svelte';
  import Icon from './Icon.svelte';

  import { getComponentSettings, getSettings } from './settings.js';
  import { cls } from '../utils/index.js';
  import type { ComponentProps } from 'svelte';
  import { clsMerge } from '$lib/utils/styles.js';

  const { currentTheme } = getSettings();

  const { classes: settingsClasses } = getComponentSettings('ThemeSwitch');

  export let classes: {
    icon?: string;
  } & ComponentProps<Switch>['classes'] = {};
</script>

<Switch
  checked={$currentTheme.dark}
  on:change={(e) => {
    // @ts-expect-error: <input type="checkbox"> has `checked`, but difficult to type without dispatching custom event
    let newTheme = e.target?.checked ? 'dark' : 'light';
    currentTheme.setTheme(newTheme);
  }}
  classes={clsMerge(
    {
      switch: 'dark:bg-primary dark:border-primary',
      toggle: 'translate-x-0 dark:translate-x-full',
    },
    settingsClasses.root,
    classes
  )}
  {...$$restProps}
>
  <div class="grid grid-cols-1 grid-rows-1">
    <Icon
      data={mdiWeatherNight}
      size=".8rem"
      class={cls(
        'row-[1] col-[1] text-primary opacity-0 dark:opacity-100',
        settingsClasses.icon,
        classes.icon
      )}
    />
    <Icon
      data={mdiWhiteBalanceSunny}
      size=".8rem"
      class={cls(
        'row-[1] col-[1] text-primary opacity-100 dark:opacity-0',
        settingsClasses.icon,
        classes.icon
      )}
    />
  </div>
</Switch>
