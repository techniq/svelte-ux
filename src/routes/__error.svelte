<script context="module">
	export function load({ error, status }) {
		return {
			props: { error, status }
		};
	}
</script>

<script lang="ts">
	import AppBar from '$lib/components/AppBar.svelte';
	import Stack from '$lib/components/Stack.svelte';

	export let status: number;
	export let error: Error & { frame?: string } & { loc?: object };
</script>

<AppBar title={['Error', status]} />

<main class="p-4">
	<Stack vertical gap={16}>
		<div>
			<h2 class="text-lg font-bold mb-1">Message:</h2>
			<pre class="ml-2 p-4 border rounded-md text-xs bg-black/80 text-white">{error.message}</pre>
		</div>

		{#if error.frame}
			<div>
				<h2 class="text-lg font-bold mb-1">Frame:</h2>
				<pre class="ml-2 p-4 border rounded-md text-xs bg-black/80 text-white">{error.frame}</pre>
			</div>
		{/if}

		{#if error.stack}
			<div>
				<h2 class="text-lg font-bold mb-1">Stack:</h2>
				<pre class="ml-2 p-4 border rounded-md text-xs bg-black/80 text-white">{error.stack}</pre>
			</div>
		{/if}
	</Stack>
</main>
