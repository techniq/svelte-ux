import { isFunction, get } from 'lodash-es';
import { parseISO } from 'date-fns';

import type { ColumnDef } from '../types/table.js';
import { PeriodType } from '../utils/date_types.js';

/** Get columns representing headers with rowSpan/colSpan set based on structure */
export function getHeaders(columns: ColumnDef[]) {
  const maxDepth = getDepth(columns);
  const result: ColumnDef[][] = Array.from({
    length: maxDepth,
  }).map(() => []);

  function addItems(columns: ColumnDef[], depth: number) {
    columns
      .filter((c) => c.hidden !== true)
      .forEach((column) => {
        const columnDef: ColumnDef = {
          ...column,
        };
        delete columnDef.columns;

        if (column.columns) {
          const colSpan = getWidth(column);
          if (colSpan > 1) {
            columnDef.colSpan = colSpan;
          }
          addItems(column.columns, depth + 1);
        } else {
          const rowSpan = maxDepth - depth;
          if (rowSpan > 1) {
            columnDef.rowSpan = maxDepth - depth;
          }
        }
        result[depth].push(columnDef);
      });
  }
  addItems(columns, 0);

  return result;
}

/** Get columns representing rows (i.e. flattened leaf columns if nested columns are used) */
export function getRowColumns(columns: ColumnDef[]) {
  const result: ColumnDef[] = [];

  function setColumns(column: ColumnDef) {
    if (column.columns == null) {
      result.push(column);
      return;
    }

    column.columns.filter((c) => c.hidden !== true).forEach((child) => setColumns(child));
  }
  columns.filter((c) => c.hidden !== true).forEach((column) => setColumns(column));

  return result;
}

export function getDepth(columns: ColumnDef[] | undefined) {
  if (columns == null) {
    return 0;
  }

  let depth = 0;
  columns
    .filter((c) => c.hidden !== true)
    .forEach((item) => {
      depth = Math.max(depth, getDepth(item.columns));
    });

  return depth + 1;
}

export function getWidth(column: ColumnDef) {
  if (column.columns == null) {
    return 1;
  }

  let width = 0;
  column.columns
    .filter((c) => c.hidden !== true)
    .forEach((child) => {
      width += getWidth(child);
    });

  return width;
}

export function getCellHeader(column: ColumnDef) {
  if (column.header != null) {
    return column.header;
  }

  let header = column.name.split('.')[0]; // Use first section before dot (`Organization.Identifier` => `Organization`)
  header = header.replace(/([a-z])([A-Z])/g, '$1 $2'); // Add space before capital letters - https://stackoverflow.com/questions/5582228/insert-space-before-capital-letters
  return header;
}

export function getCellValue(column: ColumnDef, rowData: any, rowIndex?: number) {
  let value = undefined;
  if (isFunction(column.value)) {
    value = column.value?.(rowData, rowIndex);
  }

  if (value === undefined) {
    value = get(rowData, typeof column.value === 'string' ? column.value : column.name);
  }

  if (
    typeof value === 'string' &&
    !isFunction(column.format) &&
    (column.format ?? 'none') in PeriodType
  ) {
    // Convert date string to Date instance
    // TODO: Shoud dateFns.parseISO() be used?
    // TODO: Should we handle date-only strings different?
    // value = new Date(value);
    // console.log({ column: column.name, value });
    value = parseISO(value);
  }

  return value;
}
