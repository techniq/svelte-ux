---
name: $name
sourceUrl: $sourceUrl
docUrl: $docUrl
---

<script lang="ts">
  import api from '$lib/components/AppLayout.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';

	import AppLayout from '$lib/components/AppLayout.svelte';
	import Preview from '$lib/components/Preview.svelte';
</script>

# Examples

> TODO

# API

<ApiDocs {api} />
