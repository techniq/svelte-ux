<script>
	import 'prism-themes/themes/prism-vsc-dark-plus.css';
</script>

<slot />

<style lang="postcss">
	@tailwind base;
	@tailwind components;
	@tailwind utilities;

	:global(h2) {
		@apply text-lg font-semibold mt-8 mb-1 ml-2;
	}
	:global(h2:first-of-type) {
		@apply mt-0;
	}
</style>
