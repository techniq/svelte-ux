---
name: $name
sourceUrl: $sourceUrl
docUrl: $docUrl
description: 'Recursively render <ul> and <li> children at each level'
---

<script lang="ts">
	import api from '$lib/components/ListTree.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';

	import ListTree from '$lib/components/ListTree.svelte';
	import Preview from '$lib/components/Preview.svelte';
</script>

# Examples

See TableOfContents

# API

<ApiDocs {api} />
