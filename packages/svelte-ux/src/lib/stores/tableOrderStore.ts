import { writable } from 'svelte/store';
import type { ComponentEvents } from 'svelte';
import { isFunction } from 'lodash-es';
import { index } from 'd3-array';

import { sortFunc } from '../utils/sort.js';
import type { ColumnDef } from '../types/table.js';
import Table from '../components/Table.svelte';
import { getRowColumns } from '$lib/utils/table.js';

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
  /** Passing will create initialHandler automatically */
  columns?: ColumnDef[];
};

export default function tableOrderStore(props?: TableOrderProps) {
  const { initialBy, initialDirection, initialHandler, columns } = props ?? {};
  const columnsByName = columns ? index(getRowColumns(columns), (d) => d.name) : null;

  const initialState =
    initialBy && columns && columnsByName
      ? createState(columnsByName.get(initialBy)!, props)
      : {
          by: initialBy ?? '',
          direction: initialDirection ?? 'asc',
          handler: initialHandler ?? sortFunc(initialBy, initialDirection ?? 'asc'),
        };

  const state = writable(initialState);

  function onHeaderClick(e: ComponentEvents<Table<unknown>>['headerClick']) {
    const column = e.detail.column;

    if (column.orderBy === false) {
      // ignore
      return;
    }

    state.update((prevState) => {
      return createState(column, props, prevState);
    });
  }

  return {
    ...state,
    onHeaderClick,
  };
}

function createState(column: ColumnDef, props?: TableOrderProps, prevState?: TableOrderState) {
  const by =
    typeof column.orderBy === 'string'
      ? column.orderBy
      : typeof column.value === 'string'
        ? column.value
        : column.name;

  const direction =
    prevState?.by !== by
      ? (props?.initialDirection ?? 'asc')
      : prevState.direction === 'asc'
        ? 'desc'
        : 'asc';

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
}
