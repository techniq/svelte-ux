<script>
  import TablePagination from '$lib/components/TablePagination.svelte';
  import Preview from '$lib/components/Preview.svelte';

  import paginationStore from '$lib/stores/paginationStore';

  const pagination = paginationStore();
</script>

## Default

<Preview>
  <TablePagination {pagination} />
</Preview>
