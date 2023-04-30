<script>
  import { mdiMagnify } from '@mdi/js';

  import api from '$lib/components/MenuItem.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';

  import Menu from '$lib/components/Menu.svelte';
  import MenuItem from '$lib/components/MenuItem.svelte';
</script>

# API

<ApiDocs {api} />
