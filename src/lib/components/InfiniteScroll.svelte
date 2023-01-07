<script lang="ts">
  import { intersection } from '../actions/observer';

  export let items: any[];
  export let perPage = 10;

  let page = 1;
  $: visibleItems = items.slice(0, page * perPage);
</script>

{#each visibleItems as item}
  <slot {item} />
{/each}
<div
  use:intersection={{}}
  on:intersecting={(e) => {
    if (e.detail.isIntersecting) {
      page += 1;
    }
  }}
/>
