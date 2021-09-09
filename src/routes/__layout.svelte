<script>
	import 'prism-themes/themes/prism-vsc-dark-plus.css';

	import AppLayout from '$lib/components/AppLayout.svelte';
	import MenuItem from '$lib/components/MenuItem.svelte';
</script>

<AppLayout>
	<nav slot="nav" class="nav h-full">
		<div class="pt-4 pb-2 pl-4 text-sm text-gray-200 font-bold">Components</div>

		<MenuItem text="AppBar" path="/docs/components/AppBar" class="pl-6 py-2" />
		<MenuItem text="Breadcrumb" path="/docs/components/Breadcrumb" class="pl-6 py-2" />
		<MenuItem text="Button" path="/docs/components/Button" class="pl-6 py-2" />
		<MenuItem text="Grid" path="/docs/components/Grid" class="pl-6 py-2" />
		<MenuItem text="Icon" path="/docs/components/Icon" class="pl-6 py-2" />
		<MenuItem text="Stack" path="/docs/components/Stack" class="pl-6 py-2" />
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
