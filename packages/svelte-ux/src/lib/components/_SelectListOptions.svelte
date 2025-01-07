<script lang="ts">
  import { Logger } from '../utils/logger.js';
  import { getComponentClasses } from './theme.js';
  import { cls } from '../utils/styles.js';
  import type { Snippet } from 'svelte';

  const logger = new Logger('SelectListOptions');

  const settingsClasses = getComponentClasses('SelectField');

  interface Props {
    selectIndex: (index: number) => any;
    onKeyDown: (x: KeyboardEvent) => void;
    onKeyPress: (x: KeyboardEvent) => void;
    open: boolean;
    loading: boolean;
    filteredOptions: any[];
    searchText: string;
    classes?: {
      root?: string;
      option?: string;
      selected?: string;
      group?: string;
      empty?: string;
    };
    menuOptionsEl: HTMLDivElement;
    option?: Snippet<[{ option: any; index: number }]>;
    empty?: Snippet<[{ loading: boolean; searchText: string }]>;
  }

  let {
    selectIndex,
    onKeyDown,
    onKeyPress,
    open,
    loading,
    filteredOptions,
    searchText,
    classes = {},
    menuOptionsEl = $bindable(),
    option,
    empty,
  }: Props = $props();
</script>

<div
  role="listbox"
  tabindex="-1"
  aria-expanded={open ? 'true' : 'false'}
  class={cls(
    '_SelectListOptions options group p-1 focus:outline-none',
    settingsClasses.options,
    classes.root
  )}
  class:opacity-50={loading}
  bind:this={menuOptionsEl}
  onclick={(e) => {
    e.stopPropagation();
    logger.debug('options container clicked');

    if (e.target instanceof HTMLElement) {
      // Find slot parent of click target option, fallback to `e.target` if slot is not overridden
      // Use `.options > *` in case slot is nested (ex. `<svelte:fragment slot="option">` vs `<div slot="option">`)
      const slotEl = e.target.closest('.options > *') ?? e.target;
      // Find the index of the clicked on element (ignoring group headers)
      const optionIndex = slotEl
        ? [...menuOptionsEl.children]
            .filter((el) => {
              if (el.classList.contains('group-header')) {
                // ignore clicks on group options
                return false;
              } else {
                return true;
              }
            })
            .indexOf(slotEl)
        : -1;
      logger.debug({ slotEl, optionIndex });

      if (optionIndex !== -1) {
        selectIndex(optionIndex);
      }
    }
  }}
  onkeydown={(e) => {
    logger.debug('keydown: calling given onKeyDown...');
    onKeyDown(e);
  }}
  onkeypress={(e) => {
    logger.debug('keypress: calling given onKeyPress...');
    onKeyPress(e);
  }}
>
  {#each filteredOptions ?? [] as filteredOption, index (JSON.stringify(filteredOption))}
    {@const previousOption = filteredOptions[index - 1]}
    {#if filteredOption.group && filteredOption.group !== previousOption?.group}
      <div
        class={cls(
          'group-header text-xs leading-8 tracking-widest text-surface-content/50 px-2',
          settingsClasses.group,
          classes.group
        )}
      >
        {filteredOption.group}
      </div>
    {/if}

    {@render option?.({ option: filteredOption, index })}
  {:else}
    {@render empty?.({ loading, searchText })}
  {/each}
</div>
