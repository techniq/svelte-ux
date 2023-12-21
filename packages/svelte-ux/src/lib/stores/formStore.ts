import { writable, get } from 'svelte/store';
import {
  applyPatches,
  createDraft,
  finishDraft,
  enablePatches,
  setAutoFreeze,
  current,
  type Objectish,
  type Patch,
} from 'immer';
import type { Schema } from 'zod';
import { set } from 'lodash-es';

// Needed for finishDraft() patches/inverseChanges - https://immerjs.github.io/immer/patches
enablePatches();

// Disable autofreezing for now (needed for Period layer after saving new hierarchy) - https://immerjs.github.io/immer/freezing/
setAutoFreeze(false);

type FormStoreOptions<T> = {
  schema?: Schema<T>;
};

export default function formStore<T extends Objectish = any>(
  initialState: T,
  options?: FormStoreOptions<T>
) {
  const stateStore = writable(initialState);
  const draftStore = writable(createDraft(initialState));
  const errorsStore = writable({} as { [key: string]: string }); // TODO: Improve type (`{ [key in keyof T]: string }`?)

  const undoList: Patch[][] = [];

  const storeApi = { subscribe: stateStore.subscribe };

  let currentDraftValue = writable<T>(current(get(draftStore)) as T);

  const draftApi = {
    ...draftStore,
    set(newState: T) {
      draftStore.set(createDraft(newState));
    },
    /** Apply draft to state after verifying with schema (if available).  Append change to undo stack */
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
    /** Revert draft to last committed state */
    revert() {
      const currentState = get(stateStore);
      draftStore.set(createDraft(currentState));
      currentDraftValue.set(currentState);
    },
    /** Revert draft and state to initial state */
    revertAll() {
      stateStore.set(initialState);
      draftStore.set(createDraft(initialState));
      currentDraftValue.set(initialState);
    },
    /** Undo last committed change */
    undo() {
      const undo = undoList.pop();
      if (undo == null) return;

      const currentState = get(stateStore);
      const newState = applyPatches(currentState, undo);

      stateStore.set(newState);
      draftStore.set(createDraft(newState));
      currentDraftValue.set(newState);
    },
    /** Refresh `current` draft value (un-proxied) */
    refresh() {
      currentDraftValue.set(current(get(draftStore)) as T);
    },
    current: currentDraftValue,
  };

  const errorsApi = { subscribe: errorsStore.subscribe };

  return [storeApi, draftApi, errorsApi] as [typeof storeApi, typeof draftApi, typeof errorsApi];
}
