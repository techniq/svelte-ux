<script lang="ts">
  import { mdiCodeTags, mdiFileDocumentEditOutline } from '@mdi/js';

  import Button from '$lib/components/Button.svelte';
  import Code from '$lib/components/Code.svelte';
  import Tooltip from '$lib/components/Tooltip.svelte';
  import TableOfContents from '$lib/components/TableOfContents.svelte';

  import { page } from '$app/stores';

  $: [path, type, name] = $page.url.pathname.match('.*/(.*)/(.*)') ?? [];
  $: title = $page.data.meta?.title ?? name;
  $: docUrl = `src/routes/docs/${type}/${name}/+page.md?plain=1`;
  $: sourceUrl = `src/lib/${type}/${name}.${type === 'components' ? 'svelte' : 'ts'}`;
  $: ({ description, related, hideUsage } = $page.data.meta ?? {});
</script>

<div class="grid grid-rows-[auto,1fr] h-full p-4">
  <div>
    {#if title}
      <div class="flex items-center gap-2 _border-b border-black/10">
        <span class="text-2xl font-bold">{title}</span>
        {#if sourceUrl}
          <Tooltip title="View source">
            <Button
              class="text-black/50 p-1"
              icon={mdiCodeTags}
              href="https://github.com/techniq/svelte-ux/blob/master/{sourceUrl}"
              target="_blank"
            />
          </Tooltip>
        {/if}

        {#if docUrl}
          <Tooltip title="Edit this page">
            <Button
              class="text-black/50 p-1"
              icon={mdiFileDocumentEditOutline}
              href="https://github.com/techniq/svelte-ux/blob/master/{docUrl}"
              target="_blank"
            />
          </Tooltip>
        {/if}
      </div>

      {#if description}
        <div class="text-sm text-black/60">
          {description}
        </div>
      {/if}
    {/if}
  </div>

  <div class="grid grid-cols-[1fr,auto] gap-6 pt-2 pb-4">
    <div class="overflow-auto">
      {#if type === 'components' && !hideUsage}
        {#key $page.route.id}
          <h1 id="usage">Usage</h1>
          <Code code={`import { ${name} } from 'svelte-ux';`} language="javascript" />
        {/key}
      {/if}

      <slot />

      {#if related}
        <h1 id="related">Related</h1>
        <ul class="list-inside list-disc ml-2">
          {#each related as r}
            <li>
              <a href="/docs/{r}">{r}</a>
            </li>
          {/each}
        </ul>
      {/if}
    </div>

    <div class="hidden lg:block w-[224px]">
      <div class="sticky top-0 pr-2">
        <div class="text-xs uppercase leading-8 tracking-widest text-black/50">On this page</div>
        <!-- Rebuild toc when page changes -->
        {#key $page.route.id}
          <TableOfContents />
        {/key}
      </div>
    </div>
  </div>
</div>
