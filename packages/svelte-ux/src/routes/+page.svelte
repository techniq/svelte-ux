<script lang="ts">
  import { Kbd, ToggleGroup, ToggleOption } from 'svelte-ux';

  import Code from '$lib/components/Code.svelte';

  let selectedTab = 'svelte-cli';
</script>

<div class="prose max-w-none bg-surface-100 rounded-sm border p-4 mt-4 m-2">
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
      <Code source={`npm install svelte-ux@next`} language="sh" />
    {:else if selectedTab === 'manual'}
      <div>
        Follow the Tailwind <a href="https://tailwindcss.com/docs/guides/sveltekit" target="_blank">
          guide
        </a> to setup a new SvelteKit project with Tailwind.
      </div>

      <div>Add Svelte UX package</div>
      <Code source={`npm install svelte-ux@next`} language="sh" />
    {/if}

    {#if selectedTab === 'svelte-cli' || selectedTab === 'manual'}
      <div>Update <code>app.css</code></div>
      <Code
        source={`@import 'tailwindcss';
@import '@layerstack/tailwind/core.css';
@import '@layerstack/tailwind/utils.css';
@import '@layerstack/tailwind/themes/basic.css'; /* Note: Theme choice explained below */

@source '../../node_modules/svelte-ux/dist';
@source '../../node_modules/layerchart/dist';  /* if using LayerChart */

/*
You can customize your theme as you see fit using CSS variables.
Dark mode is targeted using with .dark class on :root/<html>
*/
:root {
  --color-primary: var(--color-purple-700);
  --color-secondary: var(--color-orange-500);

  &.dark {
    --color-primary: var(--color-purple-400);
    --color-surface-100: var(--color-zinc-900);
    --color-surface-200: var(--color-zinc-950);
    --color-surface-300: var(--color-black);
  }
}
`}
        language="css"
      />
    {/if}
  </div>

  <strong class="block mt-3 mb-1 text-surface-content">Theme setup:</strong>
  <ul class="list-disc pl-6 space-y-1 my-1 text-sm text-surface-content">
    <li>
      The line <code>@import '@layerstack/tailwind/themes/basic.css';</code> in the CSS example
      above provides basic light and dark theme support. If you require multiple light/dark themes,
      or want to use pre-built themes like Skeleton or Daisy UI (which is what the Svelte UX
      <a
        href="https://github.com/techniq/svelte-ux/blob/next/packages/svelte-ux/src/routes/app.css"
        target="_blank">docs</a
      >
      use), you should replace this line with
      <code>@import '@layerstack/tailwind/themes/all.css';</code>.
    </li>
    <li>
      @layerstack/tailwind (the theme system used by Svelte UX) was migrated to be css-only. You can
      see the source on the next branch <a
        href="https://github.com/techniq/layerstack/tree/next/packages/tailwind/src/lib/css"
        target="_blank">here</a
      >
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
