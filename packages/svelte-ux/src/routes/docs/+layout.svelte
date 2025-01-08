<script lang="ts">
  import { onMount, type Snippet } from 'svelte';
  import { fade, slide } from 'svelte/transition';
  import { flatGroup } from 'd3-array';

  import {
    mdiCheckCircle,
    mdiChevronDown,
    mdiChevronRight,
    mdiClose,
    mdiCodeBraces,
    mdiCodeTags,
    mdiDatabaseOutline,
    mdiFileDocumentEditOutline,
    mdiGithub,
    mdiLink,
  } from '@mdi/js';

  import {
    ApiDocs,
    Button,
    Dialog,
    Icon,
    ListItem,
    TableOfContents,
    toTitleCase,
    cls,
    xlScreen,
    settings,
    getSettings,
  } from 'svelte-ux';

  import Code from '$lib/components/Code.svelte';
  import ViewSourceButton from '$docs/ViewSourceButton.svelte';

  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  interface Props {
    children?: Snippet;
  }

  let { children }: Props = $props();

  let [type, name] = $derived($page.url.pathname.split('/').slice(2) ?? []);
  let title = $derived($page.data.meta?.title ?? name);
  let pageUrl = $derived(`src/routes/docs/${type}/${name}/+page.svelte?plain=1`);
  let sourceUrl = $derived(`src/lib/${type}/${name}.${type === 'components' ? 'svelte' : 'ts'}`);
  let {
    description,
    features,
    related,
    hideUsage,
    hideTableOfContents,
    source,
    pageSource,
    api,
    status,
  } = $derived($page.data.meta ?? {});

  let showTableOfContents = $state<boolean>();
  $effect(() => {
    showTableOfContents = $xlScreen;
  });

  onMount(() => {
    showTableOfContents = !hideTableOfContents && $xlScreen;

    // Assign an `id` to every header element
    const headers = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headers.forEach((header) => {
      const id = header.innerHTML.toLowerCase().replace(/\s+/g, '_'); // Lowercase and convert spaces to underscores
      header.setAttribute('id', id);
    });
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
  class="[@media(min-height:900px)]:sticky top-[var(--headerHeight)] z-[60] bg-surface-200/90 backdrop-blur px-5 py-4 [mask-image:linear-gradient(to_bottom,rgba(0,0,0,1)calc(100%-4px),rgba(0,0,0,0))]"
>
  {#if title}
    <div>
      <div class="inline-block text-xs font-bold text-surface-content/50 capitalize">Docs</div>
      <Icon data={mdiChevronRight} class="divider opacity-25" />
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
          onclick={() => {
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
  {#if !$xlScreen}
    {#key $page.route.id}
      <Dialog
        bind:open={showTableOfContents}
        classes={{ dialog: 'w-[420px] max-w-[95vw] max-h-[95dvh]' }}
      >
        {#snippet title()}
          <div>On this page</div>
        {/snippet}
        <Button
          icon={mdiClose}
          class="absolute top-1 right-1"
          size="sm"
          onclick={() => (showTableOfContents = false)}
        />
        <TableOfContents
          icon={mdiChevronRight}
          class="px-4 py-2"
          onNodeClick={(e) => {
            showTableOfContents = false;
          }}
        />
      </Dialog>
    {/key}
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

      {@render children?.()}

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
                  <a href={item.url.toString()} class="group">
                    <ListItem
                      title={item.name.toString()}
                      {icon}
                      avatar={{ size: 'sm', class: 'text-xs text-white bg-primary' }}
                      list="group"
                      class="hover:bg-surface-200 cursor-pointer"
                    >
                      {#snippet actions()}
                        <div>
                          <Icon data={mdiChevronRight} class="text-surface-content/50" />
                        </div>
                      {/snippet}
                    </ListItem>
                  </a>
                {/each}
              </div>
            </div>
          {/each}
        </div>
      {/if}

      <!-- TODO: Re-enable once Svelte 5 compatibility replacement for sveld is add (issue #435) -->
      <!-- {#if api}
        <h1>API</h1>
        <ApiDocs {api} />
      {/if} -->
    </div>

    {#if showTableOfContents && $xlScreen}
      <div
        class="w-[224px] sticky top-[calc(var(--headerHeight)+10px)] pr-2 max-h-[calc(100dvh-64px)] overflow-auto z-[60]"
      >
        <div class="text-xs uppercase leading-8 tracking-widest text-surface-content/50">
          On this page
        </div>
        <!-- Rebuild toc when page changes -->
        {#key $page.route.id}
          <TableOfContents icon={mdiChevronRight} class="border-l pl-3" scrollOffset={184} />
        {/key}
      </div>
    {/if}
  </div>
</div>
