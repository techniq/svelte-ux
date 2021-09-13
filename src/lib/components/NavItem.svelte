<script lang="ts">
	import clsx from 'clsx';
	import { isActive, url } from '../utils/routing';

	import Icon from './Icon.svelte';
	import { scrollIntoView } from '../actions/scroll';
	import { getScrollParent } from '../utils/dom';

	export let path: string;
	export let text: string;
	export let icon: string | null = null;

	$: isPathActive = $isActive(path);
</script>

<a
	href={url(path)}
	class={clsx(
		'flex items-center text-sm p-1 hover:text-white hover:bg-gray-300/10 relative',
		isPathActive ? ['text-sky-400', 'bg-gray-500/10'] : 'text-gray-400',
		$$props.class
	)}
	use:scrollIntoView={{
		condition: (node) => {
			if (isPathActive) {
				const nodeTop = node.getBoundingClientRect().top;
				const scrollParent = getScrollParent(node);
				const scrollParentHeight = scrollParent.offsetHeight;
				const threshold = 0;
				const isVisible = scrollParentHeight - nodeTop < threshold;
				return isVisible;
			} else {
				return false;
			}
		},
		delay: 500
	}}
>
	{#if isPathActive}
		<div class="absolute left-0 top-0 w-1 h-full bg-light-blue-300" />
	{/if}

	{#if $$slots.avatar}
		<slot name="avatar" />
	{/if}

	{#if icon}
		<Icon path={icon} class="mr-3" />
	{/if}

	{text}
</a>
