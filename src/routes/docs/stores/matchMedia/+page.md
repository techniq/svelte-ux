<script>
  import { mdiCheckCircle, mdiCloseCircle } from '@mdi/js';

	import Preview from '$lib/components/Preview.svelte';
	import Icon from '$lib/components/Icon.svelte';

	import { matchMedia, matchMediaWidth, smScreen, mdScreen, lgScreen, xlScreen, xxlScreen } from '$lib/stores/matchMedia';

  let innerWidth = 0;
</script>

<h1>Usage</h1>

```svelte
<script>
  import { matchMedia } from 'svelte-ux';
  const isLargeScreen = matchMedia('(min-width: 768px)');
</script>

{#if $isLargeScreen}
  <div>Only visible on 768px+ screens</div>
{/if}
```

```svelte
<script>
  import { matchMediaWidth } from 'svelte-ux';
  const isLargeScreen = matchMediaWidth(768);
</script>

{#if $isLargeScreen}
  <div>Only visible on 768px+ screens</div>
{/if}
```

```svelte
<script>
  import { mdScreen } from 'svelte-ux';
</script>

{#if $mdScreen}
  <div>Only visible on 768px+ screens</div>
{/if}
```

<h1>Examples</h1>

<Preview>
  <div class="grid grid-cols-[auto,1fr] items-center gap-2">
    {#if $smScreen}
      <Icon path={mdiCheckCircle} size="1rem" class="text-emerald-500" />
    {:else}
      <Icon path={mdiCloseCircle} size="1rem" class="text-red-500" />
    {/if}
    $smScreen (640px)

    {#if $mdScreen}
      <Icon path={mdiCheckCircle} size="1rem" class="text-emerald-500" />
    {:else}
      <Icon path={mdiCloseCircle} size="1rem" class="text-red-500" />
    {/if}
    $mdScreen (768px)

    {#if $lgScreen}
      <Icon path={mdiCheckCircle} size="1rem" class="text-emerald-500" />
    {:else}
      <Icon path={mdiCloseCircle} size="1rem" class="text-red-500" />
    {/if}
    $lgScreen (1024px)

    {#if $xlScreen}
      <Icon path={mdiCheckCircle} size="1rem" class="text-emerald-500" />
    {:else}
      <Icon path={mdiCloseCircle} size="1rem" class="text-red-500" />
    {/if}
    $xlScreen (1280px)

    {#if $xxlScreen}
      <Icon path={mdiCheckCircle} size="1rem" class="text-emerald-500" />
    {:else}
      <Icon path={mdiCloseCircle} size="1rem" class="text-red-500" />
    {/if}
    $xxlScreen (1536px)

  </div>

  <div class="ml-6 mt-3 text-black/50 text-xs">
    current width: {innerWidth}px
  </div>
</Preview>

<svelte:window bind:innerWidth />
