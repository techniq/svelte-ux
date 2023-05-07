<script lang="ts">
	import api from '$lib/components/TreeList.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';

	import TreeList from '$lib/components/TreeList.svelte';
	import Preview from '$lib/components/Preview.svelte';
</script>

<h1>Examples</h1>

See TableOfContents

<h1>API</h1>

<ApiDocs {api} />
