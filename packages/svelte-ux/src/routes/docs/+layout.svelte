<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, slide } from 'svelte/transition';
  import { flatGroup } from 'd3-array';

  import {
    mdiCheckCircle,
    mdiChevronDown,
    mdiChevronRight,
    mdiCodeBraces,
    mdiCodeTags,
    mdiDatabaseOutline,
    mdiFileDocumentEditOutline,
    mdiGithub,
    mdiLink,
  } from '@mdi/js';

  import ApiDocs from '$lib/components/ApiDocs.svelte';
  import Button from '$lib/components/Button.svelte';
  import Code from '$lib/components/Code.svelte';
  import Icon from '$lib/components/Icon.svelte';
  import ListItem from '$lib/components/ListItem.svelte';
  import TableOfContents from '$lib/components/TableOfContents.svelte';

  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { settings, getSettings } from '$lib/components/settings.js';
  import ViewSourceButton from '$docs/ViewSourceButton.svelte';
  import { xlScreen } from '$lib/stores/matchMedia.js';
  import { cls } from '$lib/utils/styles.js';
  import { toTitleCase } from '$lib/utils/string.js';

  $: [type, name] = $page.url.pathname.split('/').slice(2) ?? [];
  $: title = $page.data.meta?.title ?? name;
  $: pageUrl = `src/routes/docs/${type}/${name}/+page.svelte?plain=1`;
  $: sourceUrl = `src/lib/${type}/${name}.${type === 'components' ? 'svelte' : 'ts'}`;
  $: ({
    description,
    features,
    related,
    hideUsage,
    hideTableOfContents,
    source,
    pageSource,
    api,
    status,
  } = $page.data.meta ?? {});

  $: showTableOfContents = false;

  onMount(() => {
    showTableOfContents = !hideTableOfContents && $xlScreen;
  });

  function getRelated(r: string) {
    if (r.startsWith('http')) {
      var url = new URL(r);
      if (url.hostname.includes('github.com')) {
        return { type: 'github', name: url.pathname.slice(1), url };
      } else {
        return { type: 'website', name: url, url };
      }
    } else if (r.startsWith('/')) {
      return { type: 'docs', name: toTitleCase(r.slice(1)), url: r };
    } else {
      const [type, name] = r.split('/');
      return { type, name, url: `/docs/${type}/${name}` };
    }
  }

  // Clear root layout theme so doesn't show on doc examples
  settings({ ...getSettings(), components: {} });
</script>

<div
  class="[@media(min-height:900px)]:sticky top-0 z-[60] bg-surface-200/90 backdrop-blur px-5 py-4 [mask-image:linear-gradient(to_bottom,rgba(0,0,0,1)calc(100%-4px),rgba(0,0,0,0))]"
>
  {#if title}
    <div>
      <div class="inline-block text-xs font-bold text-surface-content/50 capitalize">Docs</div>
      <Icon path={mdiChevronRight} class="divider opacity-25" />
      <div class="inline-block text-xs font-bold text-primary capitalize">
        {type}
      </div>
    </div>

    <div class="text-2xl font-bold">
      {title}
      {#if status}
        <span
          class={cls(
            'text-sm  px-2 rounded',
            status === 'beta' && 'bg-yellow-500/20 text-yellow-800',
            status === 'deprecated' && 'bg-danger/20 text-danger-900'
          )}
        >
          {status}
        </span>
      {/if}
    </div>

    {#if description}
      <div class="text-sm text-surface-content/60 whitespace-pre-line xl:pr-[240px]">
        {description}
      </div>
    {/if}

    <div class="flex gap-2 mt-3">
      <ViewSourceButton
        label="Source"
        {source}
        href={sourceUrl
          ? `https://github.com/techniq/svelte-ux/blob/main/packages/svelte-ux/${sourceUrl}`
          : ''}
        icon={mdiCodeTags}
      />

      <ViewSourceButton
        label="Page source"
        source={pageSource}
        href={pageUrl
          ? `https://github.com/techniq/svelte-ux/blob/main/packages/svelte-ux/${pageUrl}`
          : ''}
        icon={mdiFileDocumentEditOutline}
      />

      {#if !hideTableOfContents}
        <Button
          icon={mdiChevronDown}
          on:click={() => {
            showTableOfContents = !showTableOfContents;
          }}
          variant="fill-light"
          color="primary"
          size="sm"
        >
          On this page
        </Button>
      {/if}
    </div>
  {/if}
</div>

<div class="px-4">
  {#if showTableOfContents && !$xlScreen}
    <div transition:fade class="mt-3">
      {#key $page.route.id}
        <TableOfContents icon={mdiChevronRight} />
      {/key}
    </div>
  {/if}

  <div class="grid xl:grid-cols-[1fr,auto] gap-6 pb-4">
    <div class="overflow-auto p-1">
      {#if type === 'components' && !hideUsage}
        {#key $page.route.id}
          <h1 id="usage">Usage</h1>
          <Code source={`import { ${name} } from 'svelte-ux';`} language="javascript" />
        {/key}
      {/if}

      {#if features}
        {#key $page.route.id}
          <h1 id="features">Features</h1>
          <ul class="grid gap-2 pl-4 text-surface-content">
            {#each features as feature}
              <li class="grid grid-cols-[auto,1fr] gap-2">
                <Icon data={mdiCheckCircle} class="text-success pt-1" />
                <span>{@html feature}</span>
              </li>
            {/each}
          </ul>
        {/key}
      {/if}

      <slot />

      {#if related}
        <h1 id="related">Related</h1>
        <div class="related grid gap-3">
          {#each flatGroup(related.map(getRelated), (d) => d.type) as [type, items]}
            <div>
              <h2
                id="related-{type}"
                class="text-xs uppercase leading-8 tracking-widest text-surface-content/50"
              >
                {type}
              </h2>
              <div>
                {#each items as item}
                  {@const icon =
                    item.type === 'components'
                      ? mdiCodeTags
                      : item.type === 'stores'
                        ? mdiDatabaseOutline
                        : item.type === 'actions'
                          ? mdiCodeBraces
                          : item.type === 'github'
                            ? mdiGithub
                            : mdiLink}
                  <ListItem
                    title={item.name}
                    {icon}
                    avatar={{ size: 'sm', class: 'text-xs text-white bg-primary' }}
                    on:click={() => {
                      if (item.url instanceof URL) {
                        // open in new window
                        window.open(item.url);
                      } else {
                        // go to route
                        goto(item.url);
                      }
                    }}
                    class="hover:bg-surface-200 cursor-pointer"
                  >
                    <div slot="actions">
                      <Icon data={mdiChevronRight} class="text-surface-content/50" />
                    </div>
                  </ListItem>
                {/each}
              </div>
            </div>
          {/each}
        </div>
      {/if}

      {#if api}
        <h1>API</h1>
        <ApiDocs {api} />
      {/if}
    </div>

    {#if showTableOfContents && $xlScreen}
      <div transition:slide={{ axis: 'x' }}>
        <div class="w-[224px] sticky top-10 pr-2 max-h-[calc(100dvh-64px)] overflow-auto z-[60]">
          <div class="text-xs uppercase leading-8 tracking-widest text-surface-content/50">
            On this page
          </div>
          <!-- Rebuild toc when page changes -->
          {#key $page.route.id}
            <TableOfContents icon={mdiChevronRight} class="text-surface-content" />
          {/key}
        </div>
      </div>
    {/if}
  </div>
</div>
