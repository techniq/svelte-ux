import { writable, get } from 'svelte/store';
import { applyPatches, createDraft, finishDraft, enablePatches, setAutoFreeze } from 'immer';
import type { Schema } from 'zod';
import { set } from 'lodash-es';

// Needed for finishDraft() patches/inverseChanges - https://immerjs.github.io/immer/patches
enablePatches();

// Disable autofreezing for now (needed for Period layer after saving new hierarchy) - https://immerjs.github.io/immer/freezing/
setAutoFreeze(false);

type FormStoreOptions<T> = {
  schema?: Schema<T>;
};

export default function formStore<T = any>(initialState: T, options?: FormStoreOptions<T>) {
  const stateStore = writable(initialState);
  const draftStore = writable(createDraft(initialState));
  const errorsStore = writable({});

  const undoList = [];

  const storeApi = { subscribe: stateStore.subscribe };

  const draftApi = {
    ...draftStore,
    set(newState) {
      draftStore.set(createDraft(newState));
    },
    commit() {
      const draft = get(draftStore);

      if (options?.schema) {
        const result = options.schema.safeParse(draft);
        if (result.success === true) {
          // Clear errors
          errorsStore.set({});
          // TODO: Consider using `result.data` in case there are defaults, etc?
        } else {
          const errors = {};
          for (const issue of result.error.issues) {
            set(errors, issue.path, issue.message);
          }
          errorsStore.set(errors);
          return false;
        }
      }

      const newState = finishDraft(draft, (patches, inverseChanges) => {
        undoList.push(inverseChanges);
      }) as T;

      stateStore.set(newState);
      draftStore.set(createDraft(newState));

      return true;
    },
    revert() {
      const currentState = get(stateStore);
      draftStore.set(createDraft(currentState));
    },
    undo() {
      if (undoList.length) {
        const undo = undoList.pop();

        const currentState = get(stateStore);
        const newState = applyPatches(currentState, undo);

        stateStore.set(newState);
        draftStore.set(createDraft(newState));
      }
    },
  };

  const errorsApi = { subscribe: errorsStore.subscribe };

  return [storeApi, draftApi, errorsApi] as [typeof storeApi, typeof draftApi, typeof errorsApi];
}
