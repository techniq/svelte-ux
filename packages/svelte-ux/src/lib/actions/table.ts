import type { Action } from 'svelte/action';
import { merge } from 'lodash-es';
import { extent, max, min } from 'd3-array';

import type { ColumnDef, ResolveContext } from '../types/table.js';
import type tableOrderStore from '../stores/tableOrderStore.js';

import { dataBackground } from './dataBackground.js';
import { sticky } from './sticky.js';
import { getCellValue } from '../utils/table.js';
import DomTracker from './_domTracker.js';
import { entries } from '../types/typeHelpers.js';

type TableCellOptions = {
  column?: ColumnDef;
  rowData?: any;
  rowIndex?: number;
  tableData?: any[] | null;
  order?: ReturnType<typeof tableOrderStore>;
  overrides?: Partial<ColumnDef>;
};

export const tableCell: Action<HTMLElement, TableCellOptions> = (node, options) => {
  // Track changes so they can be reversed on an update
  const tracker = new DomTracker(node);

  function update(options: TableCellOptions) {
    const { order, rowData, rowIndex, tableData } = options;
    const column = merge({}, options.column, options.overrides);

    // TODO: Should we keep a stingified copy of the resolved `column` config in `lastChanges` and exit early if no changes.  Maybe just add it if performance dictates

    // Reset state from last update
    tracker.reset();

    if (node.nodeName === 'TH') {
      // Order by
      if (order && column.orderBy !== false) {
        tracker.addClass('cursor-pointer');

        if (order) {
          tracker.addEventListener('click', () =>
            order.onHeaderClick(new CustomEvent('headerClick', { detail: { column } }))
          );
        }
      }
    }

    if (column.colSpan) {
      tracker.addAttribute('colspan', column.colSpan.toString());
    }
    if (column.rowSpan) {
      tracker.addAttribute('rowspan', column.rowSpan.toString());
    }

    if (column.align) {
      // Explicit column alignment
      switch (column.align) {
        case 'left':
          tracker.addClass('text-left');
          break;
        case 'center':
          tracker.addClass('text-center');
          break;
        case 'right':
          tracker.addClass('text-right');
          break;
        case 'justify':
          tracker.addClass('text-justify');
          break;
      }
    } else if (typeof column.format === 'string') {
      // Implicit column alignment based on format
      switch (column.format) {
        case 'currency':
        case 'decimal':
        case 'integer':
        case 'percent':
          tracker.addClass('text-right');
          break;
      }
    } else {
      // Default column alignment
      tracker.addClass('text-left');
    }

    const context: ResolveContext = {
      column,
      rowData,
      cellValue: rowData && getCellValue(column, rowData, rowIndex ?? -1),
    };

    if (column.classes) {
      if (node.nodeName === 'TH' && column.classes.th) {
        const classes = getClasses(column.classes.th, context);
        classes?.forEach((className) => tracker.addClass(className));
      } else if (node.nodeName === 'TD' && column.classes.td) {
        const classes = getClasses(column.classes.td, context);
        classes?.forEach((className) => tracker.addClass(className));
      }
    }

    if (column.style) {
      if (node.nodeName === 'TH' && column.style.th) {
        const styleProperties = getStyleProperties(column.style.th, context);
        styleProperties?.forEach(([property, value]) => {
          tracker.addStyle(property, value);
        });
      } else if (node.nodeName === 'TD' && column.style.td) {
        const styleProperties = getStyleProperties(column.style.td, context);
        styleProperties?.forEach(([property, value]) => {
          tracker.addStyle(property, value);
        });
      }
    }

    if (column.sticky) {
      if (node.nodeName === 'TH') {
        // Ignore sticky bottom for header cell
        tracker.addAction(sticky, { ...column.sticky, bottom: false });

        // Increase z-index for other sticky headers (scrolled left) as well as sticky cells below (scrolled up)
        // Only need to increase z-index for first and last headers (and higher than sticky data cells below them)
        if (column.sticky.left || column.sticky.right) {
          tracker.addClass('z-20');
        }
      }
      if (node.nodeName === 'TD') {
        // Ignore sticky top for data cell, and only apply sticky bottom if last row
        // Note: Rows are sometimes rendered one by one by Svelte (HierarchyTable) so best to set this explicitly at call site
        // TODO: Once sticky/stickyContext actions supported offsetting bottom, this should be removed
        const isLastRow = node.closest('table tr:last-child') === node.closest('tr');

        tracker.addAction(sticky, {
          ...column.sticky,
          top: false,
          bottom: column.sticky.bottom && isLastRow,
        });

        // Increase column z-index for sticky columns
        if (column.sticky.left) {
          tracker.addClass('z-10');
        }
        if (column.sticky.right) {
          tracker.addClass('z-10');
        }
      }
    }

    if (column.dataBackground) {
      const extents = extent(tableData ?? [], (d) => getCellValue(column, d));

      // @ts-expect-error
      tracker.addAction(dataBackground, {
        value: context.cellValue,
        domain: tableData ? [min([0, extents[0]]), max([0, extents[1]])] : undefined,
        ...(typeof column.dataBackground === 'function'
          ? column.dataBackground?.({ column, cellValue: context.cellValue, rowData })
          : column.dataBackground),
      });
    }
  }

  function destroy() {
    tracker.destroy();
  }

  if (options) {
    update(options);
  }

  return {
    update,
    destroy,
  };
};

function getClasses(
  // @ts-expect-error
  classProp: ColumnDef['classes']['td'],
  context: ResolveContext
): string[] {
  const resolvedClassProp = typeof classProp === 'function' ? classProp(context) : classProp;

  if (typeof resolvedClassProp === 'string') {
    return resolvedClassProp
      .split(' ')
      .map((x) => x.trim())
      .filter((x) => x !== '');
  } else {
    return resolvedClassProp;
  }
}

function getStyleProperties(
  // @ts-expect-error
  styleProp: ColumnDef['style']['td'],
  context: ResolveContext
): string[][] {
  const resolvedStyleProp = typeof styleProp === 'function' ? styleProp(context) : styleProp;

  if (typeof resolvedStyleProp === 'string') {
    const styles = resolvedStyleProp
      .split(';')
      .map((x) => x.trim())
      .filter((x) => x !== '');

    return styles.map((style) => {
      return style.split(':').map((x) => x.trim());
    });
  } else {
    return entries(resolvedStyleProp);
  }
}
