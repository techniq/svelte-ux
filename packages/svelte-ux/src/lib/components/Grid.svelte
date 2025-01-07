<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { SvelteHTMLElements } from 'svelte/elements';

  interface Props {
    columns?: number;
    gap?: number;
    columnGap?: number;
    rowGap?: number;
    autoFlow?: 'row' | 'column';
    autoColumns?: string | null;
    template?: string | null;
    templateColumns?: string | null;
    templateRows?: string | null;
    stack?: boolean;
    inline?: boolean;
    items?: 'start' | 'end' | 'center' | 'baseline' | 'stretch' | 'initial';
    justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly' | 'initial';
    justifyItems?: 'start' | 'end' | 'center' | 'baseline' | 'stretch' | 'initial';
    content?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly' | 'initial';
    children?: Snippet;
  }

  let {
    columns = 0,
    gap = 0,
    columnGap = gap,
    rowGap = gap,
    autoFlow = 'row',
    autoColumns,
    template,
    templateColumns,
    templateRows,
    stack = false,
    inline = false,
    items = 'initial',
    justify = 'initial',
    justifyItems = 'initial',
    content = 'initial',
    children,
    ...restProps
  }: Props & Omit<SvelteHTMLElements['div'], keyof Props> = $props();

  // TODO: place-items overrides/conflicts with align-items
  // export let place:
  //   | 'start'
  //   | 'end'
  //   | 'center'
  //   | 'between'
  //   | 'around'
  //   | 'evenly'
  //   | 'initial' = 'initial';

  let templateColumnsResolved = $derived(
    templateColumns ??
      template ??
      (autoColumns ? `repeat(auto-fill, minmax(${autoColumns}, 1fr))` : `repeat(${columns}, 1fr)`)
  );
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class="Grid"
  class:grid={!inline}
  class:inline-grid={inline}
  class:stack
  style:--templateColumns={templateColumnsResolved}
  style:--templateRows={templateRows}
  style:--gap={gap}
  style:--columnGap={columnGap}
  style:--rowGap={rowGap}
  style:--autoFlow={autoFlow}
  style:--items={items}
  style:--justify={justify}
  style:--justifyItems={justifyItems}
  style:--content={content}
  {...restProps}
>
  {@render children?.()}
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
