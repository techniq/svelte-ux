<script lang="ts">
  import api from '$lib/components/AppLayout.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';
  import Blockquote from '$docs/Blockquote.svelte';
</script>

<h1>Examples</h1>

<Blockquote>TODO</Blockquote>

<h1>API</h1>

<ApiDocs {api} />
