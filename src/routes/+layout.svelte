<script lang="ts">
  import { inject } from '@vercel/analytics';
  import 'prism-themes/themes/prism-vsc-dark-plus.css';
  import { dev } from '$app/environment';
  import { mdiGithub } from '@mdi/js';

  import AppBar from '$lib/components/AppBar.svelte';
  import AppLayout from '$lib/components/AppLayout.svelte';
  import Button from '$lib/components/Button.svelte';
  import Tooltip from '$lib/components/Tooltip.svelte';
  import NavMenu from './_NavMenu.svelte';
  import QuickSearch from '$lib/components/QuickSearch.svelte';
  import { goto } from '$app/navigation';
  import { createTheme } from '$lib/components/theme';

  inject({ mode: dev ? 'development' : 'production' });

  const quickSearchOptions = Object.entries(
    import.meta.glob('./docs/**/+page.(md|svelte)', { as: 'raw', eager: true })
  ).flatMap(([file, source]) => {
    const url = file.replace('.', '').replace(/\/\+page.(md|svelte)/, '');
    const [_, docs, group, name] = url.split('/');
    return {
      name,
      value: url,
      group: group,
    };
  });

  createTheme({
    AppBar: 'bg-accent-500 text-white shadow-md',
    AppLayout: {
      nav: 'bg-[#282b31] py-4',
    },
    NavItem: {
      root: 'text-gray-400 hover:text-white hover:bg-gray-300/10 [&:where(.is-active)]:text-sky-400 [&:where(.is-active)]:bg-gray-500/10 pl-6 py-2',
      indicator: 'bg-sky-500',
    },

    // AppLayout: {
    //   aside: 'border-r border-gray-400',
    // },
  });
</script>

<AppLayout>
  <nav slot="nav" class="h-full">
    <NavMenu />
    <!-- Spacer -->
    <div class="h-4" />
  </nav>

  <AppBar title="svelte-ux">
    <div slot="actions">
      <QuickSearch options={quickSearchOptions} on:change={(e) => goto(e.detail.value)} />

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

  <main class="scroll-smooth">
    <slot />
  </main>
</AppLayout>

<style lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  :global(body) {
    @apply bg-black/10;
  }

  :global(main h1) {
    @apply text-xl font-semibold mt-8 mb-2 ml-2 border-b border-gray-400 pb-1;
  }

  :global(main h2) {
    @apply text-lg font-semibold mt-4 mb-1 ml-2;
  }
  :global(main h2:first-child) {
    @apply mt-0;
  }

  :global(main h3) {
    @apply text-xs text-black/50 ml-2 mb-1;
  }
  :global(main h2 + h3) {
    @apply -mt-1;
  }

  :global(nav h1) {
    @apply py-2 pl-4 mt-4 text-sm text-gray-200 font-bold bg-black/20 border-t border-b border-white/10;
  }

  :global(nav h2) {
    @apply pt-4 pb-2 pl-4 text-xs text-gray-200 font-bold;
  }
</style>
