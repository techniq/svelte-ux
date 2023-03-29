<script lang="ts">
  import { mdiChevronLeft, mdiChevronRight, mdiMenuDown, mdiPageFirst, mdiPageLast } from '@mdi/js';

  import type paginationStore from '../stores/paginationStore';
  import { cls } from '../utils/styles';
  import { format } from '../utils/format';

  import Button from './Button.svelte';
  import Icon from './Icon.svelte';
  import Menu from './Menu.svelte';
  import MenuItem from './MenuItem.svelte';
  import Toggle from './Toggle.svelte';

  export let pagination: ReturnType<typeof paginationStore>;
  export let perPageOptions = [10, 25, 50, 100, 1000];
  export let hideSinglePage = false;

  type ShowComponent =
    | 'prevPage'
    | 'nextPage'
    | 'firstPage'
    | 'lastPage'
    | 'pagination'
    | 'perPage'
    | 'actions';
  export let show: ShowComponent[] = ['prevPage', 'pagination', 'nextPage'];

  export let classes: {
    root?: string;
    buttons?: string;
    pagination?: string;
    perPage?: string;
  } = {};
</script>

{#if $pagination.totalPages > 1 || !hideSinglePage}
  <div class={cls('flex items-center', classes.root, $$props.class)}>
    {#each show as component}
      {#if component === 'actions'}
        <slot name="actions" />
      {/if}

      {#if component === 'firstPage'}
        <Button
          icon={mdiPageFirst}
          on:click={pagination.firstPage}
          disabled={$pagination.isFirst}
          aria-label="First Page"
          class={cls('p-2', classes.buttons)}
        />
      {/if}

      {#if component === 'prevPage'}
        <Button
          icon={mdiChevronLeft}
          on:click={pagination.prevPage}
          disabled={$pagination.isFirst}
          aria-label="Previous Page"
          class={cls('p-2', classes.buttons)}
        />
      {/if}

      {#if component === 'nextPage'}
        <Button
          icon={mdiChevronRight}
          on:click={pagination.nextPage}
          disabled={$pagination.isLast}
          aria-label="Next Page"
          class={cls('p-2', classes.buttons)}
        />
      {/if}

      {#if component === 'lastPage'}
        <Button
          icon={mdiPageLast}
          on:click={pagination.lastPage}
          disabled={$pagination.isLast}
          aria-label="Last Page"
          class={cls('p-2', classes.buttons)}
        />
      {/if}

      {#if component === 'perPage'}
        <div class={cls('text-sm text-center', classes.perPage)}>
          Per page:
          <Toggle let:on={open} let:toggle>
            <span>
              <Button on:click={toggle}>
                {$pagination.perPage}
                <Icon path={mdiMenuDown} />
              </Button>

              <Menu {open} on:close={toggle} placement="top" offset={12}>
                {#each perPageOptions ?? [] as option}
                  <MenuItem class="justify-end" on:click={() => pagination.setPerPage(option)}>
                    {format(option, 'integer')}
                  </MenuItem>
                {/each}
              </Menu>
            </span>
          </Toggle>
        </div>
      {/if}

      {#if component === 'pagination'}
        <slot name="pagination" pagination={$pagination}>
          <div class={cls('text-sm tabular-nums', classes.pagination)}>
            {$pagination.from.toLocaleString()}-{$pagination.to.toLocaleString()}
            of
            {$pagination.total.toLocaleString()}
          </div>
        </slot>
      {/if}
    {/each}
  </div>
{/if}
