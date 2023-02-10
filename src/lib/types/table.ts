import type { DataBackgroundOptions } from '../actions/dataBackground';
import type { Edge } from '../actions/sticky';
import type { FormatType } from '../utils/format';

export type ResolveContext<TData = any> = {
  column: ColumnDef;
  rowData?: TData;
  cellValue?: any;
};

export type ResolvePropType<TData, T> =
  | T
  | null
  | undefined
  | ((context: ResolveContext<TData>) => T | null | undefined);

export type ColumnDef<TData = any> = {
  name: string;
  header?: string;
  value?: string | ((rowData: TData, rowIndex?: number) => any);
  format?: FormatType;
  orderBy?: string | boolean | ((a: any, b: any) => number);
  columns?: ColumnDef<TData>[];
  align?: 'left' | 'right' | 'center' | 'justify';

  /**
   * Apply position sticky to cell. Note: `top` only applies to header (including nested), `bottom` only applies to last data row.
   * Requires `use:stickyContext` parent
   */
  sticky?: { [edge in Edge]?: boolean };

  style?: {
    header?: ResolvePropType<TData, string | { [property: string]: string }>;
    data?: ResolvePropType<TData, string | { [property: string]: string }>;
  };
  class?: {
    header?: ResolvePropType<TData, string | string[]>;
    data?: ResolvePropType<TData, string | string[]>;
  };

  dataBackground?:
    | Partial<DataBackgroundOptions>
    | ((context: ResolveContext<TData>) => Partial<DataBackgroundOptions>);

  /** Set by getHeaders() util */
  colSpan?: number;
  /** Set by getHeaders() util */
  rowSpan?: number;
};
