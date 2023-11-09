<script lang="ts">
	let self: ConstructorOfATypedSvelteComponent | undefined | null = undefined;
	export { self as this }

	let component;

</script>

{#if self}
	<svelte:component bind:this={component} this={self} {...$$restProps}>
		<slot {component} />
	</svelte:component>
{:else}
	<slot />
{/if}