<script lang="ts">
	export let code = null;
	export let language = 'svelte';
</script>

<div class="border rounded">
	<div class="p-2">
		<slot />
	</div>

	{#if code}
		<pre
			class="language-{language} rounded-lg"
			style="margin: 0">
		<code class="language-{language}">
			{@html code}
		</code>
	</pre>
	{/if}
</div>
