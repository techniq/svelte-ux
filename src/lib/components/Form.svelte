<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import formStore from '../stores/formStore';
  import type { Schema } from 'zod';
  import { getComponentTheme } from './theme';
  import { cls } from '$lib/utils/styles';

  const dispatch = createEventDispatcher();

  export let initial: any = {};
  export let schema: Schema | undefined = undefined;

  const theme = getComponentTheme('Form');

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
  class={cls(theme.root, $$props.class)}
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
