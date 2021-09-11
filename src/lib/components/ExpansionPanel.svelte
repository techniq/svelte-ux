<script lang="ts">
	import { mdiChevronDown } from '@mdi/js';
	import clsx from 'clsx';

	import Collapse from './Collapse.svelte';
	import Icon from './Icon.svelte';

	// Support styles to be nested within a wrapping div (useful for `animate:flip`)
	export let nested = false;

	// TODO: Is it possible to hide if defined but no contents (contents within #if) and not require the extra `disabled` prop?
	// https://svelte.dev/repl/4ad13ff353154720b684b0d73e034e61?version=3.32.1
	// related issue: https://github.com/sveltejs/svelte/issues/5312
	export let disabled = false;
	$: enabled = $$slots.default && !disabled;
</script>

<Collapse
	{...$$restProps}
	class={clsx(
		'bg-white elevation-1 border-t',
		nested
			? 'group-first:border-t-0 group-first:rounded-t group-last:rounded-b'
			: 'first:border-t-0 first:rounded-t last:rounded-b',
		$$props.class
	)}
	style={$$props.style}
	popout
	{nested}
	{disabled}
	on:change
>
	<slot name="trigger" slot="trigger" />

	<div slot="icon" class="text-gray-500 px-2" let:active>
		<div class="transition-all duration-300 transform" class:-rotate-180={active}>
			<Icon path={enabled ? mdiChevronDown : null} />
		</div>
	</div>

	<slot name="actions" />
	{#if enabled}
		<div class="px-3 pt-2 pb-3 bg-gray-200 border-t">
			<slot />
		</div>
	{/if}
</Collapse>
