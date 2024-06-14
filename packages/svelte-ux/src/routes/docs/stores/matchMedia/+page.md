<script lang="ts">
  import { mdiCheckCircle, mdiCloseCircle } from '@mdi/js';

	import {
    Icon,
    matchMedia,
    matchMediaWidth,
    smScreen,
    mdScreen,
    lgScreen,
    xlScreen,
    xxlScreen,
    screen,
    print,
    darkColorScheme,
    motionReduce
   } from 'svelte-ux';

	import Preview from '$lib/components/Preview.svelte';


  let innerWidth = 0;
</script>

<h1>Usage</h1>

<h2>Full media query</h2>

```svelte
<script>
  import { matchMedia } from 'svelte-ux';
  const isLargeScreen = matchMedia('(min-width: 768px)');
</script>

{#if $isLargeScreen}
  <div>Only visible on 768px+ screens</div>
{/if}
```

<h2>Convenient width media query</h2>

```svelte
<script>
  import { matchMediaWidth } from 'svelte-ux';
  const isLargeScreen = matchMediaWidth(768);
</script>

{#if $isLargeScreen}
  <div>Only visible on 768px+ screens</div>
{/if}
```

<h2>Convenient presets (tailwind defaults)</h2>

```svelte
<script>
  import { mdScreen } from 'svelte-ux';
</script>

{#if $mdScreen}
  <div>Only visible on 768px+ screens</div>
{/if}
```

```svelte
<script>
  import { print } from 'svelte-ux';
</script>

{#if $print}
  <div>Only visable when printing</div>
{/if}
```

<h1>Examples</h1>

<Preview>
  <div class="grid grid-cols-[auto,1fr] items-center gap-2">
    {#if $smScreen}
      <Icon data={mdiCheckCircle} size="1rem" class="text-success" />
    {:else}
      <Icon data={mdiCloseCircle} size="1rem" class="text-danger" />
    {/if}
    $smScreen (640px)

    {#if $mdScreen}
      <Icon data={mdiCheckCircle} size="1rem" class="text-success" />
    {:else}
      <Icon data={mdiCloseCircle} size="1rem" class="text-danger" />
    {/if}
    $mdScreen (768px)

    {#if $lgScreen}
      <Icon data={mdiCheckCircle} size="1rem" class="text-success" />
    {:else}
      <Icon data={mdiCloseCircle} size="1rem" class="text-danger" />
    {/if}
    $lgScreen (1024px)

    {#if $xlScreen}
      <Icon data={mdiCheckCircle} size="1rem" class="text-success" />
    {:else}
      <Icon data={mdiCloseCircle} size="1rem" class="text-danger" />
    {/if}
    $xlScreen (1280px)

    {#if $xxlScreen}
      <Icon data={mdiCheckCircle} size="1rem" class="text-success" />
    {:else}
      <Icon data={mdiCloseCircle} size="1rem" class="text-danger" />
    {/if}
    $xxlScreen (1536px)

    {#if $screen}
      <Icon data={mdiCheckCircle} size="1rem" class="text-success" />
    {:else}
      <Icon data={mdiCloseCircle} size="1rem" class="text-danger" />
    {/if}
    $screen

    {#if $print}
      <Icon data={mdiCheckCircle} size="1rem" class="text-success" />
    {:else}
      <Icon data={mdiCloseCircle} size="1rem" class="text-danger" />
    {/if}
    $print

    {#if $darkColorScheme}
      <Icon data={mdiCheckCircle} size="1rem" class="text-success" />
    {:else}
      <Icon data={mdiCloseCircle} size="1rem" class="text-danger" />
    {/if}
    $darkColorScheme

    {#if $motionReduce}
      <Icon data={mdiCheckCircle} size="1rem" class="text-success" />
    {:else}
      <Icon data={mdiCloseCircle} size="1rem" class="text-danger" />
    {/if}
    $motionReduce

  </div>

  <div class="ml-6 mt-3 text-surface-content/50 text-xs">
    current width: {innerWidth}px
  </div>
</Preview>

<svelte:window bind:innerWidth />
