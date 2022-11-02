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
    return {
      selected: $selected,

      isSelected(value: T) {
        return $selected.includes(value);
      },

      toggleSelected(value: T) {
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
      },

      isAllSelected() {
        return all.length && all.every((v) => $selected.includes(v));
      },

      isAnySelected() {
        return all.length && all.some((v) => $selected.includes(v));
      },

      isPartialSelected() {
        return $selected.length && !this.isAllSelected();
      },

      toggleAll() {
        if (this.isAllSelected()) {
          // Deselect all
          selected.set([]);
        } else {
          // Select all
          selected.set(all);
        }
      },
    };
  });
}
