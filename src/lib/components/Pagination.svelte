<script lang="ts">
  import { mdiChevronLeft, mdiChevronRight, mdiPageFirst, mdiPageLast } from '@mdi/js';

  import type paginationStore from '../stores/paginationStore';

  import Button from './Button.svelte';
  import Grid from './Grid.svelte';

  export let pagination: ReturnType<typeof paginationStore>;
  export let hideSinglePage = false;
</script>

{#if $pagination.totalPages > 1 || !hideSinglePage}
  <Grid template="1fr auto auto auto" gap={32} items="center" class="p-1 {$$props.class}">
    <slot name="actions">
      <div />
    </slot>

    <div>
      <Button
        icon={mdiPageFirst}
        on:click={pagination.firstPage}
        disabled={$pagination.isFirst}
        aria-label="First Page"
        class="p-2"
      />

      <Button
        icon={mdiChevronLeft}
        on:click={pagination.prevPage}
        disabled={$pagination.isFirst}
        aria-label="Previous Page"
        class="p-2"
      />
    </div>

    <div class="text-xs text-black/50">
      {$pagination.from.toLocaleString()}-{$pagination.to.toLocaleString()}
      of
      {$pagination.total.toLocaleString()}
    </div>

    <div>
      <Button
        icon={mdiChevronRight}
        on:click={pagination.nextPage}
        disabled={$pagination.isLast}
        aria-label="Next Page"
        class="p-2"
      />

      <Button
        icon={mdiPageLast}
        on:click={pagination.lastPage}
        disabled={$pagination.isLast}
        aria-label="Last Page"
        class="p-2"
      />
    </div>
  </Grid>
{/if}
