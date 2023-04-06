<script lang="ts">
  import { intersection } from '../actions/observer';

  export let items: any[];
  export let perPage = 10;
  export let disabled = false;

  let page = 1;
  $: visibleItems = disabled ? items : items.slice(0, page * perPage);
</script>

<slot {visibleItems} />

{#if !disabled}
  <div
    use:intersection
    on:intersecting={(e) => {
      if (e.detail.isIntersecting) {
        page += 1;
      }
    }}
  />
{/if}
