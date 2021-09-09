<script lang="ts">
	export let code;
	export let language = 'svelte';
</script>

<div class="border rounded">
	<div class="p-2">
		<slot />
	</div>

	<pre
		class="language-{language} rounded-lg"
		style="margin: 0">
		<code class="language-{language}">
			{@html code}
		</code>
	</pre>
</div>
