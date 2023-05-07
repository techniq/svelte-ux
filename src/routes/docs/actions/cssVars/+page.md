<script lang="ts">
	import { subDays, subMonths } from 'date-fns';

	import Preview from '$lib/components/Preview.svelte';
	import TextField from '$lib/components/TextField.svelte';

	import cssVars from '$lib/actions/cssVars';

	let background = '#ddd';
	let border = '1px solid #aaa';
</script>

<h1>Usage</h1>

```js
import { cssVars } from 'svelte-ux';
```

<Preview>
	<div class="grid gap-4" use:cssVars={{ background, border }}>
		<div class="w-10 h-10 rounded" style="background-color: var(--background); border: var(--border)" />
		<div class="grid grid-flow-col gap-2">
			<TextField label="Background" bind:value={background} />
			<TextField label="Border" bind:value={border} />
		</div>
	</div>
</Preview>
