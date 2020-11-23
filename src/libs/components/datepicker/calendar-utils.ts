import { DateAdapter } from '@ng-tangram/components/core';

export const yearsPerPage = 12;

export const yearsPerRow = 3;

export function isSameMultiYearView<D>(
  dateAdapter: DateAdapter<D>, date1: D, date2: D, minDate: D | null, maxDate: D | null): boolean {
  const year1 = dateAdapter.getYear(date1);
  const year2 = dateAdapter.getYear(date2);
  const startingYear = getStartingYear(dateAdapter, minDate, maxDate);
  return Math.floor((year1 - startingYear) / yearsPerPage) ===
          Math.floor((year2 - startingYear) / yearsPerPage);
}

/**
 * When the multi-year view is first opened, the active year will be in view.
 * So we compute how many years are between the active year and the *slot* where our
 * "startingYear" will render when paged into view.
 */
export function getActiveOffset<D>(
  dateAdapter: DateAdapter<D>, activeDate: D, minDate: D | null, maxDate: D | null): number {
  const activeYear = dateAdapter.getYear(activeDate);
  return euclideanModulo((activeYear - getStartingYear(dateAdapter, minDate, maxDate)),
    yearsPerPage);
}

/**
 * We pick a "starting" year such that either the maximum year would be at the end
 * or the minimum year would be at the beginning of a page.
 */
function getStartingYear<D>(
  dateAdapter: DateAdapter<D>, minDate: D | null, maxDate: D | null): number {
  let startingYear = 0;
  if (maxDate) {
    const maxYear = dateAdapter.getYear(maxDate);
    startingYear = maxYear - yearsPerPage + 1;
  } else if (minDate) {
    startingYear = dateAdapter.getYear(minDate);
  }
  return startingYear;
}

/** Gets remainder that is non-negative, even if first number is negative */
function euclideanModulo (a: number, b: number): number {
  return (a % b + b) % b;
}

export function isTableCell(node: Node): node is HTMLTableCellElement {
  return node.nodeName === 'TD';
}

export function isStart(value: number, start: number | null, end: number | null): boolean {
  return end !== null && start !== end && value < end && value === start;
}

export function isEnd(value: number, start: number | null, end: number | null): boolean {
  return start !== null && start !== end && value >= start && value === end;
}

export function isInRange(value: number,
                   start: number | null,
                   end: number | null,
                   rangeEnabled: boolean): boolean {
  return rangeEnabled && start !== null && end !== null && start !== end &&
         value >= start && value <= end;
}
