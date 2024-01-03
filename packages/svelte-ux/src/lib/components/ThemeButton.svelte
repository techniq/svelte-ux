<script lang="ts">
  import { fly } from 'svelte/transition';

  import { mdiMoonWaningCrescent, mdiPalette, mdiUndoVariant, mdiWhiteBalanceSunny } from '@mdi/js';

  import Button from './Button.svelte';
  import Kbd from './Kbd.svelte';
  import Menu from './Menu.svelte';
  import Switch from './Switch.svelte';
  import Icon from './Icon.svelte';
  import MenuItem from './MenuItem.svelte';
  import Tooltip from './Tooltip.svelte';

  import { cls } from '../utils/styles';

  export let darkThemes = ['dark'];
  export let lightThemes = ['light'];

  let open = false;

  $: themes = colorScheme === 'dark' ? darkThemes : lightThemes;

  let theme: (typeof themes)[number] | null = localStorage.theme ?? 'system';

  let colorScheme: 'light' | 'dark' =
    (theme !== 'system' && darkThemes.includes(theme)) ||
    (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
      ? 'dark'
      : 'light';

  // TODO: Call inline in `head` to avoid FOUC.  Move to <Theme>?
  function setTheme(themeName: typeof theme) {
    if (themeName === 'system') {
      // Remove setting
      localStorage.removeItem('theme');
      delete document.documentElement.dataset.theme;

      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
      }
    } else {
      // Save theme to local storage, set `<html data-theme="">`, and set `<html class="dark">` if dark mode
      localStorage.theme = themeName;
      document.documentElement.dataset.theme = theme;

      if (darkThemes.includes(themeName)) {
        colorScheme = 'dark';
        document.documentElement.classList.add('dark');
      } else {
        colorScheme = 'light';
        document.documentElement.classList.remove('dark');
      }
    }
  }
  $: setTheme(theme);

  function onKeyDown(e: KeyboardEvent) {
    if (e.ctrlKey && e.code === 'KeyT') {
      if (e.shiftKey) {
        // Pick next theme
        const currentIndex = themes.indexOf(theme);
        theme = themes[(currentIndex + 1) % themes.length];
      } else {
        // Toggle light/dark
        colorScheme = colorScheme === 'light' ? 'dark' : 'light';
        theme = colorScheme;
      }
    }
  }
</script>

<Button icon={mdiPalette} iconOnly on:click={() => (open = !open)}>
  <Menu bind:open on:close={() => (open = false)} offset={4} explicitClose resize>
    <label
      for="switch-color-scheme"
      class="grid grid-cols-[1fr,auto,auto] items-center p-2 border-b border-surface-content/10 mb-1 text-sm font-medium"
    >
      Mode

      {#if theme !== 'system'}
        <span transition:fly={{ x: 8 }}>
          <Tooltip title="Reset to System" offset={2}>
            <Button
              icon={mdiUndoVariant}
              color="primary"
              size="sm"
              class="mr-1"
              on:click={() => {
                colorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches
                  ? 'dark'
                  : 'light';
                theme = 'system';
              }}
            />
          </Tooltip>
        </span>
      {/if}

      <Switch
        id="switch-color-scheme"
        checked={colorScheme === 'light'}
        on:change={(e) => {
          colorScheme = e.target?.checked ? 'light' : 'dark';
          theme = colorScheme;
        }}
        class="my-1"
        let:checked
      >
        {#if checked}
          <Icon data={mdiWhiteBalanceSunny} size=".8rem" class="text-primary" />
        {:else}
          <Icon data={mdiMoonWaningCrescent} size=".8rem" class="text-primary" />
        {/if}
      </Switch>
    </label>

    <div class="grid grid-cols-2 gap-2 p-2 border-b border-surface-content/10">
      {#each themes as themeName}
        <MenuItem
          on:click={() => (theme = themeName)}
          data-theme={themeName}
          class={cls(
            'bg-surface-100 text-surface-content font-semibold border shadow',
            theme === themeName && 'ring-2 ring-surface-content'
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
