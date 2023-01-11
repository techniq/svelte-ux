<script lang="ts">
  import CircularProgress from './CircularProgress.svelte';
  import Header from './Header.svelte';
  import Overlay from './Overlay.svelte';
  import { cls } from '../utils/styles';

  export let title: string | string[] | null = null;
  export let subheading: string | string[] | null = null;
  export let loading: boolean | null = null;
</script>

<!-- 
  `position:relative` sets a container for `position:absolute` children (ex. Overlay)

  `position: relative` with `z-index` sets new stacking context to keep
  z-index of children (ex. Overlay, sticky columns, etc) from overlapping other components
-->

<div
  {...$$restProps}
  class={cls(
    'card relative z-0 bg-white border rounded elevation-1 flex flex-col justify-between',
    $$props.class
  )}
>
  {#if loading}
    <Overlay center class="rounded">
      <CircularProgress />
    </Overlay>
  {/if}

  {#if title || subheading || $$slots.header}
    <div class="p-4">
      <slot name="header">
        <Header {title} {subheading} />
      </slot>
    </div>
  {/if}

  <slot />

  {#if $$slots.contents}
    <div class="px-4 flex-1">
      <slot name="contents" />
    </div>
  {/if}

  {#if $$slots.actions}
    <div class="py-2 px-1">
      <slot name="actions" />
    </div>
  {/if}
</div>
