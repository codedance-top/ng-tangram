import { FactoryProvider, Injectable, Optional, SkipSelf } from '@angular/core';
import { DateAdapter } from '@ng-tangram/components/core';

import {
  NT_DATE_RANGE_SELECTION_STRATEGY,
  NtDateRangeSelectionStrategy
} from './date-range-selection-strategy';
import { DateRange } from './date-selection-model';

@Injectable()
export class WeeklyNtCalendarRangeStrategy<D> implements NtDateRangeSelectionStrategy<D> {
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
      const firstDayOfWeek = this._dateAdapter.getFirstDayOfWeek();
      const dayOfWeek = this._dateAdapter.getDayOfWeek(date);
      rangeStart = this._dateAdapter.addCalendarDays(date, firstDayOfWeek - dayOfWeek);
      rangeEnd = this._dateAdapter.addCalendarDays(date, 6 - dayOfWeek);
    }

    return new DateRange(rangeStart, rangeEnd);
  }
}

/** @docs-private */
export function WEEKLY_NT_CALENDAR_RANGE_STRATEGY_PROVIDER_FACTORY(
  parent: NtDateRangeSelectionStrategy<unknown>, adapter: DateAdapter<unknown>) {
  return parent || new WeeklyNtCalendarRangeStrategy(adapter);
}

/** @docs-private */
export const WEEKLY_NT_CALENDAR_RANGE_STRATEGY_PROVIDER: FactoryProvider = {
  provide: NT_DATE_RANGE_SELECTION_STRATEGY,
  deps: [[new Optional(), new SkipSelf(), NT_DATE_RANGE_SELECTION_STRATEGY], DateAdapter],
  useFactory: WEEKLY_NT_CALENDAR_RANGE_STRATEGY_PROVIDER_FACTORY,
};
