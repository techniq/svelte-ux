<script lang="ts">
	import { mdiChevronRight } from '@mdi/js';

	import Stack from './Stack.svelte';
	import Icon from './Icon.svelte';

	export let items = [];
	export let divider: string | undefined = undefined;
</script>

<Stack horizontal justify="start" items="center" gap={8} {...$$restProps}>
	{#each items ?? [] as item, index}
		<slot name="item" {item}>
			<div class="item">{item}</div>
		</slot>

		{#if index < items.length - 1}
			<slot name="divider">
				{#if divider}
					<div class="divider opacity-25">{divider}</div>
				{:else}
					<Icon path={mdiChevronRight} class="divider opacity-25" />
				{/if}
			</slot>
		{/if}
	{/each}
</Stack>
