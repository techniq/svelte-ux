<script lang="ts">
  import { fly } from 'svelte/transition';

  import { mdiPalette, mdiUndoVariant, mdiWeatherNight, mdiWhiteBalanceSunny } from '@mdi/js';

  import Button from './Button.svelte';
  import Kbd from './Kbd.svelte';
  import Menu from './Menu.svelte';
  import Switch from './Switch.svelte';
  import Icon from './Icon.svelte';
  import MenuItem from './MenuItem.svelte';
  import Tooltip from './Tooltip.svelte';

  import { cls } from '../utils/styles';
  import { getSettings } from './settings';

  const { currentTheme, themes: allThemes } = getSettings();

  /** The list of dark themes to chose from, if not the list provided to `settings`. */
  export let darkThemes = allThemes?.dark ?? ['dark'];
  /** The list of light themes to chose from, if not the list provided to `settings`. */
  export let lightThemes = allThemes?.light ?? ['light'];

  let open = false;

  $: themes = $currentTheme.dark ? darkThemes : lightThemes;

  function onKeyDown(e: KeyboardEvent) {
    if (e.ctrlKey && e.code === 'KeyT') {
      if (e.shiftKey) {
        // Pick next theme
        const currentIndex = themes.indexOf($currentTheme.resolvedTheme);
        let newTheme = themes[(currentIndex + 1) % themes.length];
        currentTheme.setTheme(newTheme);
      } else {
        // Toggle light/dark
        let newTheme = $currentTheme.dark ? 'light' : 'dark';
        currentTheme.setTheme(newTheme);
      }
    }
  }
</script>

<Button icon={mdiPalette} iconOnly on:click={() => (open = !open)}>
  <Menu
    bind:open
    on:close={() => (open = false)}
    offset={4}
    explicitClose
    resize="height"
    classes={{ root: 'w-[400px] max-w-[95vw]' }}
  >
    <label
      for="switch-color-scheme"
      class="grid grid-cols-[1fr,auto,auto] items-center p-2 border-b border-surface-content/10 mb-1 text-sm font-medium"
    >
      Mode

      {#if $currentTheme.theme}
        <span transition:fly={{ x: 8 }}>
          <Tooltip title="Reset to System" offset={2}>
            <Button
              icon={mdiUndoVariant}
              color="primary"
              size="sm"
              class="mr-1"
              on:click={() => {
                currentTheme.setTheme('system');
              }}
            />
          </Tooltip>
        </span>
      {/if}

      <Switch
        id="switch-color-scheme"
        checked={$currentTheme.dark}
        on:change={(e) => {
          let newTheme = e.target?.checked ? 'dark' : 'light';
          currentTheme.setTheme(newTheme);
        }}
        class="my-1"
        let:checked
      >
        {#if checked}
          <Icon data={mdiWeatherNight} size=".8rem" class="text-primary" />
        {:else}
          <Icon data={mdiWhiteBalanceSunny} size=".8rem" class="text-primary" />
        {/if}
      </Switch>
    </label>

    <div class="grid grid-cols-2 gap-2 p-2 border-b border-surface-content/10">
      {#each themes as themeName}
        <MenuItem
          on:click={() => currentTheme.setTheme(themeName)}
          data-theme={themeName}
          class={cls(
            'bg-surface-100 text-surface-content font-semibold border shadow',
            $currentTheme.resolvedTheme === themeName && 'ring-2 ring-surface-content'
          )}
        >
          <div class="grid gap-1">
            <div class="w-4 h-4 rounded-full bg-primary" />
            <div class="w-4 h-4 rounded-full bg-secondary" />
          </div>
          {themeName}
        </MenuItem>
      {/each}
    </div>

    <div class="p-2 grid grid-cols-[auto,1fr] gap-2 items-center text-xs">
      <span class="font-medium">Toggle scheme:</span>
      <span>
        <Kbd control /> + <Kbd>T</Kbd>
      </span>

      <span class="font-medium">Next theme:</span>
      <span>
        <Kbd control /> + <Kbd shift /> + <Kbd>T</Kbd>
      </span>
    </div>
  </Menu>
</Button>

<svelte:window on:keydown={onKeyDown} />
