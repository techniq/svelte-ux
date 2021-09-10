<script context="module">
	export const tabsKey = {};
</script>

<script lang="ts">
	import { setContext, createEventDispatcher } from 'svelte';
	import { writable } from 'svelte/store';
	import { crossfade, fade } from 'svelte/transition';
	import cssVars from '$lib/actions/cssVars';

	export let selected: any = undefined; // index or value

	// styles
	export let contained: boolean = false;
	export let underlined: boolean = false;
	export let vertical: boolean = false;
	export let circle: boolean = false;

	$: styleVars = {
		flow: vertical ? 'row' : 'column',
		borderRadius: circle ? '9999px' : null
	};

	const tabs: HTMLElement[] = [];
	const tabsByValue: Map<any, HTMLElement> = new Map();
	const panels: HTMLElement[] = [];
	const selectedTab = writable(undefined);
	const selectedPanel = writable(undefined);
	const [send, receive] = crossfade({ fallback: fade });
	const dispatch = createEventDispatcher();

	// Selected changed (controlled)
	$: {
		// Find selected tab element based on selected value/index
		const newSelectedTab = tabsByValue.get(selected) || tabs[selected];
		// console.log({ selected, newSelectedTab });
		selectTab(newSelectedTab, selected);
	}

	function registerTab(tab: HTMLElement, value: any) {
		tabs.push(tab);
		// if (value != null) {
		tabsByValue.set(value, tab);
		// }

		// Select tab if selected after being registered
		if (/*selected != null &&*/ value === selected) {
			selectTab(tab, value);
		}
	}

	function unregisterTab(tab: HTMLElement, value: any) {
		const i = tabs.indexOf(tab);
		tabs.splice(i, 1);
		selectedTab.update((current) => (current === tab ? tabs[i] || tabs[tabs.length - 1] : current));
		tabsByValue.delete(value);
	}

	function registerPanel(panel: HTMLElement) {
		panels.push(panel);
		selectedPanel.update((current) => current || panel);
	}

	function unregisterPanel(panel: HTMLElement) {
		const i = panels.indexOf(panel);
		panels.splice(i, 1);
		selectedPanel.update((current) =>
			current === panel ? panels[i] || panels[panels.length - 1] : current
		);
	}

	function selectTab(tab: HTMLElement, value: any) {
		// console.log('selectTab', tab, value);

		if (tab) {
			dispatch('change', { value });
			$selectedTab = tab;
			selected = value;

			const i = tabs.indexOf(tab);
			$selectedPanel = panels[i];
		}
	}

	setContext(tabsKey, {
		registerTab,
		unregisterTab,
		registerPanel,
		unregisterPanel,
		selectTab,
		selectedTab,
		selectedPanel,
		crossfade: [send, receive]
	});
</script>

<div class="tabs" class:contained class:underlined use:cssVars={styleVars} {...$$restProps}>
	<slot />
</div>

<style lang="postcss">
	/*
	 * Contained (Apple) style
	 */
	.contained :global(.tabList) {
		@apply inline-grid overflow-hidden p-1 text-sm bg-black/10 border-black/20 transition-shadow;
		grid-auto-flow: var(--flow);
		border-radius: var(--borderRadius, 10px);
	}
	.contained :global(.tabList:hover) {
		@apply shadow border-gray-700;
	}

	/* TODO: Determine why this no longer works.  Could be due to recent Svelte change with :global() or Tailwind */
	/* .contained :global(.tabContainer) {
    @apply text-black/50 hover:text-opacity-100 hover:bg-black/5 ring-black/40 focus-visible:ring-1;
    border-radius: var(--borderRadius, 8px);
  } */
	.contained :global(.tabContainer) {
		@apply text-black/50 ring-black/40;
		border-radius: var(--borderRadius, 8px);
	}
	.contained :global(.tabContainer:hover) {
		@apply text-opacity-100 bg-black/5;
	}
	.contained :global(.tabContainer:focus-visible) {
		@apply ring-1;
	}

	.contained :global(.tabContainer.selected) {
		@apply text-black;
	}

	.contained :global(.indicator) {
		@apply bg-white w-full h-full z-0 shadow-md ring-black/20 ring-1;
		border-radius: var(--borderRadius, 8px);
	}

	/*
	 * Underline (Twitter) style
	 */
	.underlined :global(.tabList) {
		border-bottom: 1px solid #ddd;
		/* min-height: 53px; */
		display: flex;
		font-size: 0.9375rem;
		font-weight: 700;
		font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
	}

	.underlined :global(.tabContainer) {
		font-size: 0.9375rem;
		font-weight: 700;
		color: #657786;
	}

	.underlined :global(.selected) {
		color: #1da1f2;
	}

	.underlined :global(.indicator) {
		width: 100%;
		height: 100%;
		border-bottom: 2px solid #1da1f2;
	}

	.underlined :global(.circle .tabList) {
		width: 144px;
		height: 48px;
		border-radius: 24px;
		min-height: 48px;
	}

	.underlined :global(.circle .indicator) {
		border-radius: 24px;
		border: 2px solid #1da1f2;
	}
</style>
