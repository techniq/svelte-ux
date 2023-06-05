<script lang="ts">
  import { cssVars } from '../actions/cssVars';

  export let columns = 0;
  export let gap = 0;
  export let columnGap = gap;
  export let rowGap = gap;
  export let autoFlow: 'row' | 'column' = 'row';
  export let autoColumns: string | null = null;
  export let template: string | null = null;
  export let templateColumns: string | null = null;
  export let templateRows: string | null = null;
  export let stack: boolean = false;
  export let inline: boolean = false;

  export let items: 'start' | 'end' | 'center' | 'baseline' | 'stretch' | 'initial' = 'initial';

  export let justify: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly' | 'initial' =
    'initial';

  export let justifyItems: 'start' | 'end' | 'center' | 'baseline' | 'stretch' | 'initial' =
    'initial';

  export let content: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly' | 'initial' =
    'initial';

  // TODO: place-items overrides/conflicts with align-items
  // export let place:
  //   | 'start'
  //   | 'end'
  //   | 'center'
  //   | 'between'
  //   | 'around'
  //   | 'evenly'
  //   | 'initial' = 'initial';

  $: templateColumnsResolved =
    templateColumns ??
    template ??
    (autoColumns ? `repeat(auto-fill, minmax(${autoColumns}, 1fr))` : `repeat(${columns}, 1fr)`);

  $: styleVars = {
    templateColumns: templateColumnsResolved,
    templateRows,
    gap,
    columnGap,
    rowGap,
    autoFlow,
    items, // TODO: Map start: flex-start?, end: flex-end?
    justify, // TODO: Map start: flex-start?, end: flex-end?, between: space-between, around: space-around, evenly: space-evenly
    justifyItems, // TODO: Map start: flex-start?, end: flex-end?, between: space-between, around: space-around, evenly: space-evenly
    content, // TODO: Map start: flex-start?, end: flex-end?, between: space-between, around: space-around, evenly: space-evenly
    // place, // TODO: Map start: flex-start?, end: flex-end?, between: space-between, around: space-around, evenly: space-evenly
  };
</script>

<div
  use:cssVars={styleVars}
  class:grid={!inline}
  class:inline-grid={inline}
  class:stack
  on:click
  {...$$restProps}
>
  <slot />
</div>

<style lang="postcss">
  div {
    grid-template-columns: var(--templateColumns);
    grid-template-rows: var(--templateRows);
    grid-gap: calc(1px * var(--gap));
    grid-column-gap: calc(1px * var(--columnGap));
    grid-row-gap: calc(1px * var(--rowGap));
    grid-auto-flow: var(--autoFlow);
    align-items: var(--items);
    justify-content: var(--justify);
    justify-items: var(--justifyItems);
    align-content: var(--content);
    /* place-items: var(--place); */
  }

  .stack > :global(*) {
    grid-area: 1 / 1;
  }
</style>
