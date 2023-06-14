<script lang="ts">
  import { mdiCheck, mdiClose } from '@mdi/js';

  import api from '$lib/components/StoreSubscribe.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';

  import Preview from '$lib/components/Preview.svelte';
  import StoreSubscribe from '$lib/components/StoreSubscribe.svelte';
</script>

<h1>Examples</h1>

<h1>API</h1>

<ApiDocs {api} />
