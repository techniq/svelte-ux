<script>
	import 'prism-themes/themes/prism-vsc-dark-plus.css';

	import AppLayout from '$lib/components/AppLayout.svelte';
	import MenuItem from '$lib/components/MenuItem.svelte';
</script>

<AppLayout>
	<nav slot="nav" class="nav h-full">
		<div class="pt-4 pb-2 pl-4 text-sm text-gray-200 font-bold">Components</div>

		<MenuItem text="AppBar" path="/docs/AppBar" class="pl-6 py-3" />
		<MenuItem text="Breadcrumb" path="/docs/Breadcrumb" class="pl-6 py-3" />
		<MenuItem text="Button" path="/docs/Button" class="pl-6 py-3" />
		<MenuItem text="Grid" path="/docs/Grid" class="pl-6 py-3" />
		<MenuItem text="Icon" path="/docs/Icon" class="pl-6 py-3" />
		<MenuItem text="Stack" path="/docs/Stack" class="pl-6 py-3" />
	</nav>

	<slot />
</AppLayout>

<style lang="postcss">
	@tailwind base;
	@tailwind components;
	@tailwind utilities;

	:global(body) {
		@apply bg-black/10;
	}

	:global(h2) {
		@apply text-lg font-semibold mt-8 mb-1 ml-2;
	}
	:global(h2:first-child) {
		@apply mt-0;
	}
</style>
