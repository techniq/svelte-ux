<script lang="ts">
	import Preview from '$lib/components/Preview.svelte';

	import { matchMedia, matchMediaWidth, smScreen, mdScreen } from '$lib/stores/matchMedia';
</script>

<h1>Usage</h1>

```js
import { matchMedia } from 'svelte-ux';
const isLargeScreen = matchMedia('(min-width: 768px)')

{#if $isLargeScreen}
  <div>Only visible on 768px+ screens
{/if}
```

```js
import { matchMediaWidth } from 'svelte-ux';
const isLargeScreen = matchMediaWidth(768)

{#if $isLargeScreen}
  <div>Only visible on 768px+ screens
{/if}
```

```js
import { mdScreen } from 'svelte-ux';

{#if $mdScreen}
  <div>Only visible on 768px+ screens
{/if}
```
