---
component: $component
filename: $filename
---

<script>
  import api from '$lib/components/TablePagination.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';

  import TablePagination from '$lib/components/TablePagination.svelte';
  import Preview from '$lib/components/Preview.svelte';

  import paginationStore from '$lib/stores/paginationStore';

  const pagination = paginationStore();
</script>

# Examples

## Default

<Preview>
  <TablePagination {pagination} />
</Preview>

# API

<ApiDocs {api} />
