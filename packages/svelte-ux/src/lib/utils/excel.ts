// import { getCellContent, getCellValue, getHeaders, getRowColumns } from './table.js';
// import type { ColumnDef } from '../types/table.js';
// import { PeriodType } from './date.js';
// import { saveAs } from './file';
// import { isLiteralObject } from './object.js';

// const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
// const fileExtension = '.xlsx';

// export async function exportToExcel(
//   data: any[],
//   columns: ColumnDef[],
//   fileName: string,
//   limit: number | null = null
// ) {
//   // console.log({
//   //   data,
//   //   columns,
//   //   tableHeaders: getHeaders(columns),
//   //   tableColumns: getColumns(columns),
//   // })

//   const { default: ExcelJS } = await import('exceljs');

//   var workbook = new ExcelJS.Workbook();
//   workbook.creator = 'svelte-ux';
//   // workbook.lastModifiedBy = 'Her';
//   // workbook.created = new Date(1985, 8, 30);
//   // workbook.modified = new Date();
//   // workbook.lastPrinted = new Date(2016, 9, 27);
//   // workbook.calcProperties.fullCalcOnLoad = true;

//   var worksheet = workbook.addWorksheet('Export');
//   // var sheet = workbook.addWorksheet('My Sheet', {views:[{state: 'frozen', xSplit: 1, ySplit:1}]});

//   // Row => Column => Number of columns spanned
//   const columnPlaceholdersByRow = new Map<number, Map<number, number>>();

//   const headers = getHeaders(columns);

//   // Add header rows
//   headers.forEach((headerRow, headerRowIndex) => {
//     const rowNumber = headerRowIndex + 1; // rows are 1-based
//     const row = worksheet.getRow(rowNumber);
//     let columnNumber = 1; // columns are 1-based
//     const columnPlaceholders = columnPlaceholdersByRow.get(rowNumber);
//     const merges: {
//       startRow: number;
//       startColumn: number;
//       endRow: number;
//       endColumn: number;
//     }[] = [];

//     headerRow.forEach((column, columnIndex) => {
//       // If current column was spanned by previous row, shift right number of spanned columns.  Loop for consecutive skipped columns
//       let findMoreSkipColumns = true;
//       do {
//         const skipColumns = columnPlaceholders?.get(columnNumber);
//         if (skipColumns != null) {
//           columnNumber += skipColumns;
//         } else {
//           findMoreSkipColumns = false;
//         }
//       } while (findMoreSkipColumns);

//       const cell = row.getCell(columnNumber);
//       cell.value = column.header ?? column.name ?? null;

//       if (column.rowSpan) {
//         // Add column placeholders for subsequent rows that have been spanned by this column
//         for (var x = 1; x <= column.rowSpan; x++) {
//           const spannedRowIndex = rowNumber + x;
//           const columnPlaceholders = columnPlaceholdersByRow.get(spannedRowIndex) ?? new Map();
//           columnPlaceholders.set(columnNumber, column.colSpan ?? 1); // TODO: -1?
//           columnPlaceholdersByRow.set(spannedRowIndex, columnPlaceholders);
//         }

//         merges.push({
//           startRow: rowNumber,
//           startColumn: columnNumber,
//           endRow: rowNumber + column.rowSpan - 1,
//           endColumn: columnNumber + (column.colSpan ?? 1) - 1,
//         });
//       } else if (column.colSpan) {
//         merges.push({
//           startRow: rowNumber,
//           startColumn: columnNumber,
//           endRow: rowNumber,
//           endColumn: columnNumber + column.colSpan - 1,
//         });
//       }

//       columnNumber += column.colSpan ?? 1;
//     });

//     // Apply cell merges (rowSpan / colSpan)
//     merges.forEach((merge) => {
//       worksheet.mergeCells(merge.startRow, merge.startColumn, merge.endRow, merge.endColumn);
//     });
//   });

//   if (limit !== null) {
//     data = data.slice(0, limit);
//   }

//   // Add data rows
//   data.map((rowData, rowIndex) => {
//     const rowNumber = headers.length + rowIndex + 1;
//     const row = worksheet.getRow(rowNumber);

//     getRowColumns(columns).forEach((column, columnIndex) => {
//       const columnNumber = columnIndex + 1;

//       let cellValue = getCellValue(column, rowData, rowIndex);

//       if (isLiteralObject(cellValue) || Array.isArray(cellValue)) {
//         // If value is Object or Array, attempt to format
//         cellValue = getCellContent(column, rowData, rowIndex);
//       }

//       const cell = row.getCell(columnNumber);

//       cell.value = cellValue ?? null;
//       cell.numFmt = getFormat(cellValue, column.format) ?? '';
//     });
//   });

//   // worksheet.autoFilter = 'A1:C1'; // https://github.com/exceljs/exceljs#auto-filters
//   worksheet.autoFilter = {
//     from: {
//       row: headers.length,
//       column: 1,
//     },
//     to: {
//       row: headers.length,
//       column: worksheet.columnCount,
//     },
//   };

//   workbook.xlsx.writeBuffer().then((data) => {
//     var blob = new Blob([data], { type: fileType });
//     saveAs(blob, fileName + fileExtension);
//   });
// }

// /**
//  * Convert column format to Excel cell format
//  */
// function getFormat(value: any, format: ColumnDef['format']) {
//   if (typeof format !== 'function') {
//     switch (format) {
//       case 'currency':
//         return '$#,##0.00';
//       case 'percent':
//         return '0.00%';
//       case 'decimal':
//         return '#,##0.00';
//       case 'integer':
//         return '#,##0';
//       default:
//         // TODO: Treat each PeriodType's differently?
//         if (format in PeriodType) {
//           return 'm/d/yyyy\\ h:mm\\ AM/PM';
//         }
//     }
//   }
// }
