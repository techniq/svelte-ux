import { derived, writable } from 'svelte/store';
import uniqueStore from './uniqueStore.js';

export type SelectionProps<T> = {
  /** Initial values */
  initial?: T[];

  /** All values to select when `toggleAll()` is called */
  all?: T[];

  /** Only allow 1 selected value */
  single?: boolean;

  /** Maximum number of values that can be selected  */
  max?: number;
};

export default function selectionStore<T>(props: SelectionProps<T> = {}) {
  const selected = uniqueStore(props.initial ?? []);
  const all = writable(props.all ?? []);
  const single = props.single ?? false;
  const max = props.max;

  return derived([selected, all], ([$selected, $all]) => {
    function isSelected(value: T) {
      return $selected.has(value);
    }

    function isDisabled(value: T) {
      return !isSelected(value) && isMaxSelected();
    }

    function toggleSelected(value: T) {
      selected.update(($selected) => {
        if ($selected.has(value)) {
          // Remove
          return new Set([...$selected].filter((v) => v != value));
        } else if (single) {
          // Replace
          return new Set([value]);
        } else {
          // Add
          if (max == null || $selected.size < max) {
            return $selected.add(value);
          } else {
            return $selected;
          }
        }
      });
    }

    function isAllSelected() {
      return $all.every((v) => $selected.has(v));
    }

    function isAnySelected() {
      return $all.some((v) => $selected.has(v));
    }

    function isMaxSelected() {
      return max != null ? $selected.size >= max : false;
    }

    function toggleAll() {
      let values: T[];
      if (isAllSelected()) {
        // Deselect all (within current `all`, for example page/filtered result)
        values = [...$selected].filter((v) => !$all.includes(v));
      } else {
        // Select all (`new Set()` will dedupe)
        values = [...$selected, ...$all];
      }
      selected.set(new Set(values));
    }

    function clear() {
      selected.set(new Set());
    }

    function reset() {
      selected.set(new Set(props.initial ?? []));
    }

    const selectedArr = [...$selected.values()];

    return {
      selected: single ? selectedArr[0] ?? null : selectedArr,
      toggleSelected,
      isSelected,
      isDisabled,
      toggleAll,
      isAllSelected,
      isAnySelected,
      isMaxSelected,
      clear,
      reset,
      all,
    };
  });
}
