<script lang="ts">
  import { fly } from 'svelte/transition';

  import Button from './Button.svelte';
  import Icon from './Icon.svelte';
  import Kbd from './Kbd.svelte';
  import Menu from './Menu.svelte';
  import Switch from './Switch.svelte';
  import MenuItem from './MenuItem.svelte';
  import Tooltip from './Tooltip.svelte';

  import { cls } from '@layerstack/tailwind';
  import { getSettings } from './settings.js';

  const { currentTheme, themes: allThemes, icons } = getSettings();

  /** The list of dark themes to chose from, if not the list provided to `settings`. */
  export let darkThemes = allThemes?.dark ?? ['dark'];
  /** The list of light themes to chose from, if not the list provided to `settings`. */
  export let lightThemes = allThemes?.light ?? ['light'];

  /** Add keyboard shorts to quickly toggle color scheme and cycle themes */
  export let keyboardShortcuts = false;

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

{#if darkThemes.length > 1 || lightThemes.length > 1}
  <Button iconOnly on:click={() => (open = !open)}>
    <div class="grid grid-cols-1 grid-rows-1 overflow-hidden">
      <Icon
        data={icons.lightMode}
        class="row-[1] col-[1] translate-x-0 dark:-translate-x-full transition-transform duration-300"
      />
      <Icon
        data={icons.darkMode}
        class="row-[1] col-[1] translate-x-full dark:translate-x-0 transition-transform duration-300"
      />
    </div>

    <Menu
      bind:open
      on:close={() => (open = false)}
      explicitClose
      resize="height"
      classes={{ root: 'w-[400px] max-w-[95vw]' }}
    >
      <label
        for="switch-color-scheme"
        class="grid grid-cols-[1fr_auto_auto] items-center p-2 border-b border-surface-content/10 mb-1 text-sm font-medium sticky top-0 bg-surface-100"
      >
        Mode
        {#if $currentTheme.theme}
          <span transition:fly={{ x: 8 }}>
            <Tooltip title="Reset to System" offset={2}>
              <Button
                icon={icons.undo}
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
            // @ts-expect-error: <input type="checkbox"> has `checked`, but difficult to type without dispatching custom event
            let newTheme = e.target?.checked ? 'dark' : 'light';
            currentTheme.setTheme(newTheme);
          }}
          class="my-1"
          let:checked
        >
          {#if checked}
            <Icon data={icons.darkMode} class="size-3 text-primary" />
          {:else}
            <Icon data={icons.lightMode} class="size-3 text-primary" />
          {/if}
        </Switch>
      </label>

      <div class="grid grid-cols-2 gap-2 p-2">
        {#each themes as themeName}
          <MenuItem
            on:click={() => currentTheme.setTheme(themeName)}
            data-theme={themeName}
            class={cls(
              'bg-surface-100 text-surface-content font-semibold border shadow-sm',
              $currentTheme.resolvedTheme === themeName && 'ring-2 ring-surface-content'
            )}
          >
            <div class="grid gap-1">
              <div class="w-4 h-4 rounded-full bg-primary"></div>
              <div class="w-4 h-4 rounded-full bg-secondary"></div>
            </div>
            {themeName}
          </MenuItem>
        {/each}
      </div>

      {#if keyboardShortcuts}
        <div
          class="p-2 grid grid-cols-[auto_1fr] gap-2 items-center text-xs sticky bottom-0 bg-surface-100 border-t border-surface-content/10"
        >
          <span class="font-medium">Toggle scheme:</span>
          <span>
            <Kbd control /> + <Kbd>T</Kbd>
          </span>

          <span class="font-medium">Next theme:</span>
          <span>
            <Kbd control /> + <Kbd shift /> + <Kbd>T</Kbd>
          </span>
        </div>
      {/if}
    </Menu>
  </Button>
{:else}
  <Button iconOnly on:click={() => (open = !open)}>
    <div class="grid grid-stack overflow-hidden">
      <Icon
        data={icons.lightMode}
        class="translate-x-0 dark:-translate-x-full transition-transform duration-300"
      />
      <Icon
        data={icons.darkMode}
        class="translate-x-full dark:translate-x-0 transition-transform duration-300"
      />
    </div>

    <Menu bind:open on:close={() => (open = false)} classes={{ menu: 'p-1' }}>
      <MenuItem
        icon={icons.lightMode}
        selected={$currentTheme.theme === 'light'}
        on:click={() => currentTheme.setTheme('light')}
      >
        Light
      </MenuItem>

      <MenuItem
        icon={icons.darkMode}
        selected={$currentTheme.theme === 'dark'}
        on:click={() => currentTheme.setTheme('dark')}
      >
        Dark
      </MenuItem>

      <MenuItem
        icon={icons.monitor}
        selected={$currentTheme.theme == null}
        on:click={() => currentTheme.setTheme('system')}
      >
        System
      </MenuItem>
    </Menu>
  </Button>
{/if}

<svelte:window on:keydown={keyboardShortcuts ? onKeyDown : undefined} />
