<script lang="ts" generics="T">
  import type { Snippet } from 'svelte';
  import { intersection } from '../actions/observer.js';

  interface Props {
    items: T[];
    perPage?: number;
    disabled?: boolean;
    onintersecting?: svelteHTML.HTMLAttributes['onintersecting'];
    children?: Snippet<[{ visibleItems: T[] }]>;
  }

  let { items, perPage = 10, disabled = false, onintersecting, children }: Props = $props();

  let page = $state(1);
  let visibleItems = $derived(disabled ? items : items.slice(0, page * perPage));
</script>

{@render children?.({ visibleItems })}

{#if !disabled}
  <!-- Make 1px tall as sometimes it is now detected  -->
  <div
    class="sentinel h-px"
    use:intersection
    onintersecting={(e) => {
      if (e.detail.isIntersecting) {
        page += 1;
      }
      onintersecting?.(e);
    }}
  ></div>
{/if}
