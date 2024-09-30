<script lang="ts">
  import Button from './Button.svelte';
  import Menu from './Menu.svelte';
  import MenuItem from './MenuItem.svelte';
  import { cls } from '@layerstack/tailwind';
  import { getSettings } from './settings.js';
  const { locale } = getSettings();

  let open = false;

  type Language = {
    name: string;
    code: string;
    flag: string;
  };

  export let languagesDemo: Language[] = [
    { name: 'English', code: 'en', flag: '🇺🇸' },
    { name: 'Français', code: 'fr', flag: '🇫🇷' },
    // add more for the demo
  ];
  $: languageSelected = languagesDemo.find((c) => c.code === $locale)!;
</script>

<Button on:click={() => (open = !open)} class="font-mono font-semibold" iconOnly={true}>
  {languageSelected.code}
  <Menu bind:open on:close={() => (open = false)} offset={4} explicitClose resize>
    <div class="grid gap-2 p-2 border-b border-surface-content/10">
      {#each languagesDemo as language}
        <MenuItem
          on:click={() => {
            languageSelected = language;
            locale.set(language.code);
          }}
          class={cls(
            'bg-surface-100 text-surface-content font-semibold border shadow',
            languageSelected === language && 'ring-2 ring-surface-content'
          )}
        >
          {language.flag} - {language.name}
        </MenuItem>
      {/each}
    </div>

    <div class="p-2 grid grid-cols-[auto,1fr] gap-2 items-center text-xs">
      <span class="font-medium">Affects date & number formats</span>
    </div>
  </Menu>
</Button>
