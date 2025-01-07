<script lang="ts">
  import type { ComponentProps, Snippet } from 'svelte';
  import Grid from './Grid.svelte';

  interface Props {
    vertical?: boolean;
    horizontal?: boolean;
    stack?: boolean;
    template?: string;
    children?: Snippet;
  }

  let {
    vertical,
    horizontal,
    stack,
    template,
    children,
    ...restProps
  }: Props & Omit<ComponentProps<typeof Grid>, keyof Props> = $props();
</script>

{#if vertical}
  <Grid autoFlow="row" templateColumns="initial" templateRows={template} {...restProps}>
    {@render children?.()}
  </Grid>
{:else if horizontal}
  <Grid autoFlow="column" templateColumns={template} templateRows="initial" {...restProps}>
    {@render children?.()}
  </Grid>
{:else if stack}
  <Grid
    stack
    items="center"
    justifyItems="center"
    templateColumns="initial"
    templateRows="initial"
    {...restProps}
  >
    {@render children?.()}
  </Grid>
{/if}
