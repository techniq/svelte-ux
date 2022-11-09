<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import formStore from '../stores/formStore';

  const dispatch = createEventDispatcher();

  export let initial: any = null;

  const [state, draft, error] = formStore(initial);
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
>
  <slot
    state={$state}
    draft={$draft}
    commit={draft.commit}
    revert={draft.revert}
    refresh={draft.refresh}
    current={$current}
  />
</form>
