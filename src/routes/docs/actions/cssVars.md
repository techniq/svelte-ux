<script lang="ts">
	import { subDays, subMonths } from 'date-fns';

	import Preview from '$lib/components/Preview.svelte';
	import TextField from '$lib/components/TextField.svelte';

	import cssVars from '$lib/actions/cssVars';

	let styleVars = { background: '#ddd', border: '1px solid #aaa' };
</script>

## cssVars

### Reactively set CSS variables using a single object

<Preview>
	<div class="grid gap-4" use:cssVars={styleVars}>
		<div class="w-10 h-10 rounded" style="background-color: var(--background); border: var(--border)" />
		<div class="grid grid-flow-col gap-2">
			<TextField label="Background" bind:value={styleVars.background} />
			<TextField label="Border" bind:value={styleVars.border} />
		</div>
	</div>
</Preview>
