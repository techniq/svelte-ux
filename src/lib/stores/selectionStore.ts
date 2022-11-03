import { derived, writable } from 'svelte/store';

export type SelectionProps<T> = {
  initial?: T[];
  all?: T[];
  single?: boolean;
};

export default function selectionStore<T>(props: SelectionProps<T> = {}) {
  const { initial = [], all = [], single = false } = props;
  const selected = writable(initial);

  return derived(selected, ($selected) => {
    function isSelected(value: T) {
      return $selected.includes(value);
    }

    function toggleSelected(value: T) {
      selected.update(($selected) => {
        if ($selected.includes(value)) {
          // Remove
          return $selected.filter((v) => v != value);
        } else if (single) {
          // Replace
          return [value];
        } else {
          // Add
          return [...$selected, value];
        }
      });
    }

    function isAllSelected() {
      return all.length && all.every((v) => $selected.includes(v));
    }

    function isAnySelected() {
      return all.length && all.some((v) => $selected.includes(v));
    }

    function isPartialSelected() {
      return $selected.length && !isAllSelected();
    }

    function toggleAll() {
      if (isAllSelected()) {
        // Deselect all
        selected.set([]);
      } else {
        // Select all
        selected.set(all);
      }
    }

    return {
      selected: $selected,
      toggleSelected,
      isSelected,
      toggleAll,
      isAllSelected,
      isAnySelected,
      isPartialSelected,
    };
  });
}
