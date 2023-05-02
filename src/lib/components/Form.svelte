<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import formStore from '../stores/formStore';
  import type { Schema } from 'zod';

  const dispatch = createEventDispatcher();

  export let initial: any = {};
  export let schema: Schema | undefined = undefined;

  const [state, draft, errors] = formStore(initial, { schema });
  $: current = draft.current;

  $: dispatch('change', $state);
</script>

<form
  on:submit={(e) => {
    e.preventDefault();
    draft.commit();
  }}
  on:reset={(e) => {
    e.preventDefault();
    draft.revert();
  }}
  {...$$restProps}
>
  <slot
    state={$state}
    draft={$draft}
    errors={$errors}
    commit={draft.commit}
    revert={draft.revert}
    revertAll={draft.revertAll}
    undo={draft.undo}
    refresh={draft.refresh}
    current={$current}
  />
</form>
