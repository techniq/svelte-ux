<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import Preview from '$lib/components/Preview.svelte';

	// see: https://materialdesignicons.com/
	const mdiAccountPath =
		'M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z';

	// https://heroicons.com/
	const adjustmentsOutline =
		'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4';
</script>

## Material design icons

<Icon path={mdiAccountPath} />
