<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { Schema } from 'zod';

  import formStore from '../stores/formStore.js';
  import { getComponentClasses } from './theme.js';
  import { cls } from '../utils/styles.js';
  import changeStore from '../stores/changeStore.js';
  import type { HTMLFormAttributes } from 'svelte/elements';

  interface Props {
    initial?: any;
    schema?: Schema;
    /** Endpoint to submit form data */
    action?: string;
    /** HTTP method to submit form.  If action defined, defaults to `post`, else is undefined and will prevent submitted (client-side only)*/
    method?: 'post' | 'get' | 'dialog';
    onChange?: (value: any) => void;
    children?: Snippet<
      [
        {
          state: typeof $_state;
          draft: typeof $draft;
          errors: typeof $errors;
          commit: () => boolean;
          revert: () => void;
          revertAll: () => void;
          undo: () => void;
          refresh: () => void;
          current: typeof $current;
        },
      ]
    >;
  }

  let {
    initial = {},
    schema,
    class: className,
    action,
    method = action != null ? 'post' : undefined,
    onChange,
    children,
    ...restProps
  }: Props & Omit<HTMLFormAttributes, keyof Props> = $props();

  const settingsClasses = getComponentClasses('Form');

  const [_state, draft, errors] = formStore(initial, { schema });
  let current = $derived(draft.current);

  const changed = changeStore(_state, (value) => onChange?.(value.current));
  $changed; // must subscribe to store to get onChange callbacks
</script>

<form
  {action}
  {method}
  onsubmit={(e) => {
    const result = draft.commit();
    if (!result || method === undefined) {
      // Prevent submitted to server if validation failed, or no server side action/method set
      e.preventDefault();
    }
  }}
  onreset={(e) => {
    e.preventDefault();
    draft.revert();
  }}
  class={cls(settingsClasses.root, className)}
  {...restProps}
>
  {@render children?.({
    state: $_state,
    draft: $draft,
    errors: $errors,
    commit: draft.commit,
    revert: draft.revert,
    revertAll: draft.revertAll,
    undo: draft.undo,
    refresh: draft.refresh,
    current: $current,
  })}
</form>
