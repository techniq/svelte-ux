<script lang="ts">
  import { Kbd, ToggleGroup, ToggleOption } from 'svelte-ux';

  import Code from '$lib/components/Code.svelte';

  let selectedTab = 'svelte-cli';
</script>

<div class="prose max-w-none bg-surface-100 rounded border p-4 mt-4 m-2">
  <h1>Getting started</h1>

  <h2>Installation</h2>
  <ToggleGroup
    bind:value={selectedTab}
    variant="underline"
    classes={{ options: 'justify-start h-10 mb-3' }}
  >
    <ToggleOption value="svelte-cli">Svelte CLI</ToggleOption>
    <ToggleOption value="manual">Manual Install</ToggleOption>
  </ToggleGroup>

  <div class="grid gap-3">
    {#if selectedTab === 'svelte-cli'}
      <div>
        Start a new project SvelteKit project with <a
          href="https://svelte.dev/docs/cli/overview"
          target="_blank">sv</a
        > cli
      </div>
      <Code source={`npm sv create`} language="sh" />

      <div>Select Tailwind during setup OR run</div>
      <Code source={`npx sv add tailwindcss`} language="sh" />

      <div>Add Svelte UX package</div>
      <Code source={`npm install svelte-ux`} language="sh" />
    {:else if selectedTab === 'manual'}
      <div>
        Follow the Tailwind <a href="https://tailwindcss.com/docs/guides/sveltekit" target="_blank">
          guide
        </a> to setup a new SvelteKit project with Tailwind.
      </div>

      <div>Add Svelte UX package</div>
      <Code source={`npm install svelte-ux`} language="sh" />
    {/if}

    {#if selectedTab === 'svelte-cli' || selectedTab === 'manual'}
      <div>Update <code>tailwind.config.cjs</code></div>
      <Code
        source={`const colors = require('tailwindcss/colors');
const layerstack = require('@layerstack/tailwind/plugin');

module.exports = {
  content: [
    './src/**/*.{html,svelte}', 
    './node_modules/svelte-ux/**/*.{svelte,js}'
  ],

  // See customization docs: https://svelte-ux.techniq.dev/customization
  ux: {
    themes: {
      light: {
        primary: colors['orange']['500'],
        'primary-content': 'white',
        secondary: colors['blue']['500'],
        'surface-100': 'white',
        'surface-200': colors['gray']['100'],
        'surface-300': colors['gray']['300'],
        'surface-content': colors['gray']['900'],
        'color-scheme': 'light'
      },
      dark: {
        primary: colors['orange']['500'],
        'primary-content': 'white',
        secondary: colors['blue']['500'],
        'surface-100': colors['zinc']['800'],
        'surface-200': colors['zinc']['900'],
        'surface-300': colors['zinc']['950'],
        'surface-content': colors['zinc']['100'],
        'color-scheme': 'dark'
      },
    },
  },

  plugins: [
    layerstack,  // uses hsl() color space by default. To use oklch(), use: layerstack({ colorSpace: 'oklch' }),
  ]
};`}
        language="js"
      />
    {/if}
  </div>

  <p>A few notes regarding the <code>tailwind.config.cjs</code></p>

  <ul>
    <li>
      <code>{`./node_modules/svelte-ux/**/*.{(svelte, js)}`}</code> adds the library classes via
      <a href="https://tailwindcss.com/docs/content-configuration">JIT</a>
    </li>
    <li>
      <code>ux.themes</code> is used to configure the theme colors. See
      <a href="/customization">customization</a> for more details.
    </li>
    <li>
      Tailwind plugin injects the theme color variables, sets border, outline, ring, and typograpy
      defauls based on the theme, and adds additional utility classes including:
      <ul>
        <li>
          <code>elevation-#</code> for
          <a
            class="text-primary font-medium"
            href="https://www.joshwcomeau.com/css/designing-shadows/"
            rel="nofollow">realistic shadows</a
          >
          using multiple shadow layers, unlike the current Tailwind
          <a
            class="text-primary font-medium"
            href="https://tailwindcss.com/docs/box-shadow"
            rel="nofollow">shadows</a
          >
          which have at most 2 layers.
        </li>
        <li>
          <code>grid-stack</code> to easily stack grid children
        </li>
        <li>
          <code>scrollbar-none</code> to hide the scrollbar
        </li>
      </ul>
    </li>
  </ul>

  <h2>Usage</h2>

  <p>
    Using <code>components</code>, <code>actions</code>, <code>stores</code>, or <code>utils</code>
    are as simple as importing from <code>svelte-ux</code>.
  </p>

  <Code
    source={'<' +
      `script>
  import { Button } from 'svelte-ux';
</script>

<Button>Click here</Button>`}
    language="svelte"
  />

  <p>
    Search docs using <Kbd command class="text-xs">K</Kbd> or browse using the sidebar navigation.
  </p>
</div>
