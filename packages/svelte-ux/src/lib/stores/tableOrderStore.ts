import { writable } from 'svelte/store';
import { isFunction } from 'lodash-es';
import type { ColumnDef } from '../types/table';
import { sortFunc } from '$lib/utils/sort';

type SortFunc = (a: any, b: any) => number;
type OrderDirection = 'asc' | 'desc';

export type TableOrderState = {
  by: string;
  direction: OrderDirection;
  handler?: SortFunc;
};

export type TableOrderProps = {
  initialBy?: string;
  initialDirection?: OrderDirection;
  initialHandler?: SortFunc;
};

export default function tableOrderStore(props?: TableOrderProps) {
  const state = writable({
    by: props?.initialBy ?? '',
    direction: props?.initialDirection ?? 'asc',
    handler: props?.initialHandler ?? sortFunc(props?.initialBy, props?.initialDirection ?? 'asc'),
  });

  function onHeaderClick(column: ColumnDef) {
    state.update((prevState) => {
      const by =
        typeof column.orderBy === 'string'
          ? column.orderBy
          : typeof column.value === 'string'
            ? column.value
            : column.name;

      const direction = prevState.by === by && prevState.direction === 'asc' ? 'desc' : 'asc';

      let handler: SortFunc | undefined = undefined;
      if (isFunction(column.orderBy)) {
        handler = column.orderBy;
      } else if (typeof column.orderBy === 'string') {
        handler = sortFunc(column.orderBy, direction);
      } else {
        handler = sortFunc(column.value ?? column.name, direction);
      }

      return {
        by,
        direction,
        handler,
      };
    });
  }

  return {
    ...state,
    onHeaderClick,
  };
}
