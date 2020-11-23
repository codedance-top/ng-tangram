import { FactoryProvider, Injectable, Optional, SkipSelf } from '@angular/core';
import { DateAdapter } from '@ng-tangram/components/core';

import {
  NT_DATE_RANGE_SELECTION_STRATEGY,
  NtDateRangeSelectionStrategy
} from './date-range-selection-strategy';
import { DateRange } from './date-selection-model';

@Injectable()
export class MonthlyNtCalendarRangeStrategy<D> implements NtDateRangeSelectionStrategy<D> {
  constructor(private _dateAdapter: DateAdapter<D>) {}

  selectionFinished(date: D) {

    if (date) {
      return this._getRangeRelativeToDate(date);
    }

    return new DateRange<D>(null, null);
  }

  createPreview(activeDate: D | null) {
    if (activeDate) {
      return this._getRangeRelativeToDate(activeDate);
    }

    return new DateRange<D>(null, null);
  }

  private _getRangeRelativeToDate(date: D | null): DateRange<D> {
    let rangeStart: D | null = null;
    let rangeEnd: D | null = null;

    if (date) {
      const year = this._dateAdapter.getYear(date);
      const month = this._dateAdapter.getMonth(date);
      const monthDays = this._dateAdapter.getNumDaysInMonth(date)
      rangeStart = this._dateAdapter.createDate(year, month, 1);
      rangeEnd = this._dateAdapter.createDate(year, month, monthDays);
    }

    return new DateRange(rangeStart, rangeEnd);
  }
}

/** @docs-private */
export function MONTHLY_NT_CALENDAR_RANGE_STRATEGY_PROVIDER_FACTORY(
  parent: NtDateRangeSelectionStrategy<unknown>, adapter: DateAdapter<unknown>) {
  return parent || new MonthlyNtCalendarRangeStrategy(adapter);
}

/** @docs-private */
export const MONTHLY_NT_CALENDAR_RANGE_STRATEGY_PROVIDER: FactoryProvider = {
  provide: NT_DATE_RANGE_SELECTION_STRATEGY,
  deps: [[new Optional(), new SkipSelf(), NT_DATE_RANGE_SELECTION_STRATEGY], DateAdapter],
  useFactory: MONTHLY_NT_CALENDAR_RANGE_STRATEGY_PROVIDER_FACTORY,
};
