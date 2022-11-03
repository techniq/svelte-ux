<script lang="ts">
  import selectionStore from '../stores/selectionStore';

  type T = $$Generic;

  export let initial: any[] = [];
  export let all: any[] = [];
  export let single = false;

  const selection = selectionStore({ initial, all, single });
  $: $selection.all.set(all);
</script>

<!-- TOOD: `<slot {...$selection} />` does not play well with sveld -->
<slot
  selected={$selection.selected}
  isSelected={$selection.isSelected}
  toggleAll={$selection.toggleAll}
  toggleSelected={$selection.toggleSelected}
  isAllSelected={$selection.isAllSelected}
  isAnySelected={$selection.isAnySelected}
  clear={$selection.clear}
/>
