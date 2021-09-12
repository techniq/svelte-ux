<script lang="ts">
  import paginationStore from '$lib/stores/paginationStore';

  export let items: any[];
  export let perPage = 10;

  const pagination = paginationStore({ perPage });
  $: pagination.setPerPage(perPage);
  $: pagination.setTotal(items.length);
  $: pageItems = $pagination.slice(items);
</script>

<slot {pagination} {pageItems} />
