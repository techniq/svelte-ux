<script lang="ts">
	import Stack from './Stack.svelte';

	export let title: string | null = null;
	export let subheading: string | null = null;
</script>

<Stack
	horizontal
	template="{$$slots.avatar ? 'auto' : ''} 1fr {$$slots.actions ? 'auto' : ''}"
	gap={16}
	items="center"
	class={$$props.class}
>
	<slot name="avatar" />

	<div>
		<slot name="title">
			{#if title}
				<div class="text-lg">{title}</div>
			{/if}
		</slot>

		<slot name="subheading">
			{#if subheading}
				<div class="text-sm text-secondary">{subheading}</div>
			{/if}
		</slot>
	</div>

	<slot name="actions" />
</Stack>
