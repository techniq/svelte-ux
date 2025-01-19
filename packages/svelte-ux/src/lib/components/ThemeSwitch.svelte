<script lang="ts">
  import type { ComponentProps } from 'svelte';
  import { mdiWeatherNight, mdiWhiteBalanceSunny } from '@mdi/js';
  import { cls, clsMerge } from '@layerstack/tailwind';

  import Switch from './Switch.svelte';
  import Icon from './Icon.svelte';

  import { getSettings } from './settings.js';
  import { getComponentClasses } from '$lib/components/theme.js';

  const { currentTheme } = getSettings();

  const { icon: iconClasses, ...otherClasses } = getComponentClasses('ThemeSwitch');

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
    otherClasses,
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
        iconClasses,
        classes.icon
      )}
    />
    <Icon
      data={mdiWhiteBalanceSunny}
      size=".8rem"
      class={cls(
        'row-[1] col-[1] text-primary opacity-100 dark:opacity-0',
        iconClasses,
        classes.icon
      )}
    />
  </div>
</Switch>
