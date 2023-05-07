<script lang="ts">
  import api from '$lib/components/AppLayout.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';

	import AppLayout from '$lib/components/AppLayout.svelte';
	import Preview from '$lib/components/Preview.svelte';
</script>

<h1>Examples</h1>

> TODO

<h1>API</h1>

<ApiDocs {api} />
