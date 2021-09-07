<script context="module">
	// Custom components: https://mdsvex.com/docs#custom-components
	// import code from './Code.svelte';
	// export { code };
</script>

<script>
	// frontmatter: https://mdsvex.com/docs#frontmatter-1
	export let title;
</script>

{#if title}
	<h1>{title}</h1>
{/if}

<slot />
