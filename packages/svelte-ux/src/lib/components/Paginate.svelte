<script lang="ts" generics="T">
  import type { Snippet } from 'svelte';
  import paginationStore from '../stores/paginationStore.js';

  interface Props {
    data: T[];
    perPage?: number;
    children?: Snippet<
      [
        {
          pagination: ReturnType<typeof paginationStore>;
          pageData: T[];
          current: typeof $pagination;
        },
      ]
    >;
  }

  let { data, perPage = 10, children }: Props = $props();

  const pagination = paginationStore({ perPage });

  $effect(() => {
    pagination.setPerPage(perPage);
  });

  $effect(() => {
    pagination.setTotal(data.length);
  });

  let pageData = $derived($pagination.slice(data));
</script>

{@render children?.({ pagination, pageData, current: $pagination })}
