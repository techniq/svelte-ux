<script lang="ts">
	import api from '$lib/components/TableOfContents.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';

	import TableOfContents from '$lib/components/TableOfContents.svelte';
	import Preview from '$lib/components/Preview.svelte';
</script>

<h1>Examples</h1>

> TODO

<h1>API</h1>

<ApiDocs {api} />
