<script lang="ts">
  import { onMount } from 'svelte';
  import posthog from 'posthog-js';
  import 'prism-themes/themes/prism-vsc-dark-plus.css';

  import LucideArrowUpRight from '~icons/lucide/arrow-up-right';
  import LucideEllipsisVertical from '~icons/lucide/ellipsis-vertical';
  import LucideGithub from '~icons/lucide/github';
  import CustomBluesky from '~icons/custom-brands/bluesky';
  import CustomDiscord from '~icons/custom-brands/discord';

  import {
    AppBar,
    AppLayout,
    Button,
    MenuButton,
    QuickSearch,
    ThemeInit,
    ThemeSelect,
    ThemeSwitch,
    Tooltip,
    settings,
  } from 'svelte-ux';
  import { DEV } from 'esm-env';

  import { entries, createLocaleSettings } from '@layerstack/utils';
  import { lgScreen } from '@layerstack/svelte-stores';

  import NavMenu from './_NavMenu.svelte';
  import LanguageSelect from '$lib/components/LanguageSelect.svelte';

  import { afterNavigate, goto } from '$app/navigation';
  import { page } from '$app/stores';

  import './app.css';

  export let data;

  const baseGh = 'https://github.com/techniq/svelte-ux';
  $: ghLink = data.pr_id ? `${baseGh}/pull/${data.pr_id}` : baseGh;
  const baseTitle = 'Svelte UX';
  $: title = data.pr_id ? `🚧 (pr:${data.pr_id}) - ${baseTitle}` : baseTitle;

  settings({
    // fallbackLocale: 'fr',
    localeFormats: {
      fr: createLocaleSettings({
        locale: 'fr',
        formats: {
          dates: {
            baseParsing: 'dd/MM/yyyy',
            ordinalSuffixes: {
              one: 'er',
            },
          },
          numbers: {
            defaults: {
              currency: 'EUR',
            },
          },
        },
        dictionary: {
          Ok: 'Valider',
          Cancel: 'Annuler',
          Date: {
            Start: 'Début',
            End: 'Fin',
            Empty: 'Vide',

            Day: 'Jour',
            DayTime: 'Jour & Heure',
            Time: 'Heure',
            Week: 'Semaine',
            Month: 'Mois',
            Quarter: 'Trimestre',
            CalendarYear: 'Année',
            FiscalYearOct: 'Année fiscale (octobre)',
            BiWeek: 'Bi-hebdomadaire',

            PeriodDay: {
              Current: "Aujourd'hui",
              Last: 'Hier',
              LastX: 'Les {0} derniers jours',
            },
            PeriodWeek: {
              Current: 'Cette semaine',
              Last: 'La semaine dernière',
              LastX: 'Les {0} dernières semaines',
            },
            PeriodBiWeek: {
              Current: 'Cette quinzaine',
              Last: 'La quinzaine dernière',
              LastX: 'Les {0} dernières quinzaines',
            },
            PeriodMonth: {
              Current: 'Ce mois-ci',
              Last: 'Le mois dernier',
              LastX: 'Les {0} derniers mois',
            },
            PeriodQuarter: {
              Current: 'Ce trimestre',
              Last: 'Le trimestre dernier',
              LastX: 'Les {0} derniers trimestres',
            },
            PeriodQuarterSameLastyear: "Même trimestre l'année dernière",
            PeriodYear: {
              Current: 'Cette année',
              Last: "L'année dernière",
              LastX: 'Les {0} dernières années',
            },
            PeriodFiscalYear: {
              Current: 'Cette année fiscale',
              Last: "L'année fiscale dernière",
              LastX: 'Les {0} dernières années fiscales',
            },
          },
        },
      }),
    },

    components: {
      AppLayout: {
        classes: {
          aside: 'border-r',
          nav: 'bg-surface-300 py-2',
        },
      },
      AppBar: {
        classes:
          'bg-primary text-primary-content shadow-md [text-shadow:1px_1px_2px_var(--color-primary-700)]',
      },
      NavItem: {
        classes: {
          root: 'text-sm text-surface-content/70 pl-6 py-2 hover:bg-surface-100/70 relative',
          active:
            'text-primary bg-surface-100 font-medium before:absolute before:bg-primary before:rounded-full before:w-1 before:h-2/3 before:left-[6px] shadow-sm z-10',
        },
      },
    },
    themes: data.themes,
  });

  let mainEl: HTMLElement;
  afterNavigate(() => {
    mainEl.scrollTo({ top: 0, behavior: 'instant' });
  });

  const groups = ['components', 'actions', 'stores', 'utils'];
  const quickSearchOptions = entries(
    import.meta.glob('./docs/**/+page.(md|svelte)', { query: '?raw', eager: true })
  )
    .flatMap(([file, source]) => {
      const url = file.replace('.', '').replace(/\/\+page.(md|svelte)/, '');
      const [_, docs, group, name] = url.split('/');
      return {
        label: name,
        value: url,
        group: group,
      };
    })
    .sort((a, b) => groups.indexOf(a.group) - groups.indexOf(b.group));

  let currentPath = '';
  onMount(() => {
    // Delay adding `scroll-smooth` to `<html>` as provides better refresh experience
    // and fixes issue where sometimes doesn't scroll far enough
    setTimeout(() => {
      document.documentElement.classList.add('scroll-smooth');
    }, 0);

    // Posthog analytics
    if (!DEV) {
      const unsubscribePage = page.subscribe((page) => {
        if (currentPath && currentPath !== page.url.pathname) {
          // Page navigated away
          // @ts-expect-error - .capture() exists
          posthog.capture('pageleave');
        }

        // Page entered
        currentPath = page.url.pathname;
        // @ts-expect-error - .capture() exists
        posthog.capture('pageview');
      });

      const handleBeforeUnload = () => {
        // Hard reloads or browser exit
        // @ts-expect-error - .capture() exists
        posthog.capture('pageleave');
      };
      window.addEventListener('beforeunload', handleBeforeUnload);

      return () => {
        unsubscribePage();
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }
  });
</script>

<svelte:head>
  {#if $page.url.origin.includes('https')}
    <script
      defer
      src="https://static.cloudflareinsights.com/beacon.min.js"
      data-cf-beacon={JSON.stringify({ token: '1848f3c15bf0441f8cd02fe0c4acb3ce' })}
    ></script>

    <script
      async
      defer
      src="https://us.umami.is/script.js"
      data-website-id="f26cb766-3d47-4af4-a7a7-1cc519810b8f"
    ></script>
  {/if}
</svelte:head>

<!-- Set theme before anything renders (even when SSR is in use) -->
<ThemeInit />

<AppLayout>
  <svelte:fragment slot="nav">
    <NavMenu />
    <!-- Spacer -->
    <div class="h-4"></div>
  </svelte:fragment>

  <AppBar {title}>
    <div slot="actions" class="flex gap-3">
      <Button
        href="https://www.layerchart.com"
        icon={LucideArrowUpRight}
        target="_blank"
        class="p-2 max-lg:hidden flex-row-reverse"
      >
        LayerChart
      </Button>

      <QuickSearch
        options={quickSearchOptions}
        on:change={(e) => {
          // @ts-expect-error
          goto(e.detail.value);
        }}
        classes={{ button: 'max-sm:-mr-3' }}
      />

      <div class="border-r border-primary-content/20 pr-2 grid grid-cols-2 items-center">
        <LanguageSelect />
        {#if data.themes.light.length > 1 || data.themes.dark.length > 1}
          <ThemeSelect keyboardShortcuts />
        {:else}
          <ThemeSwitch classes={{ switch: 'bg-black/10' }} />
        {/if}
      </div>

      {#if $lgScreen}
        <Tooltip title="Discord" placement="left" offset={2}>
          <Button
            icon={CustomDiscord}
            href="https://discord.gg/697JhMPD3t"
            class="p-2"
            target="_blank"
          />
        </Tooltip>

        <Tooltip title="Bluesky" placement="left" offset={2}>
          <Button
            icon={CustomBluesky}
            href="https://bsky.app/profile/techniq.dev"
            class="p-2"
            target="_blank"
          />
        </Tooltip>

        <Tooltip title="View repository" placement="left" offset={2}>
          <Button icon={LucideGithub} href={ghLink} class="p-2" target="_blank" />
        </Tooltip>
      {:else}
        <MenuButton
          icon={LucideEllipsisVertical}
          menuIcon={false}
          iconOnly
          options={[
            {
              label: 'LayerChart',
              value: 'https://www.layerchart.com',
              icon: LucideArrowUpRight,
            },
            {
              label: 'Github',
              value: ghLink,
              icon: LucideGithub,
            },
            {
              label: 'Discord',
              value: 'https://discord.gg/697JhMPD3t',
              icon: CustomDiscord,
            },
            {
              label: 'Bluesky',
              value: 'https://bsky.app/profile/techniq.dev',
              icon: CustomBluesky,
            },
          ]}
          on:change={(e) => {
            window.open(e.detail.value, '_blank');
          }}
        >
          <span slot="selection" class="hidden"></span>
        </MenuButton>
      {/if}
    </div>
  </AppBar>

  <main class="isolate" bind:this={mainEl}>
    <slot />
  </main>
</AppLayout>
