<script>
	import 'prism-themes/themes/prism-vsc-dark-plus.css';

	import AppLayout from '$lib/components/AppLayout.svelte';
	import MenuItem from '$lib/components/MenuItem.svelte';
</script>

<AppLayout>
	<nav slot="nav" class="nav h-full">
		<div class="pt-4 pb-2 pl-4 text-sm text-gray-200 font-bold">Components</div>

		<MenuItem text="AppBar" path="/docs/components/AppBar" class="pl-6 py-2" />
		<MenuItem text="Avatar" path="/docs/components/Avatar" class="pl-6 py-2" />
		<MenuItem text="Breadcrumb" path="/docs/components/Breadcrumb" class="pl-6 py-2" />
		<MenuItem text="Button" path="/docs/components/Button" class="pl-6 py-2" />
		<MenuItem text="Card" path="/docs/components/Card" class="pl-6 py-2" />
		<MenuItem text="Checkbox" path="/docs/components/Checkbox" class="pl-6 py-2" />
		<MenuItem text="Dialog" path="/docs/components/Dialog" class="pl-6 py-2" />
		<MenuItem text="Drawer" path="/docs/components/Drawer" class="pl-6 py-2" />
		<MenuItem text="Field" path="/docs/components/Field" class="pl-6 py-2" />
		<MenuItem text="Grid" path="/docs/components/Grid" class="pl-6 py-2" />
		<MenuItem text="Icon" path="/docs/components/Icon" class="pl-6 py-2" />
		<MenuItem text="Notification" path="/docs/components/Notification" class="pl-6 py-2" />
		<MenuItem text="Progress" path="/docs/components/Progress" class="pl-6 py-2" />
		<MenuItem text="Radio" path="/docs/components/Radio" class="pl-6 py-2" />
		<MenuItem text="Stack" path="/docs/components/Stack" class="pl-6 py-2" />
		<MenuItem text="Switch" path="/docs/components/Switch" class="pl-6 py-2" />
		<MenuItem text="Tabs" path="/docs/components/Tabs" class="pl-6 py-2" />
		<MenuItem text="TextField" path="/docs/components/TextField" class="pl-6 py-2" />
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
