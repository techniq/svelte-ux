import { writable, get } from 'svelte/store';
import { applyPatches, createDraft, finishDraft, enablePatches, setAutoFreeze } from 'immer';

// Needed for finishDraft() patches/inverseChanges - https://immerjs.github.io/immer/patches
enablePatches();

// Disable autofreezing for now (needed for Period layer after saving new hierarchy) - https://immerjs.github.io/immer/freezing/
setAutoFreeze(false);

export default function immerStore<T = any>(initialState: T) {
  const stateStore = writable(initialState);
  const draftStore = writable(createDraft(initialState));

  const undoList = [];

  const storeApi = { subscribe: stateStore.subscribe };

  const draftApi = {
    ...draftStore,
    set(newState) {
      draftStore.set(createDraft(newState));
    },
    commit() {
      // TODO: Validate draft
      const draft = get(draftStore);
      const newState = finishDraft(draft, (patches, inverseChanges) => {
        undoList.push(inverseChanges);
      }) as T;

      stateStore.set(newState);
      draftStore.set(createDraft(newState));
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

  return [storeApi, draftApi] as [typeof storeApi, typeof draftApi];
}
