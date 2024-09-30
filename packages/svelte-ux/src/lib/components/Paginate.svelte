<script lang="ts">
  import { paginationStore } from '@layerstack/svelte-stores';

  type T = $$Generic;

  export let data: T[];
  export let perPage = 10;

  const pagination = paginationStore({ perPage });
  $: pagination.setPerPage(perPage);
  $: pagination.setTotal(data.length);
  $: pageData = $pagination.slice(data);
</script>

<slot {pagination} {pageData} current={$pagination} />
