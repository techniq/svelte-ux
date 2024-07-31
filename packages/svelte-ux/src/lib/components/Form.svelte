<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { Schema } from 'zod';

  import formStore from '../stores/formStore.js';
  import { getComponentClasses } from './theme.js';
  import { cls } from '../utils/styles.js';
  import changeStore from '../stores/changeStore.js';

  const dispatch = createEventDispatcher();

  export let initial: any = {};
  export let schema: Schema | undefined = undefined;
  let className: string | undefined = undefined;
  export { className as class };

  const settingsClasses = getComponentClasses('Form');

  const [_state, draft, errors] = formStore(initial, { schema });
  $: current = draft.current;

  const changed = changeStore(_state, (value) => dispatch('change', value.current));
  $changed; // must subscribe to store to get onChange callbacks
</script>

<form
  on:submit|preventDefault={(e) => {
    draft.commit();
  }}
  on:reset|preventDefault={(e) => {
    draft.revert();
  }}
  class={cls(settingsClasses.root, className)}
  {...$$restProps}
>
  <slot
    state={$_state}
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
