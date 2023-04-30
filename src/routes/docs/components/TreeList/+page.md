---
description: 'Recursively render <ul> and <li> children at each level'
---

<script lang="ts">
	import api from '$lib/components/TreeList.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';

	import TreeList from '$lib/components/TreeList.svelte';
	import Preview from '$lib/components/Preview.svelte';
</script>

# Examples

See TableOfContents

# API

<ApiDocs {api} />
