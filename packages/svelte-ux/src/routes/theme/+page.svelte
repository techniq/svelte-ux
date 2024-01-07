<script lang="ts">
  import CopyButton from '$lib/components/CopyButton.svelte';
  import SelectField from '$lib/components/SelectField.svelte';

  import { styleProps } from '$lib/actions/styleProps.js';
  import { processThemeColors } from '$lib/styles/theme.js';
  import type { MenuOption } from '$lib/types/options.js';
  import Switch from '$lib/components/Switch.svelte';
  import { mdiWeatherNight, mdiWhiteBalanceSunny } from '@mdi/js';
  import Icon from '$lib/components/Icon.svelte';

  export let data;

  type ThemeMenuOption = MenuOption & { themeName: string };

  let selectedLightThemeOption: ThemeMenuOption;
  let selectedDarkThemeOption: ThemeMenuOption;

  $: lightThemes = [
    ...data.daisy.lightThemes.map((themeName) => {
      return {
        label: themeName === 'light' ? 'light (daisy)' : themeName,
        value: themeName === 'light' ? 'daisy-light' : themeName,
        group: 'Daisy',
        themeName,
      };
    }),
    ...data.skeleton.lightThemes.map((themeName) => {
      return {
        label: themeName === 'light' ? 'light (skeleton)' : themeName,
        value: themeName === 'light' ? 'skeleton-light' : themeName,
        group: 'Skeleton',
        themeName,
      };
    }),
  ] as ThemeMenuOption[];

  $: darkThemes = [
    ...data.daisy.darkThemes.map((themeName) => {
      return {
        label: themeName === 'dark' ? 'dark (daisy)' : themeName,
        value: themeName === 'dark' ? 'daisy-dark' : themeName,
        group: 'Daisy',
        themeName,
      };
    }),
    ...data.skeleton.darkThemes.map((themeName) => {
      return {
        label: themeName === 'dark' ? 'dark (skeleton)' : themeName,
        value: themeName === 'dark' ? 'skeleton-dark' : themeName,
        group: 'Skeleton',
        themeName,
      };
    }),
  ] as ThemeMenuOption[];

  // Set initial options
  // $: if (selectedLightThemeOption === undefined) {
  //   console.log({ selectedLightThemeOption, lightThemes });
  //   debugger;
  //   selectedLightThemeOption = lightThemes[0];
  // }
  // $: if (selectedDarkThemeOption === undefined) {
  //   selectedDarkThemeOption = darkThemes[0];
  // }

  function getSelectedTheme(option: ThemeMenuOption) {
    if (option) {
      const themes =
        option.group === 'Daisy'
          ? data.daisy.themes
          : option.group === 'Skeleton'
            ? data.skeleton.themes
            : [];
      const themeName = option.themeName;
      const theme = themes[themeName];
      return theme;
    }
  }
  $: selectedLightTheme = getSelectedTheme(selectedLightThemeOption);
  $: selectedDarkTheme = getSelectedTheme(selectedDarkThemeOption);

  let showDarkTheme = false;

  $: previewTheme = showDarkTheme ? selectedDarkTheme : selectedLightTheme;
</script>

<main class="p-4 grid gap-3">
  <div class="grid sm:grid-cols-[1fr,1fr,auto] gap-3">
    <SelectField
      label="Light theme"
      options={lightThemes}
      bind:selected={selectedLightThemeOption}
      clearable={false}
      toggleIcon={null}
      stepper
    />
    <SelectField
      label="Dark theme"
      options={darkThemes}
      bind:selected={selectedDarkThemeOption}
      clearable={false}
      toggleIcon={null}
      stepper
    />

    <CopyButton
      variant="fill-light"
      color="primary"
      value={JSON.stringify({ light: selectedLightTheme, dark: selectedDarkTheme }, null, 2)}
    />
  </div>

  <h1 class="grid grid-cols-[1fr,auto]">
    Theme preview

    <Switch
      checked={showDarkTheme}
      on:change={(e) => (showDarkTheme = e.target.checked)}
      let:checked
    >
      {#if checked}
        <Icon data={mdiWeatherNight} size=".8rem" class="text-primary" />
      {:else}
        <Icon data={mdiWhiteBalanceSunny} size=".8rem" class="text-primary" />
      {/if}
    </Switch>
  </h1>

  <div
    class="bg-surface-100 border rounded py-2 px-3"
    style:color={previewTheme?.['color-scheme'] === 'dark' ? 'white' : 'black'}
    use:styleProps={previewTheme ? processThemeColors(previewTheme, 'hsl') : {}}
  >
    <div>
      <div class="text-xl font-bold mb-2">Semantic colors</div>

      <div class="grid grid-cols-xs gap-3">
        <div class="swatch">
          <div class="bg-primary text-primary-content name">Primary</div>
          <div class="bg-primary-50 shade"><span>50</span></div>
          <div class="bg-primary-100 shade"><span>100</span></div>
          <div class="bg-primary-200 shade"><span>200</span></div>
          <div class="bg-primary-300 shade"><span>300</span></div>
          <div class="bg-primary-400 shade"><span>400</span></div>
          <div class="bg-primary-500 shade"><span>500</span></div>
          <div class="bg-primary-600 shade"><span>600</span></div>
          <div class="bg-primary-700 shade"><span>700</span></div>
          <div class="bg-primary-800 shade"><span>800</span></div>
          <div class="bg-primary-900 shade"><span>900</span></div>
        </div>

        <div class="swatch">
          <div class="bg-secondary text-secondary-content name">Secondary</div>
          <div class="bg-secondary-50 shade"><span>50</span></div>
          <div class="bg-secondary-100 shade"><span>100</span></div>
          <div class="bg-secondary-200 shade"><span>200</span></div>
          <div class="bg-secondary-300 shade"><span>300</span></div>
          <div class="bg-secondary-400 shade"><span>400</span></div>
          <div class="bg-secondary-500 shade"><span>500</span></div>
          <div class="bg-secondary-600 shade"><span>600</span></div>
          <div class="bg-secondary-700 shade"><span>700</span></div>
          <div class="bg-secondary-800 shade"><span>800</span></div>
          <div class="bg-secondary-900 shade"><span>900</span></div>
        </div>

        <div class="swatch">
          <div class="bg-accent text-accent-content name">Accent</div>
          <div class="bg-accent-50 shade"><span>50</span></div>
          <div class="bg-accent-100 shade"><span>100</span></div>
          <div class="bg-accent-200 shade"><span>200</span></div>
          <div class="bg-accent-300 shade"><span>300</span></div>
          <div class="bg-accent-400 shade"><span>400</span></div>
          <div class="bg-accent-500 shade"><span>500</span></div>
          <div class="bg-accent-600 shade"><span>600</span></div>
          <div class="bg-accent-700 shade"><span>700</span></div>
          <div class="bg-accent-800 shade"><span>800</span></div>
          <div class="bg-accent-900 shade"><span>900</span></div>
        </div>

        <div class="swatch">
          <div class="bg-neutral text-neutral-content name">Neutral</div>
          <div class="bg-neutral-50 shade"><span>50</span></div>
          <div class="bg-neutral-100 shade"><span>100</span></div>
          <div class="bg-neutral-200 shade"><span>200</span></div>
          <div class="bg-neutral-300 shade"><span>300</span></div>
          <div class="bg-neutral-400 shade"><span>400</span></div>
          <div class="bg-neutral-500 shade"><span>500</span></div>
          <div class="bg-neutral-600 shade"><span>600</span></div>
          <div class="bg-neutral-700 shade"><span>700</span></div>
          <div class="bg-neutral-800 shade"><span>800</span></div>
          <div class="bg-neutral-900 shade"><span>900</span></div>
        </div>
      </div>
    </div>

    <div>
      <div class="text-xl font-bold mt-4 mb-2">State colors</div>

      <div class="grid grid-cols-xs gap-3">
        <div class="swatch">
          <div class="bg-info text-info-content name">Info</div>
          <div class="bg-info-50 shade"><span>50</span></div>
          <div class="bg-info-100 shade"><span>100</span></div>
          <div class="bg-info-200 shade"><span>200</span></div>
          <div class="bg-info-300 shade"><span>300</span></div>
          <div class="bg-info-400 shade"><span>400</span></div>
          <div class="bg-info-500 shade"><span>500</span></div>
          <div class="bg-info-600 shade"><span>600</span></div>
          <div class="bg-info-700 shade"><span>700</span></div>
          <div class="bg-info-800 shade"><span>800</span></div>
          <div class="bg-info-900 shade"><span>900</span></div>
        </div>

        <div class="swatch">
          <div class="bg-success text-success-content name">Success</div>
          <div class="bg-success-50 shade"><span>50</span></div>
          <div class="bg-success-100 shade"><span>100</span></div>
          <div class="bg-success-200 shade"><span>200</span></div>
          <div class="bg-success-300 shade"><span>300</span></div>
          <div class="bg-success-400 shade"><span>400</span></div>
          <div class="bg-success-500 shade"><span>500</span></div>
          <div class="bg-success-600 shade"><span>600</span></div>
          <div class="bg-success-700 shade"><span>700</span></div>
          <div class="bg-success-800 shade"><span>800</span></div>
          <div class="bg-success-900 shade"><span>900</span></div>
        </div>

        <div class="swatch">
          <div class="bg-warning text-warning-content name">Warning</div>
          <div class="bg-warning-50 shade"><span>50</span></div>
          <div class="bg-warning-100 shade"><span>100</span></div>
          <div class="bg-warning-200 shade"><span>200</span></div>
          <div class="bg-warning-300 shade"><span>300</span></div>
          <div class="bg-warning-400 shade"><span>400</span></div>
          <div class="bg-warning-500 shade"><span>500</span></div>
          <div class="bg-warning-600 shade"><span>600</span></div>
          <div class="bg-warning-700 shade"><span>700</span></div>
          <div class="bg-warning-800 shade"><span>800</span></div>
          <div class="bg-warning-900 shade"><span>900</span></div>
        </div>

        <div class="swatch">
          <div class="bg-danger text-danger-content name">Danger</div>
          <div class="bg-danger-50 shade"><span>50</span></div>
          <div class="bg-danger-100 shade"><span>100</span></div>
          <div class="bg-danger-200 shade"><span>200</span></div>
          <div class="bg-danger-300 shade"><span>300</span></div>
          <div class="bg-danger-400 shade"><span>400</span></div>
          <div class="bg-danger-500 shade"><span>500</span></div>
          <div class="bg-danger-600 shade"><span>600</span></div>
          <div class="bg-danger-700 shade"><span>700</span></div>
          <div class="bg-danger-800 shade"><span>800</span></div>
          <div class="bg-danger-900 shade"><span>900</span></div>
        </div>
      </div>
    </div>

    <div>
      <div class="text-xl font-bold mt-4 mb-2">Surface colors</div>

      <div class="grid grid-cols-xs gap-3">
        <div class="swatch">
          <div class="bg-surface text-surface-content name">Surface</div>
          <div class="bg-surface-100 shade"><span>100</span></div>
          <div class="bg-surface-200 shade"><span>200</span></div>
          <div class="bg-surface-300 shade"><span>300</span></div>
        </div>
      </div>
    </div>
  </div>
</main>

<style lang="postcss">
  .swatch {
    @apply rounded-lg overflow-hidden border;
  }
  .swatch .name {
    @apply grid place-items-center items-center font-semibold py-2;
  }
  .shade {
    @apply grid place-items-center py-1 text-sm;
  }
  .shade span {
    @apply bg-black/10 rounded px-2 text-white;
  }
</style>
