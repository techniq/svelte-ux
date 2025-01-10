<script lang="ts">
  import { mdiChevronLeft, mdiChevronRight, mdiMenuDown, mdiPageFirst, mdiPageLast } from '@mdi/js';

  import type { default as paginationStoreType } from '../stores/paginationStore.js';
  import { cls } from '../utils/styles.js';
  import type { StoresValues } from '../types/typeHelpers.js';

  import Button from './Button.svelte';
  import Icon from './Icon.svelte';
  import Menu from './Menu.svelte';
  import MenuItem from './MenuItem.svelte';
  import Toggle from './Toggle.svelte';
  import Tooltip from './Tooltip.svelte';
  import { getComponentClasses } from './theme.js';
  import { getSettings } from './settings.js';
  import type { Snippet } from 'svelte';

  type Pagination = ReturnType<typeof paginationStoreType>;

  type ShowComponent =
    | 'prevPage'
    | 'nextPage'
    | 'firstPage'
    | 'lastPage'
    | 'pagination'
    | 'perPage'
    | 'actions';

  interface Props {
    paginationStore: Pagination;
    perPageOptions?: any;
    hideSinglePage?: boolean;
    format?: (pagination: StoresValues<Pagination>) => string;
    /** Determine which actions to show and order */
    show?: ShowComponent[];
    classes?: {
      root?: string;
      buttons?: string;
      pagination?: string;
      perPage?: string;
    };
    class?: string;
    actions?: Snippet;
    pagination?: Snippet<[{ pagination: typeof $paginationStore }]>;
  }

  let {
    paginationStore,
    perPageOptions = [10, 25, 50, 100, 1000],
    hideSinglePage = false,
    format = (pagination) => {
      return `${pagination.from.toLocaleString()}-${pagination.to.toLocaleString()} of ${pagination.total.toLocaleString()}`;
    },
    show = ['prevPage', 'pagination', 'nextPage'],
    classes = {},
    class: className,
    actions,
    pagination,
  }: Props = $props();
  const { format: formatValue } = getSettings();
  const settingsClasses = getComponentClasses('Pagination');
</script>

{#if $paginationStore.totalPages > 1 || !hideSinglePage}
  <div
    class={cls(
      'Pagination',
      'flex items-center gap-1',
      settingsClasses.root,
      classes.root,
      className
    )}
  >
    {#each show as component}
      {#if component === 'actions'}
        {@render actions?.()}
      {/if}

      {#if component === 'firstPage'}
        <Tooltip title="First page" offset={2}>
          <Button
            icon={mdiPageFirst}
            onclick={paginationStore.firstPage}
            disabled={$paginationStore.isFirst}
            aria-label="First Page"
            class={cls('p-2', settingsClasses.buttons, classes.buttons)}
          />
        </Tooltip>
      {/if}

      {#if component === 'prevPage'}
        <Tooltip title="Previous page" offset={2}>
          <Button
            icon={mdiChevronLeft}
            onclick={paginationStore.prevPage}
            disabled={$paginationStore.isFirst}
            aria-label="Previous Page"
            class={cls('p-2', settingsClasses.buttons, classes.buttons)}
          />
        </Tooltip>
      {/if}

      {#if component === 'nextPage'}
        <Tooltip title="Next page" offset={2}>
          <Button
            icon={mdiChevronRight}
            onclick={paginationStore.nextPage}
            disabled={$paginationStore.isLast}
            aria-label="Next Page"
            class={cls('p-2', settingsClasses.buttons, classes.buttons)}
          />
        </Tooltip>
      {/if}

      {#if component === 'lastPage'}
        <Tooltip title="Last page" offset={2}>
          <Button
            icon={mdiPageLast}
            onclick={paginationStore.lastPage}
            disabled={$paginationStore.isLast}
            aria-label="Last Page"
            class={cls('p-2', settingsClasses.buttons, classes.buttons)}
          />
        </Tooltip>
      {/if}

      {#if component === 'perPage'}
        <div class={cls('text-sm text-center', settingsClasses.perPage, classes.perPage)}>
          Per page:
          <Toggle>
            {#snippet children({ on: open, toggle, toggleOff })}
              <span>
                <Button onclick={toggle}>
                  {$paginationStore.perPage}
                  <Icon data={mdiMenuDown} />
                </Button>

                <Menu
                  {open}
                  onClose={toggleOff}
                  autoPlacement
                  offset={12}
                  classes={{ menu: 'group p-1' }}
                >
                  {#each perPageOptions ?? [] as option}
                    <MenuItem
                      class="justify-end"
                      selected={$paginationStore.perPage === option}
                      onclick={() => paginationStore.setPerPage(option)}
                    >
                      {$formatValue(option, 'integer')}
                    </MenuItem>
                  {/each}
                </Menu>
              </span>
            {/snippet}
          </Toggle>
        </div>
      {/if}

      {#if component === 'pagination'}
        {#if pagination}
          {@render pagination({ pagination: $paginationStore })}
        {:else}
          <div class={cls('text-sm tabular-nums', settingsClasses.pagination, classes.pagination)}>
            {format($paginationStore)}
          </div>
        {/if}
      {/if}
    {/each}
  </div>
{/if}
