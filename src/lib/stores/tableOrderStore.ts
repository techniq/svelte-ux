import { writable } from 'svelte/store';
import { isFunction } from 'lodash-es';
import type { ColumnDef } from '../types/table';

type SortFunc = (a: any, b: any) => number;
type OrderDirection = 'asc' | 'desc';

export type TableOrderState = {
  by: string;
  direction: OrderDirection;
  handler?: SortFunc | null;
};

export type TableOrderProps = {
  initialBy: string;
  initialDirection?: OrderDirection;
};

export default function tableOrderStore(props?: TableOrderProps) {
  const state = writable({
    by: props?.initialBy ?? '',
    direction: props?.initialDirection ?? 'asc',
    handler: null as SortFunc | null,
  });

  function onHeaderClick(column: ColumnDef) {
    state.update((prevState) => {
      const by =
        typeof column.orderBy === 'string'
          ? column.orderBy
          : typeof column.value === 'string'
          ? column.value
          : column.name;

      return {
        by,
        direction: prevState.by === by && prevState.direction === 'asc' ? 'desc' : 'asc',
        handler: isFunction(column.orderBy) ? column.orderBy : null,
      };
    });
  }

  return {
    ...state,
    onHeaderClick,
  };
}
