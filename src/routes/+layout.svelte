<script lang="ts">
  import { inject } from '@vercel/analytics';
  import 'prism-themes/themes/prism-vsc-dark-plus.css';
  import { dev } from '$app/environment';
  import { mdiGithub, mdiOpenInNew, mdiTwitter } from '@mdi/js';

  import AppBar from '$lib/components/AppBar.svelte';
  import AppLayout from '$lib/components/AppLayout.svelte';
  import Button from '$lib/components/Button.svelte';
  import Tooltip from '$lib/components/Tooltip.svelte';
  import NavMenu from './_NavMenu.svelte';
  import QuickSearch from '$lib/components/QuickSearch.svelte';
  import { afterNavigate, goto } from '$app/navigation';
  import { createTheme } from '$lib/components/theme';

  inject({ mode: dev ? 'development' : 'production' });

  createTheme({
    // AppBar: 'bg-accent-500 text-white shadow-md',
  });

  let mainEl: HTMLElement;
  afterNavigate(() => {
    // @ts-ignore: `instant` not in spec, but supported by Chrome/Firefox - https://kilianvalkhof.com/2022/css-html/preventing-smooth-scrolling-with-javascript/
    mainEl.scrollTo({ top: 0, behavior: 'instant' });
  });

  const groups = ['components', 'actions', 'stores', 'utils'];
  const quickSearchOptions = Object.entries(
    import.meta.glob('./docs/**/+page.(md|svelte)', { as: 'raw', eager: true })
  )
    .flatMap(([file, source]) => {
      const url = file.replace('.', '').replace(/\/\+page.(md|svelte)/, '');
      const [_, docs, group, name] = url.split('/');
      return {
        name,
        value: url,
        group: group,
      };
    })
    .sort((a, b) => groups.indexOf(a.group) - groups.indexOf(b.group));
</script>

<AppLayout>
  <nav slot="nav" class="h-full">
    <NavMenu />
    <!-- Spacer -->
    <div class="h-4" />
  </nav>

  <AppBar title="svelte-ux">
    <div slot="actions" class="flex gap-3">
      <Button href="https://www.layerchart.com" icon={mdiOpenInNew} target="_blank" class="p-2">
        LayerChart
      </Button>

      <QuickSearch options={quickSearchOptions} on:change={(e) => goto(e.detail.value)} />

      <Tooltip title="Open Twitter / X" placement="left" offset={2}>
        <Button
          icon={mdiTwitter}
          href="https://twitter.com/techniq35"
          class="p-2"
          target="_blank"
        />
      </Tooltip>

      <Tooltip title="View repository" placement="left" offset={2}>
        <Button
          icon={mdiGithub}
          href="https://github.com/techniq/svelte-ux"
          class="p-2"
          target="_blank"
        />
      </Tooltip>
    </div>
  </AppBar>

  <main class="scroll-smooth" bind:this={mainEl}>
    <slot />
  </main>
</AppLayout>

<style lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  :global(main h1:not(.prose *, .related *, .ApiDocs *)) {
    @apply text-xl font-semibold mt-8 mb-2 border-b border-gray-400 pb-1;
    scroll-margin-top: 128px; /* sticky header */
  }

  :global(main h2:not(.prose *, .related *, .ApiDocs *)) {
    @apply text-lg font-semibold mt-4 mb-1;
    scroll-margin-top: 128px; /* sticky header */
  }

  :global(main h3:not(.prose *, .related *, .ApiDocs *)) {
    @apply text-xs text-black/50 mb-1;
    scroll-margin-top: 128px; /* sticky header */
  }
  :global(main :not(.prose) h2 + h3) {
    @apply -mt-1;
  }

  :global(main small) {
    @apply text-xs text-black/50 inline-block;
  }

  :global(.TableOfContents small) {
    @apply hidden;
  }

  /* Material */

  :global(body) {
    @apply bg-neutral-200 accent-accent-500;
  }

  :global(nav) {
    @apply bg-neutral-800 py-2;
  }

  :global(nav h1) {
    @apply py-2 pl-4 mt-4 text-sm text-gray-200 font-bold bg-black/20 border-t border-b border-white/10;
  }

  :global(nav h2) {
    @apply pt-4 pb-2 pl-4 text-xs text-gray-200 font-bold;
  }

  :global(nav .NavItem) {
    @apply text-sm text-gray-400 pl-5 py-2 border-l-4 border-transparent;

    &:hover {
      @apply text-white bg-gray-300/10;
    }

    &.is-active {
      @apply text-accent-100 bg-gray-500/10 border-accent-500;
    }
  }

  :global(.AppLayout > .AppBar) {
    @apply bg-accent-500 text-white shadow-md;
  }

  /* New theme */
  /* :global(body) {
    @apply bg-neutral-900;
  }

  :global(aside) {
    @apply border-r border-neutral-700;
  }

  :global(nav) {
    @apply bg-neutral-900 py-2;
  }

  :global(nav h1) {
    @apply py-2 pl-4 mt-4 text-sm text-gray-200 font-bold bg-black/20 border-t border-b border-white/10;
  }

  :global(nav h2) {
    @apply pt-4 pb-2 pl-4 text-xs text-gray-200 font-bold;
  }

  :global(nav .NavItem) {
    @apply text-sm text-gray-400 py-1 border-l border-neutral-700 pl-4 ml-4;
  }

  :global(nav .NavItem:hover) {
    @apply text-white bg-gray-300/10;
  }

  :global(nav .NavItem.is-active) {
    @apply text-accent-200 bg-accent-500/20 border-accent-300;
  }

  :global(.AppBar) {
    @apply bg-neutral-800/70 text-white shadow-md backdrop-blur-lg;
  }

  :global(main) {
    @apply text-neutral-200;
  } */
</style>
