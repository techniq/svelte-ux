<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { Schema } from 'zod';

  import formStore from '../stores/formStore.js';
  import { getComponentClasses } from './theme.js';
  import { cls } from '@layerstack/tailwind';
  import changeStore from '../stores/changeStore.js';

  const dispatch = createEventDispatcher();

  export let initial: any = {};
  export let schema: Schema | undefined = undefined;
  let className: string | undefined = undefined;
  export { className as class };

  /** Endpoint to submit form data */
  export let action: string | undefined = undefined;

  /** HTTP method to submit form.  If action defined, defaults to `post`, else is undefined and will prevent submitted (client-side only)*/
  export let method: 'post' | 'get' | 'dialog' | undefined = action != null ? 'post' : undefined;

  const settingsClasses = getComponentClasses('Form');

  const [_state, draft, errors] = formStore(initial, { schema });
  $: current = draft.current;

  const changed = changeStore(_state, (value) => dispatch('change', value.current));
  $changed; // must subscribe to store to get onChange callbacks
</script>

<form
  {action}
  {method}
  on:submit={(e) => {
    const result = draft.commit();
    if (!result || method === undefined) {
      // Prevent submitted to server if validation failed, or no server side action/method set
      e.preventDefault();
    }
  }}
  on:reset={(e) => {
    e.preventDefault();
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
