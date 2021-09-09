<script lang="ts">
	import Grid from './Grid.svelte';

	export let vertical: boolean | undefined = undefined;
	export let horizontal: boolean | undefined = undefined;
	export let stack: boolean | undefined = undefined;
	export let template: string | undefined = undefined;
</script>

{#if vertical}
	<Grid autoFlow="row" templateColumns="initial" templateRows={template} on:click {...$$restProps}>
		<slot />
	</Grid>
{:else if horizontal}
	<Grid
		autoFlow="column"
		templateColumns={template}
		templateRows="initial"
		on:click
		{...$$restProps}
	>
		<slot />
	</Grid>
{:else if stack}
	<Grid
		stack
		items="center"
		justifyItems="center"
		templateColumns="initial"
		templateRows="initial"
		on:click
		{...$$props}
	>
		<slot />
	</Grid>
{/if}
