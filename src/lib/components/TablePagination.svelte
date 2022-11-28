<script lang="ts">
  import clsx from 'clsx';
  import { mdiChevronLeft, mdiChevronRight, mdiMenuDown } from '@mdi/js';

  import type paginationStore from '../stores/paginationStore';

  import Button from './Button.svelte';
  import Icon from './Icon.svelte';
  import Menu from './Menu.svelte';
  import Toggle from './Toggle.svelte';

  import { formatNumberAsStyle } from '../utils/number';

  export let pagination: ReturnType<typeof paginationStore>;
  export let perPageOptions = [10, 25, 50, 100, 1000];
</script>

<!--
  TODO:
  - [ ] Add docs
    - [ ] Actions including Refresh, Export
  -->

<div
  class={clsx(
    'grid grid-cols-[1fr,auto,auto,auto] items-center gap-8 border-t p-1',
    'z-20', // Match highest z-index of sticky columns
    $$props.class
  )}
>
  <slot name="actions">
    <div />
  </slot>

  <div class="text-sm text-center">
    Rows per page:
    <Toggle let:on={open} let:toggle>
      <span>
        <Button on:click={toggle}>
          {$pagination.perPage}
          <Icon path={mdiMenuDown} />
        </Button>

        <Menu {open} on:close={toggle} placement="top" offset={12}>
          {#each perPageOptions ?? [] as option}
            <div
              class="p-2 hover:bg-black/4 text-right cursor-pointer font-medium"
              on:click={() => pagination.setPerPage(option)}
            >
              {formatNumberAsStyle(option, 'integer')}
            </div>
          {/each}
        </Menu>
      </span>
    </Toggle>
  </div>

  <div class="text-sm text-center">
    {$pagination.from.toLocaleString()}-{$pagination.to.toLocaleString()}
    of
    {$pagination.total.toLocaleString()}
  </div>

  <div class="flex gap-1">
    <Button
      icon={mdiChevronLeft}
      on:click={() => pagination.prevPage()}
      disabled={$pagination.page <= 1}
      aria-label="Previous Page"
      class="w-12 h-12"
    />
    <Button
      icon={mdiChevronRight}
      on:click={() => pagination.nextPage()}
      disabled={$pagination.to >= $pagination.total}
      aria-label="Next Page"
      class="w-12 h-12"
    />
  </div>
</div>
